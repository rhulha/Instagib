library instagib;

import 'dart:html' as HTML;
import 'dart:async';
import 'package:ChronosGL/chronos_gl.dart';
import 'dart:typed_data';
import 'dart:convert';

part 'bsp.dart';
part 'FPSCamera.dart';

Future<Object> loadBinaryFile(String url)
{
  Completer c = new Completer();
  HTML.HttpRequest hr = new HTML.HttpRequest();
  hr.responseType = "arraybuffer";
  hr.open("GET", url);
  hr.onLoadEnd.listen( (e) {
    c.complete(hr.response);
  });
  hr.send();
  return c.future;
}

Future<Object> loadJsonFile(String url)
{
  Completer c = new Completer();
  HTML.HttpRequest hr = new HTML.HttpRequest();
  hr.open("GET", url);
  hr.onLoadEnd.listen( (e) {
    c.complete(JSON.decode( hr.responseText));
  });
  hr.send();
  return c.future;
}

void main() {
  ChronosGL chronosGL = new ChronosGL('#webgl-canvas', false);
  
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
    
    ShaderProgram sp = chronosGL.getShaderLib().createFixedVertexColorShaderProgram();
    
    var verts = loadBinaryFile( 'data/q3dm17.verts');
    var indices = loadBinaryFile( 'data/q3dm17.indices');
    
    var nodes = loadBinaryFile( 'data/q3dm17.nodes');
    var planes = loadBinaryFile( 'data/q3dm17.planes');
    var leaves = loadBinaryFile( 'data/q3dm17.leafs');
    var brushes = loadBinaryFile( 'data/q3dm17.brushes');
    var leafBrushes = loadBinaryFile( 'data/q3dm17.leafbrushes');
    var brushSides = loadBinaryFile( 'data/q3dm17.brushsides');
    
    var textures = loadJsonFile( 'data/q3dm17.textures');
    var entities = loadJsonFile( 'data/q3dm17.ents');
    
    Future.wait([verts, indices, nodes, planes, leaves, brushes, leafBrushes, textures, brushSides]).then( (List list) {
      Float32List vs = new Float32List.view( list[0]);
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
      
      print(list[7][0]['name']);
      
      for( var a =0; a<vs.length ;a++) {
        vs[a] = vs[a] / 100;
      }
      
      sp.add( new MeshData(vertices: vs, vertexIndices: xs).createMesh());
      chronosGL.run();
    });

  });
  
 
}

