library bspparser;

import 'dart:io';
import 'dart:typed_data';
import 'dart:math' as Math;

part 'binary_reader.dart';
part 'vertex.dart';
part 'surface.dart';
part 'vector.dart';
part 'tessellate.dart';

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
    List<Vertex> vertexes = new List<Vertex>(length);
    for (int i = 0; i < length; i++) {
      vertexes.add(new Vertex(br));
    }
    return vertexes;
  }
  
  List<int> getDrawIndexes() {
    BinaryReader br = new BinaryReader(getLump(LumpTypes.DrawIndexes).buffer);
    List<int> drawIndexes = new List<int>();
    int length = br.length() ~/ 4;
    for (int i = 0; i < length; i++) {
      drawIndexes.add( br.readOneInt());
    }
    return drawIndexes;
  }
}


void main() {

  BSPParser bsp = new BSPParser('q3dm17.bsp');

  new File("q3dm17.brushes").writeAsBytesSync(bsp.getLump(LumpTypes.Brushes));
  new File("q3dm17.brushsides").writeAsBytesSync(bsp.getLump(LumpTypes.BrushSides));
  new File("q3dm17.leafbrushes").writeAsBytesSync(bsp.getLump(LumpTypes.LeafBrushes));
  new File("q3dm17.leafs").writeAsBytesSync(bsp.getLump(LumpTypes.Leafs));
  new File("q3dm17.nodes").writeAsBytesSync(bsp.getLump(LumpTypes.Nodes));
  new File("q3dm17.planes").writeAsBytesSync(bsp.getLump(LumpTypes.Planes));

  List<Surface> surfaces = bsp.getSurfaces();

  List<Vertex> vertexes = bsp.getDrawVerts();
  List<int> indexes = bsp.getDrawIndexes();


  for (Surface surface in surfaces) {
    if (surface.surfaceType == Surface.patch) {
      print("tessellate");
      tessellate(surface, vertexes, indexes, 10);
    }
  }
}
