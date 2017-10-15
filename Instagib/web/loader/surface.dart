part of bspparser;

class Surface {

  static int polygon = 1;
  static int patch = 2;
  static int mesh = 3;
  static int billboard = 4;

  static const int size = 104;

  int shaderNum;
  int fogNum;//    Index into lump 12 (Effects), or -1.
  int surfaceType;//     Face type. 1=polygon, 2=patch, 3=mesh, 4=billboard
  int firstVert;//   Index of first vertex.
  int numVerts;//  Number of vertices that form a polygon ( not yet triangulated )
  int firstIndex;//    Index of first meshvert.
  int numIndexes;//  Number of meshverts that form a triangulated polygon (mesh?)
  int lightmapNum;//   Lightmap index.
  List<int> lm_start;//  Corner of this face's lightmap image in lightmap.
  List<int> lm_size;//   Size of this face's lightmap image in lightmap.
  List<double> lightmapOrigin;//  World space origin of lightmap.
  List<double> lightmapVecs;//  World space lightmap s and t unit vectors. (and maybe normal)
  List<int> patch_size;//  Patch dimensions.

  Surface(BinaryReader br) {
    this.shaderNum = br.readOneInt();
    this.fogNum = br.readOneInt();
    this.surfaceType = br.readOneInt();
    this.firstVert = br.readOneInt();
    this.numVerts = br.readOneInt();
    this.firstIndex = br.readOneInt();
    this.numIndexes = br.readOneInt();
    this.lightmapNum = br.readOneInt();
    this.lm_start = br.readInt(2);
    this.lm_size = br.readInt(2);
    this.lightmapOrigin = br.readFloat(3);
    this.lightmapVecs = br.readFloat(9);
    this.patch_size = br.readInt(2);
  }
  Surface.copy(Surface s) {
    this.shaderNum = s.shaderNum;
    this.fogNum = s.fogNum;
    this.surfaceType = s.surfaceType;
    this.firstVert = s.firstVert;
    this.numVerts = s.numVerts;
    this.firstIndex = s.firstIndex;
    this.numIndexes = s.numIndexes;
    this.lightmapNum = s.lightmapNum;
    this.lm_start = s.lm_start;
    this.lm_size = s.lm_size;
    this.lightmapOrigin = s.lightmapOrigin;
    this.lightmapVecs = s.lightmapVecs;
    this.patch_size = s.patch_size;
    
  }

}
