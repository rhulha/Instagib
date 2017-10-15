library bspparser;

import 'dart:io';
import 'dart:typed_data';
import 'dart:math' as Math;

part 'binary_reader.dart';
part 'vertex.dart';
part 'surface.dart';
part 'vector.dart';
part 'tessellate.dart';
part 'shader.dart';

abstract class LumpTypes {
  static final int Entities = 0;
  static final int Shaders = 1;
  static final int Planes = 2;
  static final int Nodes = 3;
  static final int Leafs = 4;
  static final int LeafSurfaces = 5;
  static final int LeafBrushes = 6;
  static final int Models = 7;
  static final int Brushes = 8;
  static final int BrushSides = 9;
  static final int DrawVerts = 10;
  static final int DrawIndexes = 11;
  static final int Fogs = 12;
  static final int Surfaces = 13;
  static final int Lightmaps = 14;
  static final int LightGrid = 15;
  static final int Visibility = 16;
}

class BSPParser {

  RandomAccessFile raf;
  Int32List header;

  BSPParser(String filename) {
    var file = new File(filename);
    //Uint8List data = file.readAsBytesSync();

    raf = file.openSync(mode: READ);
    Uint8List headerBytes = new Uint8List(144);
    raf.readIntoSync(headerBytes);

    header = new Int32List.view(headerBytes.buffer);

    assert(header[0] == 1347633737); // "IBSP"
    assert(header[1] == 46); // Quake3 BSP version ID

  }

  Uint8List getLump(int type) {
    int offset = header[2 + type * 2];
    int length = header[2 + type * 2 + 1];

    Uint8List lump = new Uint8List(length);

    raf.setPositionSync(offset);
    raf.readIntoSync(lump);
    return lump;
  }

  List<Surface> getSurfaces() {
    BinaryReader br = new BinaryReader(getLump(LumpTypes.Surfaces).buffer);
    List<Surface> surfaces = new List<Surface>(br.length() ~/ Surface.size);
    for (int i = 0; i < surfaces.length; i++) {
      surfaces[i] = new Surface(br);
    }
    return surfaces;
  }

  List<Vertex> getDrawVerts() {
    BinaryReader br = new BinaryReader(getLump(LumpTypes.DrawVerts).buffer);
    int length = br.length() ~/ Vertex.size;
    List<Vertex> vertexes = new List<Vertex>(); // don't set fixed length so this list can grow
    for (int i = 0; i < length; i++) {
      vertexes.add( new Vertex(br));
    }
    return vertexes;
  }
  
  List<int> getDrawIndexes() {
    BinaryReader br = new BinaryReader(getLump(LumpTypes.DrawIndexes).buffer);
    int length = br.length() ~/ 4;
    List<int> drawIndexes = new List<int>(); // don't set fixed length so this list can grow
    for (int i = 0; i < length; i++) {
      drawIndexes.add( br.readOneInt());
    }
    return drawIndexes;
  }
  
  getShaders() {
    BinaryReader br = new BinaryReader(getLump(LumpTypes.Shaders).buffer);

    List<Shader> shaders = new List<Shader>(br.length() ~/ Shader.size);
    for (int i = 0; i < shaders.length; i++) {
      String name = br.readString(64);
      if( name.indexOf("\x00") >= 0) {
        name = name.substring(0, name.indexOf("\x00"));
      }
      shaders[i] = new Shader( name, br.readOneInt(), br.readOneInt());
    }
    return shaders;
  }
}


