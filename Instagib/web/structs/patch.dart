part of instagib;

class PatchPlane {
  List<double> plane = new List<double>(4);
  int   signbits;   // signx + (signy<<1) + (signz<<2), used as lookup during collision
}
class Facet {
  int     surfacePlane;
  int     numBorders;   // 3 or four + 6 axial bevels + 4 or 3 * 4 edge bevels
  List<int> borderPlanes = new List<int>(4+6+16);
  List<int> borderInward = new List<int>(4+6+16);
  List<bool> borderNoAdjust = new List<bool>(4+6+16);
}
class PatchCollide {
  List<Vector> bounds = new List<Vector>(2);
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
}
