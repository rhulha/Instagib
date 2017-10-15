part of instagib;

class Plane {
  Vector normal;
  double dist;
  Plane.init( this.normal, this.dist);
  Plane( [BinaryReader br]) {
    if( br != null) {
      normal = new Vector.useList(br.readFloat(3));
      dist = br.readOneFloat();
    } else { 
      normal = new Vector();
      dist = 0.0;
    }
  }
  static List<Plane> parse(BinaryReader br) {
    int count = br.length~/(4*4); // 9 * float32
    List<Plane> planes = new List<Plane>(count);
    for( int i=0;i<count;i++) {
      planes[i] = new Plane(br);
    }
    return planes;
  }
}
