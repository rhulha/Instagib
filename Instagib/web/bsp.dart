part of instagib;

double q3bsptree_trace_offset = 0.03125;

class Node {
  int plane;
  List<int> children;
  List<int> mins;
  List<int> maxs;
  Node.init( this.plane, this.children, this.mins, this.maxs);
  Node( Int32List data) {
    plane = data[0];
    children = data.sublist(1, 3);
    mins = data.sublist(3, 6);
    maxs = data.sublist(6, 9);
  }
}

class Plane {
  Vector normal;
  double distance;
  Plane.init( this.normal, this.distance);
  Plane( Float32List data) {
    normal = new Vector.fromList(data.sublist(0, 3));
    distance = data[3];
  }

}

class Leaf {
  int cluster;
  int area;
  List<int> mins;
  List<int> maxs;
  int leafface;
  int n_leaffaces;
  int leafbrush;
  int n_leafbrushes;
  Leaf.init(this.cluster, this.area, this.mins, this.maxs, this.leafface, this.n_leaffaces, this.leafbrush, this.n_leafbrushes);
  Leaf( Int32List data) {
    cluster = data[0];
    area = data[1];
    mins = data.sublist(2, 5);
    maxs = data.sublist(5, 8);
    leafface = data[8];
    n_leaffaces = data[9];
    leafbrush = data[10];
    n_leafbrushes = data[11];
  }
}

class Brush {
  int brushside;
  int n_brushsides;
  int texture;
  Brush.init( this.brushside, this.n_brushsides, this.texture);
  Brush( Int32List data) {
    brushside = data[0];
    n_brushsides = data[1];
    texture = data[2];
  }
}

class Brushside {
  int plane;
  int texture;
  Brushside.init(this.plane, this.texture);
  Brushside( Int32List data) {
    plane = data[0];
    texture = data[1];
  }
}

class BSPTree {
  
  List<Node> nodes;
  List<Plane> planes;
  List<Leaf> leaves;
  List<Brush> brushes;
  Int32List leafBrushes;
  var textures;
  List<Brushside> brushSides;

  BSPTree( this.nodes, this.planes, this.leaves, this.brushes, this.leafBrushes, this.textures, this.brushSides);
  
  
  void trace( Vector start, Vector end, num radius) {
    var output = {
        "allSolid": false,
        "startSolid": false,
        "fraction": 1.0,
        "endPos": end,
        "plane": null
    };
    
    traceNode(0, 0, 1, start, end, radius, output);
    
    if(output['fraction'] != 1.0) { // collided with something
        for (int i = 0; i < 3; i++) {
            output['endPos'][i] = start[i] + output['fraction'] * (end[i] - start[i]);
        }
    }
    
    return output;
  }

  traceNode(int nodeIdx, num startFraction, num endFraction, Vector start, Vector end, num radius, var output) {
    if (nodeIdx < 0) { // Leaf node?
      Leaf leaf = leaves[-(nodeIdx + 1)];
      for (int i = 0; i < leaf.n_leafbrushes; i++) {
        Brush brush = brushes[leafBrushes[leaf.leafbrush + i]];
        var texture = textures[brush.texture];
        if (brush.n_brushsides > 0 && texture.contents & 1) {
          this.traceBrush(brush, start, end, radius, output);
        }
      }
      return;
    }
    
    // Tree node
    Node node = nodes[nodeIdx];
    Plane plane = planes[node.plane];
    
    double startDist = plane.normal.dot(start) - plane.distance;
    double endDist = plane.normal.dot(end) - plane.distance;
    
    if (startDist >= radius && endDist >= radius) {
      this.traceNode(node.children[0], startFraction, endFraction, start, end, radius, output );
    } else if (startDist < -radius && endDist < -radius) {
      this.traceNode(node.children[1], startFraction, endFraction, start, end, radius, output );
    } else {
      int side;
      double fraction1, fraction2, middleFraction;
      Vector middle = new Vector();

      if (startDist < endDist) {
        side = 1; // back
        double iDist = 1 / (startDist - endDist);
        fraction1 = (startDist - radius + q3bsptree_trace_offset) * iDist;
        fraction2 = (startDist + radius + q3bsptree_trace_offset) * iDist;
      } else if (startDist > endDist) {
        side = 0; // front
        double iDist = 1 / (startDist - endDist);
        fraction1 = (startDist + radius + q3bsptree_trace_offset) * iDist;
        fraction2 = (startDist - radius - q3bsptree_trace_offset) * iDist;
      } else {
        side = 0; // front
        fraction1 = 1.0;
        fraction2 = 0.0;
      }
      
      if (fraction1 < 0) fraction1 = 0.0;
      else if (fraction1 > 1) fraction1 = 1.0;
      if (fraction2 < 0) fraction2 = 0.0;
      else if (fraction2 > 1) fraction2 = 1.0;
      
      middleFraction = startFraction + (endFraction - startFraction) * fraction1;
      
      for (int i = 0; i < 3; i++) {
        middle[i] = start[i] + fraction1 * (end[i] - start[i]);
      }
      
      this.traceNode(node.children[side], startFraction, middleFraction, start, middle, radius, output );
      
      middleFraction = startFraction + (endFraction - startFraction) * fraction2;
      
      for (int i = 0; i < 3; i++) {
        middle[i] = start[i] + fraction2 * (end[i] - start[i]);
      }
      
      this.traceNode(node.children[side==0?1:0], middleFraction, endFraction, middle, end, radius, output );
    }
  }

  void traceBrush(brush, start, end, radius, output) {
    double startFraction = -1.0;
    double endFraction = 1.0;
    bool startsOut = false;
    bool endsOut = false;
    Plane collisionPlane = null;
    
    for (int i = 0; i < brush.brushSideCount; i++) {
        Brushside brushSide = brushSides[brush.brushSide + i];
        Plane plane = planes[brushSide.plane];
        
        double startDist = start.dot(plane.normal ) - (plane.distance + radius);
        double endDist = end.dot(plane.normal ) - (plane.distance + radius);

        if (startDist > 0) startsOut = true;
        if (endDist > 0) endsOut = true;

        // make sure the trace isn't completely on one side of the brush
        if (startDist > 0 && endDist > 0) { return; }
        if (startDist <= 0 && endDist <= 0) { continue; }

        if (startDist > endDist) { // line is entering into the brush
            double fraction = (startDist - q3bsptree_trace_offset) / (startDist - endDist);
            if (fraction > startFraction) {
                startFraction = fraction;
                collisionPlane = plane;
            }
        } else { // line is leaving the brush
            double fraction = (startDist + q3bsptree_trace_offset) / (startDist - endDist);
            if (fraction < endFraction)
                endFraction = fraction;
        }
    }
    
    if (startsOut == false) {
        output.startSolid = true;
        if (endsOut == false)
            output.allSolid = true;
        return;
    }

    if (startFraction < endFraction) {
        if (startFraction > -1 && startFraction < output.fraction) {
            output.plane = collisionPlane;
            if (startFraction < 0.0)
                startFraction = 0.0;
            output.fraction = startFraction;
        }
    }
    
    return;
  }
  
}



