part of bspparser;

Vector getCurvePoint3(Vector c0, Vector c1, Vector c2, double dist) {
  double b = 1.0 - dist;
  Vector v0 = new Vector.fromList(c0.array);
  Vector v1 = new Vector.fromList(c1.array);
  Vector v2 = new Vector.fromList(c2.array);
  return v0.scale(b * b).add(v1.scale(2 * b * dist)).add(v2.scale(dist * dist));
}

Vector getCurvePoint2(Vector c0, Vector c1, Vector c2, double dist) {
  //double b = 1.0 - dist;

  Vector c30 = new Vector(c0.x, c0.y, 0.0);
  Vector c31 = new Vector(c1.x, c1.y, 0.0);
  Vector c32 = new Vector(c2.x, c2.y, 0.0);

  return getCurvePoint3(c30, c31, c32, dist); //c30.scale( b*b).add( c31.scale(2*b*dist) ).add(  c32.scale(dist*dist) );
}

void tessellate(Surface face, List<Vertex> vertexes, List<int> indexes, int level) {
  int off = face.firstVert;
  //int count = face.n_vertexes;

  int L1 = level + 1;

  face.firstVert = vertexes.length;
  face.firstIndex = indexes.length;

  face.numVerts = 0;
  face.numIndexes = 0;

  for (int py = 0; py < face.patch_size[1] - 2; py += 2) {
    for (int px = 0; px < face.patch_size[0] - 2; px += 2) {

      int rowOff = py * face.patch_size[0];

      // Store control points
      Vertex c0 = vertexes[off + rowOff + px],
             c1 = vertexes[off + rowOff + px + 1],
             c2 = vertexes[off + rowOff + px + 2];
      rowOff += face.patch_size[0];
      Vertex c3 = vertexes[off + rowOff + px],
             c4 = vertexes[off + rowOff + px + 1],
             c5 = vertexes[off + rowOff + px + 2];
      rowOff += face.patch_size[0];
      Vertex c6 = vertexes[off + rowOff + px],
             c7 = vertexes[off + rowOff + px + 1],
             c8 = vertexes[off + rowOff + px + 2];

      int indexOff = face.numVerts;
      face.numVerts += L1 * L1;

      // Tesselate!
      for (int i = 0; i < L1; ++i) {
        double a = i * 1.0 / level;

        Vector pos = getCurvePoint3(c0.xyzV(), c3.xyzV(), c6.xyzV(), a);
        Vector lmCoord = getCurvePoint2(c0.lightmapV(), c3.lightmapV(), c6.lightmapV(), a);
        Vector texCoord = getCurvePoint2(c0.stV(), c3.stV(), c6.stV(), a);
        Vector color = getCurvePoint3(c0.colorV(), c3.colorV(), c6.colorV(), a);

        Vertex vert = new Vertex.copy2(pos, texCoord, lmCoord, new Vector(0.0, 0.0, 1.0), color);

        vertexes.add(vert);
      }

      for (int i = 1; i < L1; i++) {
        double a = i * 1.0 / level;

        Vector pc0 = getCurvePoint3(c0.xyzV(), c1.xyzV(), c2.xyzV(), a);
        Vector pc1 = getCurvePoint3(c3.xyzV(), c4.xyzV(), c5.xyzV(), a);
        Vector pc2 = getCurvePoint3(c6.xyzV(), c7.xyzV(), c8.xyzV(), a);

        Vector tc0 = getCurvePoint3(c0.stV(), c1.stV(), c2.stV(), a);
        Vector tc1 = getCurvePoint3(c3.stV(), c4.stV(), c5.stV(), a);
        Vector tc2 = getCurvePoint3(c6.stV(), c7.stV(), c8.stV(), a);

        Vector lc0 = getCurvePoint3(c0.lightmapV(), c1.lightmapV(), c2.lightmapV(), a);
        Vector lc1 = getCurvePoint3(c3.lightmapV(), c4.lightmapV(), c5.lightmapV(), a);
        Vector lc2 = getCurvePoint3(c6.lightmapV(), c7.lightmapV(), c8.lightmapV(), a);

        Vector cc0 = getCurvePoint3(c0.colorV(), c1.colorV(), c2.colorV(), a);
        Vector cc1 = getCurvePoint3(c3.colorV(), c4.colorV(), c5.colorV(), a);
        Vector cc2 = getCurvePoint3(c6.colorV(), c7.colorV(), c8.colorV(), a);

        for (int j = 0; j < L1; j++) {
          double b = j * 1.0 / level;

          Vector pos = getCurvePoint3(pc0, pc1, pc2, b);
          Vector texCoord = getCurvePoint2(tc0, tc1, tc2, b);
          Vector lmCoord = getCurvePoint2(lc0, lc1, lc2, b);
          Vector color = getCurvePoint3(cc0, cc1, cc2, a);

          Vertex vert = new Vertex.copy2(pos, texCoord, lmCoord, new Vector(0.0, 0.0, 1.0), color);

          vertexes.add(vert);
        }
      }

      face.numIndexes += level * level * 6;

      for (int row = 0; row < level; ++row) {
        for (int col = 0; col < level; ++col) {
          indexes.add(indexOff + (row + 1) * L1 + col);
          indexes.add(indexOff + row * L1 + col);
          indexes.add(indexOff + row * L1 + (col + 1));

          indexes.add(indexOff + (row + 1) * L1 + col);
          indexes.add(indexOff + row * L1 + (col + 1));
          indexes.add(indexOff + (row + 1) * L1 + (col + 1));
        }
      }
    }
  }
}
