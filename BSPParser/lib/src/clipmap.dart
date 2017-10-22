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

  // Entities
  Map<String, String> trigger_push = new Map<String, String>();
  Map<String, String> target_position = new Map<String, String>();
  List<String> info_player_deathmatch = new List<String>();
  Map<String, String> trigger_hurt = new Map<String, String>();
  


  int checkcount=0;
}
