part of instagib;

class Leaf {
  int cluster;
  int area;
  List<int> mins;
  List<int> maxs;
  int firstLeafSurface;
  int numLeafSurfaces;
  int firstLeafBrush;
  int numLeafBrushes;
  Leaf.init(this.cluster, this.area, this.mins, this.maxs, this.firstLeafSurface, this.numLeafSurfaces, this.firstLeafBrush, this.numLeafBrushes);
  Leaf( BinaryReader br) {
    cluster = br.readOneSignedInt();
    area = br.readOneSignedInt();
    mins = br.readSignedInt(3);
    maxs = br.readSignedInt(3);
    firstLeafSurface = br.readOneSignedInt();
    numLeafSurfaces = br.readOneSignedInt();
    firstLeafBrush = br.readOneSignedInt();
    numLeafBrushes = br.readOneSignedInt();
  }
  static List<Leaf> parse(BinaryReader br) {
    int count = br.length~/(12*4); // 12 * int32
    List<Leaf> leafs = new List<Leaf>(count);
    for( int i=0;i<count;i++) {
      leafs[i] = new Leaf(br);
    }
    return leafs;
  }
}
