part of instagib;


ShaderObject getCopyShader() {
  ShaderObject shaderObject = new ShaderObject();
  
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
    uniform float cameraNear;
    uniform float cameraFar;
    uniform vec2 size;

    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    varying vec2 vTextureCoord;
    
    vec2 vUv = vTextureCoord;

    void main() {
      vec3 color = texture2D( tDiffuse, vTextureCoord ).rgb;
      gl_FragColor = vec4( color, 1.0 );
    }
    
    """;
  
  shaderObject.vertexPositionAttribute = "aVertexPosition"; 
  shaderObject.textureCoordinatesAttribute = "aTextureCoord";
  shaderObject.modelViewMatrixUniform = "uMVMatrix";
  shaderObject.perpectiveMatrixUniform = "uPMatrix";
  shaderObject.textureSamplerUniform = "tDiffuse";
  shaderObject.texture2SamplerUniform = "tDepth";
  shaderObject.cameraNear = "cameraNear";
  shaderObject.cameraFar = "cameraFar";
  shaderObject.size = "size";
    
  return shaderObject;
}