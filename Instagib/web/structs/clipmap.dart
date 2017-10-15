part of instagib;

class ClipMap {
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
  var lightGrid;
  var visibility;
  
  int checkcount=0;
}
