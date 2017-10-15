library instagib;

import 'dart:html' as HTML;
import 'dart:js' as JS;
import 'dart:math' as Math;
import 'dart:convert' as CONVERT;
import 'dart:async';
import 'dart:typed_data';
import 'package:chronosgl/chronosgl.dart';
import 'package:chronosal/chronosal.dart';
import 'package:bspparser/BSPParser.dart';

part 'q3dm17.dart';
part 'trace.dart';
part 'QuakeCamera.dart';
part 'instagib_shader.dart';
part 'laser.dart';
part 'file_cache.dart';

ChronosGL chronosGL;
Camera camera;
TextureCache textureCache;
ChronosAL snd = new ChronosAL();

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
  ["nx", "px", "nz", "pz", "ny", "py"].forEach((n)=>textureCache.add("textures/skybox_$n.png"));

  snd.loadSound('data/jump1.wav', 'jump');
  snd.loadSound('data/jumppad.wav', 'jumppad');
  snd.loadSound('data/railgf1a.wav', 'rail');
  
  textureCache.loadAllThenExecute(() {

    utils.addSkybox( "textures/skybox_", ".png", "nx", "px", "nz", "pz", "ny", "py");
    
    chronosGL.getUtils().loadBinaryFile("data/q3dm17.bsp").then((ByteBuffer bspFile){
      BSPParser parser = new BSPParser(bspFile);
      ClipMap cm = parser.getClipMap();

      List entities = CONVERT.JSON.decode(parser.getEntities());

      for (Map ent in entities) {
        if (ent["classname"] == "trigger_push") {
          cm.trigger[ent["model"]] = ent["target"];
        } else if (ent["classname"] == "target_position") {
          cm.targets[ent["targetname"]] = ent["origin"];
        }
      }


      changeColors(cm.surfaces, cm.drawIndexes, cm.shaders, cm.drawVerts);

      List<double> vertsList = new List<double>();
      List<double> normalsList = new List<double>();
      List<double> texCoordsList = new List<double>();
      List<double> lmCoordsList = new List<double>();
      List<double> colorsList = new List<double>();
      for (Vertex vertex in cm.drawVerts) {
        vertsList.addAll(vertex.xyz);
        normalsList.addAll(vertex.normal);
        texCoordsList.add(vertex.st[0]);
        texCoordsList.add(vertex.st[1]);
        lmCoordsList.add(vertex.lightmap[0]);
        lmCoordsList.add(vertex.lightmap[1]);
        colorsList.addAll(vertex.color);
      }

      List<int> indicesList = removeUnneededObjects(cm.surfaces, cm.shaders, cm.drawIndexes);

      Uint16List xs = new Uint16List.fromList(indicesList);
      Float32List vs = new Float32List.fromList(vertsList);
      Float32List ns = new Float32List.fromList(normalsList);
      Float32List cs = new Float32List.fromList(colorsList);

      BSPTree bspTree = new BSPTree(cm);
      fpscam.setBSPTree(bspTree);

      for (var a = 0; a < vs.length; a++) {
        vs[a] = vs[a] / 100;
      }

      sp.add(          new MeshData(vertices: vs, normals: ns, vertexIndices: xs, colors: cs)              .createMesh());
      chronosGL.run();
    });

  });

 
}


