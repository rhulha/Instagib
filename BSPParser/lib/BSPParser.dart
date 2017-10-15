library bspparser;

import 'dart:typed_data';
import 'dart:math' as Math;
import 'package:chronosgl/chronosmath.dart';

part 'src/binary_reader.dart';
part 'src/vertex.dart';
part 'src/surface.dart';
part 'src/tessellate.dart';
part 'src/shader.dart';
part 'src/brush.dart';
part 'src/brushside.dart';
part 'src/bsp_node.dart';
part 'src/helper.dart';
part 'src/leaf.dart';
part 'src/patch.dart';
part 'src/plane.dart';
part 'src/model.dart';

part 'src/clipmap.dart';

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
  
  List<Shader> getShaders() {
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
  
  // returns JSON (I hope)
  String getEntities() {
    BinaryReader br = getLump(LumpTypes.Entities);
    String s = br.readString(br.length-1);
    s = s.replaceAll("}\n{", "},\n{");
    s = s.replaceAll('" "', '": "');
    s = s.replaceAll('"\n"', '",\n"');
    return "["+s+"]";
  }
  
  List<Model> getModels() {
    return Model.parse(getLump(LumpTypes.Models));
  }

  // Get it all !!
  ClipMap getClipMap() {
    ClipMap cm = new ClipMap();
    cm.shaders = getShaders();
    cm.surfaces = getSurfaces();
    cm.surfacesUntessellated = new List<Surface>.generate(cm.surfaces.length, (int idx)=>new Surface.copy(cm.surfaces[idx]));
    cm.drawVerts = getDrawVerts();
    cm.drawIndexes = getDrawIndexes();
        
    for (Surface surface in cm.surfaces) {
      if (surface.surfaceType == Surface.patch) {
        //print("tessellate");
        tessellate(surface, cm.drawVerts, cm.drawIndexes, 20);
      }
    }

    cm.nodes = BSPNode.parse(getLump(LumpTypes.Nodes));
    cm.planes = Plane.parse(getLump(LumpTypes.Planes));
    cm.leafs = Leaf.parse(getLump(LumpTypes.Leafs));
    cm.leafSurfaces = getLump(LumpTypes.LeafSurfaces).readAllSignedInts();
    cm.leafBrushes = getLump(LumpTypes.LeafBrushes).readAllSignedInts();
    cm.brushes = Brush.parse(getLump(LumpTypes.Brushes));
    cm.brushSides = Brushside.parse(getLump(LumpTypes.BrushSides));

    cm.models = getModels();

    return cm;
  }
}


