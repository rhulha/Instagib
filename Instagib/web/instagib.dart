library instagib;

import 'dart:html' as HTML;
import 'dart:math' as Math;
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

void loadMD3(ShaderProgram sp, String name, double offset, int frame) {
  chronosGL.getUtils().loadBinaryFile(name).then((ByteBuffer md3File) {
    MD3Parser md3 = new MD3Parser(md3File);
    List<double> vertsList = new List<double>();
    List<double> normalsList = new List<double>();
    List<double> colorsList = new List<double>();

    print(md3.verts.length);

    for(int i=0; i<md3.verts.length; i++) {
      if(i%4==3) {
        double lat = (( md3.verts[i] >> 8 ) & 0xff).toDouble();
        double lng = (( md3.verts[i] & 0xff )).toDouble();
        lat *= Math.PI/128;
        lng *= Math.PI/128;

        normalsList.add( Math.cos(lat) * Math.sin(lng));
        normalsList.add( Math.sin(lat) * Math.sin(lng));
        normalsList.add( Math.cos(lng));

        colorsList.add( Math.cos(lat) * Math.sin(lng));
        colorsList.add( Math.sin(lat) * Math.sin(lng));
        colorsList.add( Math.cos(lng));
      } else {

        if(i%4==0) {
          vertsList.add(3+md3.verts[i]/(64.0*100.0));
        } else if(i%4==2) {
          vertsList.add(2.5+offset+md3.verts[i]/(64.0*100.0));
        } else {
          vertsList.add(6+md3.verts[i]/(64.0*100.0));
        }
      }
    }
    Float32List vs = new Float32List.fromList(vertsList);
    Float32List ns = new Float32List.fromList(normalsList);
    Float32List cs = new Float32List.fromList(colorsList);

    for(int i=0; i < md3.indexes.length; i++) {
      md3.indexes[i] += frame*md3.num_verts;
    }

    sp.add(
        new MeshData(vertices: vs, normals: ns, vertexIndices: md3.indexes, colors: cs).createMesh());
  });
}

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
  snd.loadSound('data/gibsplt1.wav', 'gibsplt');
  
  textureCache.loadAllThenExecute(() {

    utils.addSkybox( "textures/skybox_", ".png", "nx", "px", "nz", "pz", "ny", "py");
    
    chronosGL.getUtils().loadBinaryFile("data/q3dm17.bsp").then((ByteBuffer bspFile){
      BSPParser parser = new BSPParser(bspFile);
      ClipMap cm = parser.getClipMap();

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

      sp.add( new MeshData(vertices: vs, normals: ns, vertexIndices: xs, colors: cs).createMesh());
      chronosGL.run();
    });

    loadMD3(sp, "data/head.md3", 1.3, 0);
    loadMD3(sp, "data/upper.md3", 1.1, 151);
    loadMD3(sp, "data/lower.md3", 0.9, 0);

  });

 
}


