part of bspparser;

class ClipMap {
  var entities;
  List<Shader> shaders;
  List<Plane> planes;
  List<BSPNode> nodes;
  List<Leaf> leafs;
  Int32List leafSurfaces;
  Int32List leafBrushes;
  List<Model> models;
  List<Brush> brushes;
  List<Brushside> brushSides;
  List<Vertex> drawVerts;
  List<int> drawIndexes;
  var fogs;
  List<Surface> surfaces;
  List<Surface> surfacesUntessellated;
  var lightmaps;
  var lightGrid;
  var visibility;

  Map<String, String> trigger = new Map<String, String>();
  Map<String, String> targets = new Map<String, String>();


  int checkcount=0;
}
