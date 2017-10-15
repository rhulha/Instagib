part of instagib;

class Grid {
  int width;
  int height;
  bool wrapWidth;
  bool wrapHeight;
  List<List<Vector>> points = new List<List<Vector>>.generate(129, (idx)=> new List<Vector>.generate(129, (idx)=>new Vector())); // [width*height] MAX_GRID_SIZE = 129
}

class Winding {
  int numpoints;
  List<Vector> p = new List<Vector>.generate(4, (idx)=>new Vector());   // variable sized
}

class PatchPlane {
  List<double> plane = new List<double>(4);
  int   signbits;   // signx + (signy<<1) + (signz<<2), used as lookup during collision
}
class Facet {
  int     surfacePlane;
  int     numBorders;   // 3 or four + 6 axial bevels + 4 or 3 * 4 edge bevels
  List<int> borderPlanes = new List<int>(4+6+16);
  List<bool> borderInward = new List<bool>(4+6+16);
  List<bool> borderNoAdjust = new List<bool>(4+6+16);
}
class PatchCollide {
  List<Vector> bounds = new List<Vector>.generate(2, (idx)=>new Vector());
  int numPlanes;      // surface planes plus edge planes
  List<PatchPlane> planes;
  int   numFacets;
  List<Facet> facets;
}
class Patch {
  int checkcount;       // to avoid repeated testings
  int surfaceFlags;
  int contents;
  PatchCollide pc;

  Patch(Shader shader){
    this.contents = shader.contentFlags;
    this.surfaceFlags = shader.surfaceFlags;
  }
}
