part of bspparser;

class Model {
  Vector mins; // Bounding box min coord.
  Vector maxs; // Bounding box max coord.
  int face; //  First face for model.
  int numFaces; // Number of faces for model.
  int brush; // First brush for model.
  int numBrushes; // Number of brushes for model.
  
  Model( BinaryReader br) {
    mins = new Vector.useList(br.readFloat(3));
    mins.x-=1; // // spread the mins / maxs by a pixel
    mins.y-=1;
    mins.z-=1;

    maxs = new Vector.useList(br.readFloat(3));
    maxs.x+=1; // // spread the mins / maxs by a pixel
    maxs.y+=1;
    maxs.z+=1;

    face = br.readOneSignedInt();
    numFaces = br.readOneSignedInt();
    brush = br.readOneSignedInt();
    numBrushes = br.readOneSignedInt();
  }
  
  static List<Model> parse(BinaryReader br) {
    int count = br.length~/(2*3*4+4*4); // 2 vectors + 4 * int32
    List<Model> models = new List<Model>(count);
    for( int i=0;i<models.length;i++) {
      models[i] = new Model(br);
    }
    return models;
  }
}
