library instagib;

import 'dart:html' as HTML;
import 'dart:math' as Math;
import 'dart:async';
import 'dart:typed_data';
import 'package:chronosgl/chronosgl.dart';
import 'sound.dart';
import 'loader/BSPParser.dart';

part 'structs/helper.dart';
part 'q3dm17.dart';
part 'bsp.dart';
part 'QuakeCamera.dart';
part 'instagib_shader.dart';
part 'laser.dart';
part 'file_cache.dart';
part 'structs/leaf.dart';
part 'structs/brush.dart';
part 'structs/brushside.dart';
part 'structs/patch.dart';
part 'structs/plane.dart';
part 'structs/bsp_node.dart';
part 'structs/my_bsp.dart';

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
      MyBSP myBSP = new MyBSP();
      BSPParser parser = new BSPParser(bspFile);
      
      myBSP.shaders = parser.getShaders();
      myBSP.surfaces = parser.getSurfaces();
      myBSP.drawVerts = parser.getDrawVerts();
      myBSP.drawIndexes = parser.getDrawIndexes();

      
      myBSP.surfacesUntessellated = new List<Surface>.generate(myBSP.surfaces.length, (int idx)=>new Surface.copy(myBSP.surfaces[idx]));
      
      for (Surface surface in myBSP.surfaces) {
        if (surface.surfaceType == Surface.patch) {
          //print("tessellate");
          tessellate(surface, myBSP.drawVerts, myBSP.drawIndexes, 20);
        }
      }

      changeColors(myBSP.surfaces, myBSP.drawIndexes, myBSP.shaders, myBSP.drawVerts);
      
      List<double> vertsList = new List<double>();
      List<double> normalsList = new List<double>();
      List<double> texCoordsList = new List<double>();
      List<double> lmCoordsList = new List<double>();
      List<double> colorsList = new List<double>();
      for (Vertex vertex in myBSP.drawVerts) {
        vertsList.addAll(vertex.xyz);
        normalsList.addAll(vertex.normal);
        texCoordsList.add(vertex.st[0]);
        texCoordsList.add(vertex.st[1]);
        lmCoordsList.add(vertex.lightmap[0]);
        lmCoordsList.add(vertex.lightmap[1]);
        colorsList.addAll(vertex.color);
      }


      List<int> indicesList = removeUnneededObjects(myBSP.surfaces, myBSP.shaders, myBSP.drawIndexes);

      Uint16List  xs = new Uint16List.fromList(indicesList);
      Float32List vs = new Float32List.fromList(vertsList);
      Float32List ns = new Float32List.fromList(normalsList);
      Float32List cs = new Float32List.fromList(colorsList);

      myBSP.nodes = BSPNode.parse(parser.getLump(LumpTypes.Nodes));
      myBSP.planes = Plane.parse(parser.getLump(LumpTypes.Planes));
      myBSP.leafs = Leaf.parse(parser.getLump(LumpTypes.Leafs)); // TODO: rename
      myBSP.leafSurfaces = parser.getLump(LumpTypes.LeafSurfaces).readAllSignedInts();
      myBSP.leafBrushes = parser.getLump(LumpTypes.LeafBrushes).readAllSignedInts();
      myBSP.brushes = Brush.parse(parser.getLump(LumpTypes.Brushes));
      myBSP.brushSides = Brushside.parse(parser.getLump(LumpTypes.BrushSides));

      BSPTree bspTree = new BSPTree(myBSP);
      fpscam.setBSPTree( bspTree);
      
      for( var a =0; a<vs.length ;a++) {
        vs[a] = vs[a] / 100;
      }
      
      sp.add( new MeshData(vertices: vs, normals: ns, vertexIndices: xs, colors: cs).createMesh());
      chronosGL.run();
    });

  });
  
 
}


