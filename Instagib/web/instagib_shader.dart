part of instagib;

ShaderObject createInstagibShader() {
  ShaderObject shaderObject = new ShaderObject("Plane2Color");
  
  shaderObject.vertexShader = """
        precision mediump float;

        attribute vec3 aVertexPosition;
        attribute vec3 aNormal;
        
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        
        vec3 lightDir = vec3(1.0,0.0,1.0);
        vec3 directionalColor = vec3(1.0,1.0,1.0);

        vec3 pointLightLocation = vec3( 190, 50, 500);
        vec3 vNormal;

        varying vec3 vColor;

        vec3 HSV2RGB( vec3 hsv ) // by patapom at stackoverflow.com
        {
            hsv.x = mod( 100.0 + hsv.x, 1.0 ); // Ensure [0,1[
            float   HueSlice = 6.0 * hsv.x; // In [0,6[
            float   HueSliceInteger = floor( HueSlice );
            float   HueSliceInterpolant = HueSlice - HueSliceInteger; // In [0,1[ for each hue slice
            vec3  TempRGB = vec3(   hsv.z * (1.0 - hsv.y), hsv.z * (1.0 - hsv.y * HueSliceInterpolant), hsv.z * (1.0 - hsv.y * (1.0 - HueSliceInterpolant)) );
            float   IsOddSlice = mod( HueSliceInteger, 2.0 ); // 0 if even (slices 0, 2, 4), 1 if odd (slices 1, 3, 5)
            float   ThreeSliceSelector = 0.5 * (HueSliceInteger - IsOddSlice); // (0, 1, 2) corresponding to slices (0, 2, 4) and (1, 3, 5)
            vec3  ScrollingRGBForEvenSlices = vec3( hsv.z, TempRGB.zx );           // (V, Temp Blue, Temp Red) for even slices (0, 2, 4)
            vec3  ScrollingRGBForOddSlices = vec3( TempRGB.y, hsv.z, TempRGB.x );  // (Temp Green, V, Temp Red) for odd slices (1, 3, 5)
            vec3  ScrollingRGB = mix( ScrollingRGBForEvenSlices, ScrollingRGBForOddSlices, IsOddSlice );
            float   IsNotFirstSlice = clamp( ThreeSliceSelector, 0.0,1.0 ); // 1 if NOT the first slice (true for slices 1 and 2)
            float   IsNotSecondSlice = clamp( ThreeSliceSelector-1.0, 0.0,1. ); // 1 if NOT the first or second slice (true only for slice 2)
            return  mix( ScrollingRGB.xyz, mix( ScrollingRGB.zxy, ScrollingRGB.yzx, IsNotSecondSlice ), IsNotFirstSlice ); // Make the RGB rotate right depending on final slice index
        }

        void main(void) {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
          vNormal = (uMVMatrix * vec4(aNormal, 0.0)).xyz;

          pointLightLocation = (uMVMatrix * vec4(pointLightLocation, 0.0)).xyz;

          float d=dot( aVertexPosition, aNormal);
          vec3 hsv = vec3(d,1,1);
          vColor=HSV2RGB(hsv);

          vec3 lightDir = normalize(pointLightLocation - aVertexPosition.xyz);

          float directionalLightWeighting = max(dot(vNormal, normalize(lightDir)), 0.0);
          vColor = vColor * directionalLightWeighting;


        }
        """;
  
  shaderObject.fragmentShader = """
        precision mediump float;

        varying vec3 vColor;
        void main(void) {
          gl_FragColor = vec4( vColor, 1.0 );
        }
        """;
  
  shaderObject.vertexPositionAttribute = "aVertexPosition"; 
  shaderObject.normalAttribute = "aNormal";
  shaderObject.modelViewMatrixUniform = "uMVMatrix";
  shaderObject.perpectiveMatrixUniform = "uPMatrix";
  
  return shaderObject;
}

ShaderObject createInstagibLightShader() {
  ShaderObject shaderObject = new ShaderObject("Light");
  
  shaderObject.vertexShader = """
        precision mediump float;

        attribute vec3 aVertexPosition;
        attribute vec3 aNormal;
        
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        vec3 lightDir = vec3(1.0,0.0,1.0);
        vec3 ambientColor = vec3(0.0,0.0,0.0);
        vec3 directionalColor = vec3(1.0,1.0,1.0);

        vec3 pointLightLocation = vec3( 190, 50, 500);
        
        varying vec3 vLightWeighting;
        varying vec3 vNormal;

        void main(void) {
          gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
          vNormal = (uMVMatrix * vec4(aNormal, 0.0)).xyz;

          pointLightLocation = (uMVMatrix * vec4(pointLightLocation, 0.0)).xyz;

          vec3 lightDir = normalize(pointLightLocation - aVertexPosition.xyz);

          float directionalLightWeighting = max(dot(vNormal, normalize(lightDir)), 0.0);
          vLightWeighting = ambientColor + directionalColor * directionalLightWeighting;
        }
        """;
  
  shaderObject.fragmentShader = """
        precision mediump float;
        
        varying vec3 vLightWeighting;
        varying vec3 vNormal;

        void main(void) {
          //gl_FragColor = vec4( vNormal * vLightWeighting, 1.0 );
          gl_FragColor = vec4( vLightWeighting, 1.0 );
        }
        """;
  
  shaderObject.vertexPositionAttribute = "aVertexPosition"; 
  shaderObject.normalAttribute = "aNormal";
  shaderObject.modelViewMatrixUniform = "uMVMatrix";
  shaderObject.perpectiveMatrixUniform = "uPMatrix";
  
  return shaderObject;
}


ShaderObject createInstagibSobelShader() {
  ShaderObject shaderObject = new ShaderObject("InstagibSobel");
  
  shaderObject.vertexShader = """
  precision mediump float;
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;
  
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  
  varying vec2 vTextureCoord;
  
  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
  }
  """;
  
  shaderObject.fragmentShader = """
  precision mediump float;
  
  varying vec2 vTextureCoord;
  uniform sampler2D colorSampler;
  uniform sampler2D depthSampler;
  
  uniform float cameraNear;
  uniform float cameraFar;
  uniform vec2 size;

  float lum_c(vec4 c) {
    return dot(c.xyz, vec3(0.3, 0.59, 0.11));
  }

  float sobel_c(sampler2D colorSampler) {
      vec2 imageIncrement = vec2(1.0/size.x,1.0/size.y);
      float t00 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1, -1)));
      float t10 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 0, -1)));
      float t20 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1, -1)));
      float t01 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1,  0)));
      float t21 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1,  0)));
      float t02 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1,  1)));
      float t12 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 0,  1)));
      float t22 = lum_c(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1,  1)));
      vec2 grad;
      grad.x = t00 + 2.0 * t01 + t02 - t20 - 2.0 * t21 - t22;
      grad.y = t00 + 2.0 * t10 + t20 - t02 - 2.0 * t12 - t22;
      return length(grad);
  } 

  void main(void) {
    float len_d = 0.0; //sobel_d(depthSampler);
    float len_c = sobel_c(colorSampler);
    float len = len_d + len_c;
    //if( len > 1.0 ) len = 1.0;
    len = 1.0 - len; 

    if( len > 0.50) {
      len = 1.0 - len;
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // vec4(len, len, len, 1.0); // 
    } else {
      gl_FragColor =  vec4(0.0, 0.0, 0.0, 1.0); // texture2D(colorSampler, vTextureCoord); // 
    }

  }
  """;
  
  shaderObject.vertexPositionAttribute = "aVertexPosition"; 
  shaderObject.textureCoordinatesAttribute = "aTextureCoord";
  shaderObject.modelViewMatrixUniform = "uMVMatrix";
  shaderObject.perpectiveMatrixUniform = "uPMatrix";
  shaderObject.textureSamplerUniform = "colorSampler";
  shaderObject.texture2SamplerUniform = "depthSampler";
  shaderObject.cameraNear = "cameraNear";
  shaderObject.cameraFar = "cameraFar";
  shaderObject.size = "size";
 
  return shaderObject;
}