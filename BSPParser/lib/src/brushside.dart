part of bspparser;

class Brushside {
  int planeNum;
  int shaderNum;
  Brushside.init(this.planeNum, this.shaderNum);
  Brushside( BinaryReader br) {
    planeNum = br.readOneSignedInt();
    shaderNum = br.readOneSignedInt();
  }
  
  static List<Brushside> parse(BinaryReader br) {
    int count = br.length~/(2*4); // 2 * int32
    List<Brushside> brushSides = new List<Brushside>(count);
    for( int i=0;i<count;i++) {
      brushSides[i] = new Brushside(br);
    }
    return brushSides;
  }
}
