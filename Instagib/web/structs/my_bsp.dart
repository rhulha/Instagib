part of instagib;

class MyBSP {
  var entities;
  List<Shader> shaders;
  List<Plane> planes;
  List<BSPNode> nodes;
  List<Leaf> leafs;
  Int32List leafSurfaces;
  Int32List leafBrushes;
  var models;
  List<Brush> brushes;
  List<Brushside> brushSides;
  List<Vertex> drawVerts;
  List<int> drawIndexes;
  var fogs;
  List<Surface> surfaces;
  List<Surface> surfacesUntessellated;
  var lightmaps;
  var lghtGrid5;
  var visibility;
}
