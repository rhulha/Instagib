library instagib;

import 'dart:html' as HTML;
import 'dart:math' as Math;
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'package:chronosgl/chronosgl.dart';
import 'sound.dart';

part 'bsp.dart';
part 'QuakeCamera.dart';
part 'instagib_shader.dart';
part 'laser.dart';
part 'file_cache.dart';

ChronosGL chronosGL;
Camera camera;
TextureCache textureCache;
Sound snd = new Sound();

void main() {
  
  skipDefaultMouseMoveListener = true;
  chronosGL = new ChronosGL('#webgl-canvas', useFramebuffer:false, fxShader: createSobelShader(), near: 0.1, far:2520.0);

  ShaderObject shaderObject = createColorShader();
  // createDebugTexCoordsShader() createPlane2GreyShader()
  // createInstagibShader() createInstagibLightShader()
  ShaderProgram sp = chronosGL.createProgram( shaderObject);

  //chronosGL.getRenderingContext().enable( 0x0B44);//RenderingContext.CULL_FACE
  
  camera = chronosGL.getCamera();
  camera.setPos( 0.0, 0.0, 6.0 );
  camera.lookAt(new Vector(1.0, 0.0, 6.0), new Vector(0.0,0.0,1.0));
  QuakeCamera fpscam = new QuakeCamera(camera);
  chronosGL.addAnimatable('fpscam', fpscam);
  
  Utils utils = chronosGL.getUtils();
  textureCache = chronosGL.getTextureCache();
  textureCache.addSolidColor("red", "rgba(255,0,0,255)");
  textureCache.add("textures/skybox_nx.png");
  textureCache.add("textures/skybox_px.png");
  textureCache.add("textures/skybox_ny.png");
  textureCache.add("textures/skybox_py.png");
  textureCache.add("textures/skybox_nz.png");
  textureCache.add("textures/skybox_pz.png");
  
  
  snd.loadSound('data/jump1.wav', 'jump');
  snd.loadSound('data/railgf1a.wav', 'rail');
  
  textureCache.loadAllThenExecute((){
    
    utils.addSkybox( "textures/skybox_", ".png", "nx", "px", "nz", "pz", "ny", "py");
    
    FileCache bfc = new FileCache();
    bfc.addBinary('data/q3dm17.indices');
    bfc.addBinary('data/q3dm17.verts');
    bfc.addBinary('data/q3dm17.normals');
    bfc.addBinary('data/q3dm17.colors');
    
    bfc.addBinary('data/q3dm17.nodes');
    bfc.addBinary('data/q3dm17.planes');
    bfc.addBinary('data/q3dm17.leafs');
    bfc.addBinary('data/q3dm17.brushes');
    bfc.addBinary('data/q3dm17.leafbrushes');
    bfc.addBinary('data/q3dm17.brushsides');
    bfc.addText('data/q3dm17.textures');
    bfc.addText('data/q3dm17.ents');
    
    bfc.loadAllThenExecute((){
      Uint16List  xs = bfc.get('data/q3dm17.indices').asUint16List();
      Float32List vs = bfc.get('data/q3dm17.verts').asFloat32List();
      Float32List ns = bfc.get('data/q3dm17.normals').asFloat32List();
      Float32List cs = bfc.get('data/q3dm17.colors').asFloat32List();

      List<BSPNode> nodes = BSPNode.parse(bfc.get('data/q3dm17.nodes').asInt32List());
      List<Plane> planes = Plane.parse(bfc.get('data/q3dm17.planes').asFloat32List());
      List<Leaf> leaves = Leaf.parse(bfc.get('data/q3dm17.leafs').asInt32List());
      List<Brush> brushes = Brush.parse(bfc.get('data/q3dm17.brushes').asInt32List());
      Int32List leafBrushes = bfc.get('data/q3dm17.leafbrushes').asInt32List();
      List<Brushside> brushSides = Brushside.parse(bfc.get('data/q3dm17.brushsides').asInt32List());
      var textures = JSON.decode(bfc.get('data/q3dm17.textures').text);

      BSPTree bspTree = new BSPTree(nodes, planes, leaves, brushes, leafBrushes, textures, brushSides);
      fpscam.setBSPTree( bspTree);
      
      for( var a =0; a<vs.length ;a++) {
        vs[a] = vs[a] / 100;
      }
      
      sp.add( new MeshData(vertices: vs, normals: ns, vertexIndices: xs, colors: cs).createMesh());
      chronosGL.run();
    });

  });
  
 
}

