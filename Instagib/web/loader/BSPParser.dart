library bspparser;

import 'dart:typed_data';
import 'package:chronosgl/chronosgl.dart';

part 'binary_reader.dart';
part 'vertex.dart';
part 'surface.dart';
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
  Int32List header;
  ByteBuffer bb;
  Uint8List bytes;

  BSPParser(ByteBuffer bb) {
    header = new Int32List.view(bb, 0, 36);
    assert(header[0] == 1347633737); // "IBSP"
    assert(header[1] == 46); // Quake3 BSP version ID
    this.bb = bb;
  }

  BinaryReader getLump(int type) {
    int offset = header[2 + type * 2];
    int length = header[2 + type * 2 + 1];
    
    print("getLump: $type $offset $length");
    return new BinaryReader(bb, offset, length);
  }

  List<Surface> getSurfaces() {
    BinaryReader br = getLump(LumpTypes.Surfaces);
    List<Surface> surfaces = new List<Surface>(br.length ~/ Surface.size);
    print("surfaces.length " + surfaces.length.toString());
    for (int i = 0; i < surfaces.length; i++) {
      surfaces[i] = new Surface(br);
    }
    return surfaces;
  }

  List<Vertex> getDrawVerts() {
    BinaryReader br = getLump(LumpTypes.DrawVerts);
    int length = br.length ~/ Vertex.size;
    List<Vertex> vertexes = new List<Vertex>(); // don't set fixed length so this list can grow
    for (int i = 0; i < length; i++) {
      vertexes.add( new Vertex(br));
    }
    return vertexes;
  }
  
  List<int> getDrawIndexes() {
    BinaryReader br = getLump(LumpTypes.DrawIndexes);
    int length = br.length ~/ 4;
    List<int> drawIndexes = new List<int>(); // don't set fixed length so this list can grow
    for (int i = 0; i < length; i++) {
      drawIndexes.add( br.readOneInt());
    }
    return drawIndexes;
  }
  
  getShaders() {
    BinaryReader br = getLump(LumpTypes.Shaders);

    List<Shader> shaders = new List<Shader>(br.length ~/ Shader.size);
    print("shaders.length " + shaders.length.toString());
    print(br.length);
    print(Shader.size);
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


