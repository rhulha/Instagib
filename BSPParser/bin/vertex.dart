part of bspparser;

class Vertex {

  Float32List xyz; // Vertex position.
  Float32List st; // Vertex texture coordinates.
  Float32List lightmap; // Vertex lightmap coordinates.
  Float32List normal; // Vertex normal.
  Float32List color; // Vertex color. RGBA.  --  1.0 is max value

  static const int size = 44;

  Vertex.copy(this.xyz, this.st, this.lightmap, this.normal, this.color);

  Vertex.copy2(Vector xyz, Vector st, Vector lightmap, Vector normal, Vector color) {
    this.xyz = xyz.array;
    this.st = st.array;
    this.lightmap = lightmap.array;
    this.normal = normal.array;
    this.color = color.array;
  }

  Vertex(BinaryReader br) {
    this.xyz = br.readFloat(3);
    this.st = br.readFloat(2);
    this.lightmap = br.readFloat(2);
    this.normal = br.readFloat(3);

    this.color = new Float32List(3);
    Uint8List c = br.readBytes(4);
    
    this.color[0] = c[0]/255.0;
    this.color[1] = c[1]/255.0;
    this.color[2] = c[2]/255.0;
  }
  
  Vector xyzV(){
    return new Vector.useList(xyz);
  }

  Vector stV(){
    return new Vector(st[0], st[1], 0.0);
  }

  Vector lightmapV(){
    return new Vector(lightmap[0], lightmap[1], 0.0);
  }

  Vector normalV(){
    return new Vector.useList(normal);
  }

  Vector colorV(){
    return new Vector(color[0].toDouble(), color[1].toDouble(), color[2].toDouble());
  }


}
