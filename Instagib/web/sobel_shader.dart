part of instagib;

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