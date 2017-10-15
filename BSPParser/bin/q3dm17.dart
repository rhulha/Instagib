import 'dart:io';
import 'dart:typed_data';
import 'dart:convert';

import 'BSPParser.dart';

String basePath = "C:\\Users\\Ray\\dart\\Instagib\\web\\data\\";

//FileSystemEntity.parentOf(path)
//https://code.google.com/p/dart/issues/detail?id=17354
//var serialization = new Serialization();

void writeByteList(String filename, List<int> bytes) {
  print( filename);
  new File(basePath + "\\" + filename).writeAsBytesSync(bytes);
}

void writeByteBuffer(String filename, ByteBuffer bytes) {
  writeByteList(filename, new Uint8List.view(bytes));
}

void writeDoubleList(String filename, List<double> bytes) {
  writeByteBuffer(filename, new Float32List.fromList(bytes).buffer);
}

void writeString(String filename, String string) {
  print( filename);
  new File(basePath + "\\" + filename).writeAsStringSync(string);
}

void main() {
  // https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/dart:io.IOSink

  BSPParser bsp = new BSPParser('q3dm17.bsp');

  writeByteList("q3dm17.brushes",bsp.getLump(LumpTypes.Brushes));
  writeByteList("q3dm17.brushsides",bsp.getLump(LumpTypes.BrushSides));
  writeByteList("q3dm17.leafbrushes",bsp.getLump(LumpTypes.LeafBrushes));
  writeByteList("q3dm17.leafs",bsp.getLump(LumpTypes.Leafs));
  writeByteList("q3dm17.nodes",bsp.getLump(LumpTypes.Nodes));
  writeByteList("q3dm17.planes",bsp.getLump(LumpTypes.Planes));

  List<Shader> shaders = bsp.getShaders();
  JsonEncoder jsonEncoder = new JsonEncoder.withIndent("  ");
  writeString("q3dm17.textures", jsonEncoder.convert(shaders));

  List<Surface> surfaces = bsp.getSurfaces();
  List<Vertex> vertexes = bsp.getDrawVerts();
  List<int> indexes = bsp.getDrawIndexes();

  for (Surface surface in surfaces) {
    if (surface.surfaceType == Surface.patch) {
      //print("tessellate");
      tessellate(surface, vertexes, indexes, 10);
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
  writeDoubleList("q3dm17.verts", vertsList);
  writeDoubleList("q3dm17.normals", normalsList);
  writeDoubleList("q3dm17.texCoords", texCoordsList);
  writeDoubleList("q3dm17.lmCoords", lmCoordsList);
  writeDoubleList("q3dm17.colors", colorsList);
  
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
  writeByteBuffer("q3dm17.indices", new Uint16List.fromList(indicesList).buffer);

}


void changeColors(List<Surface> surfaces, List<int> indexes, List<Shader> shaders, List<Vertex> vertexes) {
  List<String> blue = new List<String>();
  blue.add("textures/base_wall/c_met5_2");
  blue.add("textures/base_trim/border11b");
  blue.add("textures/base_trim/border11light");
  blue.add("textures/base_light/lt2_2000");
  blue.add("textures/base_light/lt2_8000");
  blue.add("textures/base_light/baslt4_1_4k");
  blue.add("textures/base_wall/metaltech12final");
  blue.add("textures/base_light/light5_5k");
  blue.add("textures/base_wall/main_q3abanner");
  blue.add("textures/base_support/cable");
  blue.add("models/mapobjects/kmlamp1");
  blue.add("models/mapobjects/kmlamp_white");
  blue.add("models/mapobjects/teleporter/teleporter");
  blue.add("textures/base_trim/pewter_shiney");

  List<String> red = new List<String>();
  //red.add("textures/base_wall/atech1_e");
  //red.add("textures/base_light/light5_5k");

  for (Surface face in surfaces) {
    if (blue.contains(shaders[face.shaderNum].shader)) {
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        vertexes[i].color[2] = 1.0;
      }
    }
    if (red.contains(shaders[face.shaderNum].shader)) {
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        vertexes[i].color[0] = 1.0;
      }
    }

    if (shaders[face.shaderNum].shader == "textures/base_floor/diamond2c") { // special middle jump pad handling
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        double z = vertexes[i].xyz[2];
        if (z >= 95 && z <= 108) {
          vertexes[i].color[0] = 0.25;
          vertexes[i].color[1] = 0.25;
          vertexes[i].color[2] = 1.0;
        }

      }
    }
  }
}
