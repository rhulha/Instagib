part of instagib;

class Brush {
  int firstSide;
  int numSides;
  int shaderNum;
  Brush.init( this.firstSide, this.numSides, this.shaderNum);
  Brush( BinaryReader br) {
    firstSide = br.readOneSignedInt();
    numSides = br.readOneSignedInt();
    shaderNum = br.readOneSignedInt();
  }
  static List<Brush> parse(BinaryReader br) {
    int count = br.length~/(3*4); // 3 * int32
    List<Brush> brushes = new List<Brush>(count);
    for( int i=0;i<brushes.length;i++) {
      brushes[i] = new Brush(br);
    }
    return brushes;
  }
}
