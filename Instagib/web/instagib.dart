library instagib;

import 'dart:async';
import 'package:ChronosGL/chronos_gl.dart';
import 'dart:typed_data';

part 'bsp.dart';
part 'FPSCamera.dart';
part 'sobel_shader.dart';

void main() {
  
  ChronosGL chronosGL = new ChronosGL('#webgl-canvas', useFramebuffer:true, fxShader: getSobelShader(), far:520.0);
  
  // gl.enable(gl.CULL_FACE);
  
  Camera camera = chronosGL.getCamera();
  camera.setPos( 0.0, 0.0, 56.0 );
  FPSCamera fpscam = new FPSCamera(camera);
  chronosGL.addAnimatable('fpscam', fpscam);
  
  Utils utils = chronosGL.getUtils();
  TextureCache textureCache = chronosGL.getTextureCache();
  textureCache.add("textures/skybox_nx.png");
  textureCache.add("textures/skybox_px.png");
  textureCache.add("textures/skybox_ny.png");
  textureCache.add("textures/skybox_py.png");
  textureCache.add("textures/skybox_nz.png");
  textureCache.add("textures/skybox_pz.png");
  textureCache.loadAllThenExecute((){
    
    utils.addSkybox( "textures/skybox_", ".png", "nx", "px", "nz", "pz", "ny", "py");
    
    ShaderProgram sp = chronosGL.createProgram( 'Normal2Color', chronosGL.getShaderLib().createNormal2ColorShader());
    
    var indices = utils.loadBinaryFile( 'data/q3dm17.indices');
    var verts = utils.loadBinaryFile( 'data/q3dm17.verts');
    var normals = utils.loadBinaryFile( 'data/q3dm17.normals');
    
    var nodes = utils.loadBinaryFile( 'data/q3dm17.nodes');
    var planes = utils.loadBinaryFile( 'data/q3dm17.planes');
    var leaves = utils.loadBinaryFile( 'data/q3dm17.leafs');
    var brushes = utils.loadBinaryFile( 'data/q3dm17.brushes');
    var leafBrushes = utils.loadBinaryFile( 'data/q3dm17.leafbrushes');
    var brushSides = utils.loadBinaryFile( 'data/q3dm17.brushsides');
    
    var textures = utils.loadJsonFile( 'data/q3dm17.textures');
    var entities = utils.loadJsonFile( 'data/q3dm17.ents');
    
    Future.wait([verts, indices, nodes, planes, leaves, brushes, leafBrushes, textures, brushSides, normals]).then( (List list) {
      Float32List vs = new Float32List.view( list[0]);
      Float32List ns = new Float32List.view( list[9]);
      Uint16List xs = new Uint16List.view( list[1]);

      Int32List nodes = new Int32List.view( list[2]);
      List<Node> nodes2 = new List<Node>(nodes.length~/9);
      for( int i=0;i<nodes2.length;i++) {
        nodes2[i] = new Node(nodes.sublist(i*9, i*9+9));
      }
      
      Float32List planes = new Float32List.view( list[3]);
      List<Plane> planes2 = new List<Plane>(planes.length~/4);
      for( int i=0;i<planes2.length;i++) {
        planes2[i] = new Plane(planes.sublist(i*4, i*4+4));
      }

      Int32List leaves = new Int32List.view( list[4]);
      List<Leaf> leaves2 = new List<Leaf>(leaves.length~/12);
      for( int i=0;i<leaves2.length;i++) {
        leaves2[i] = new Leaf(leaves.sublist(i*12, i*12+12));
      }
      
      Int32List brushes = new Int32List.view( list[5]);
      List<Brush> brushes2 = new List<Brush>(brushes.length~/3);
      for( int i=0;i<brushes2.length;i++) {
        brushes2[i] = new Brush(brushes.sublist(i*3, i*3+3));
      }

      Int32List leafBrushes = new Int32List.view( list[6]);
      var textures = list[7];
      
      Int32List brushSides = new Int32List.view( list[8]);
      List<Brushside> brushSides2 = new List<Brushside>(brushes.length~/2);
      for( int i=0;i<brushSides2.length;i++) {
        brushSides2[i] = new Brushside(brushSides.sublist(i*2, i*2+2));
      }

      BSPTree bspTree = new BSPTree(nodes2, planes2, leaves2, brushes2, leafBrushes, textures, brushSides2);
      fpscam.setBSPTree( bspTree);
      
      for( var a =0; a<vs.length ;a++) {
        vs[a] = vs[a] / 100;
      }
      
      sp.add( new MeshData(vertices: vs, normals: ns, vertexIndices: xs).createMesh());
      chronosGL.run();
    });

  });
  
 
}

