part of instagib;

class Plane {
  Vector normal;
  double dist;
  int type;
  int signbits;
  
  Plane( [this.normal, this.dist]) {
    if(normal==null) normal = new Vector();
    if(dist==null) dist = 0.0;
    setTypeAndSignbits();
  }

  Plane.fromBinaryReader( BinaryReader br) {
    normal = new Vector.useList(br.readFloat(3));
    dist = br.readOneFloat();
    setTypeAndSignbits();    
  }
  
  void clear() {
    normal.scale(0);
    dist = 0.0;
    setTypeAndSignbits();
  }
  
  void setTypeAndSignbits(){
    type = planeTypeForNormal(normal);
    signbits = signbitsForNormal(normal.array);
  }
  
  static List<Plane> parse(BinaryReader br) {
    int count = br.length~/(4*4); // 9 * float32
    List<Plane> planes = new List<Plane>(count);
    for( int i=0;i<count;i++) {
      planes[i] = new Plane.fromBinaryReader(br);
    }
    return planes;
  }
}
