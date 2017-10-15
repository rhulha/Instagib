library instagib;

import 'dart:html' as HTML;
import 'dart:math' as Math;
import 'dart:async';
import 'dart:typed_data';
import 'package:chronosgl/chronosgl.dart';
import 'sound.dart';
import 'loader/BSPParser.dart';

part 'q3dm17.dart';
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
    
    chronosGL.getUtils().loadBinaryFile("data/q3dm17.bsp").then((ByteBuffer bspFile){
      
      BSPParser parser = new BSPParser(bspFile);
      
      List<Shader> shaders = parser.getShaders();
      List<Surface> surfaces = parser.getSurfaces();
      List<Vertex> vertexes = parser.getDrawVerts();
      List<int> indexes = parser.getDrawIndexes();

      for (Surface surface in surfaces) {
        if (surface.surfaceType == Surface.patch) {
          //print("tessellate");
          tessellate(surface, vertexes, indexes, 20);
        }
      }

      changeColors(surfaces, indexes, shaders, vertexes);
      
      List<double> vertsList = new List<double>();
      List<double> normalsList = new List<double>();
      List<double> texCoordsList = new List<double>();
      List<double> lmCoordsList = new List<double>();
      List<double> colorsList = new List<double>();
      for (Vertex vertex in vertexes) {
        vertsList.addAll(vertex.xyz);
        normalsList.addAll(vertex.normal);
        texCoordsList.add(vertex.st[0]);
        texCoordsList.add(vertex.st[1]);
        lmCoordsList.add(vertex.lightmap[0]);
        lmCoordsList.add(vertex.lightmap[1]);
        colorsList.addAll(vertex.color);
      }


      List<String> skip = new List<String>();
      skip.add("flareShader");
      skip.add("textures/skies/blacksky");
      skip.add("textures/sfx/beam");
      skip.add("models/mapobjects/spotlamp/beam");
      skip.add("models/mapobjects/lamps/flare03");
      skip.add("models/mapobjects/teleporter/energy"); // TODO readd and make blue ?
      skip.add("models/mapobjects/spotlamp/spotlamp");
      skip.add("models/mapobjects/spotlamp/spotlamp_l");
      skip.add("models/mapobjects/lamps/bot_lamp"); // head on the railgun pad
      skip.add("models/mapobjects/lamps/bot_lamp2");
      skip.add("models/mapobjects/lamps/bot_flare");
      skip.add("models/mapobjects/lamps/bot_flare2");
      skip.add("models/mapobjects/lamps/bot_wing");
      //skip.add("models/mapobjects/kmlamp1"); // stand lights
      //skip.add("models/mapobjects/kmlamp_white");

      List<int> indicesList = new List<int>();
      for (Surface surface in surfaces) {
        if (skip.contains(shaders[surface.shaderNum].shader)) continue;
        for (int k = 0; k < surface.numIndexes; ++k) {
          int i = surface.firstVert + indexes[surface.firstIndex + k];
          indicesList.add(i);
        }
      }

      Uint16List  xs = new Uint16List.fromList(indicesList);
      Float32List vs = new Float32List.fromList(vertsList);
      Float32List ns = new Float32List.fromList(normalsList);
      Float32List cs = new Float32List.fromList(colorsList);

      List<BSPNode> nodes = BSPNode.parse(parser.getLump(LumpTypes.Nodes));
      List<Plane> planes = Plane.parse(parser.getLump(LumpTypes.Planes));
      List<Leaf> leaves = Leaf.parse(parser.getLump(LumpTypes.Leafs)); // TODO: rename
      List<Brush> brushes = Brush.parse(parser.getLump(LumpTypes.Brushes));
      Int32List leafBrushes = parser.getLump(LumpTypes.LeafBrushes).readAllSignedInts();
      List<Brushside> brushSides = Brushside.parse(parser.getLump(LumpTypes.BrushSides));

      BSPTree bspTree = new BSPTree(nodes, planes, leaves, brushes, leafBrushes, shaders, brushSides, surfaces);
      fpscam.setBSPTree( bspTree);
      
      for( var a =0; a<vs.length ;a++) {
        vs[a] = vs[a] / 100;
      }
      
      sp.add( new MeshData(vertices: vs, normals: ns, vertexIndices: xs, colors: cs).createMesh());
      chronosGL.run();
    });

  });
  
 
}

