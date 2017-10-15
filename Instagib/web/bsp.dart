part of instagib;

double q3bsptree_trace_offset = 0.03125;

class BSPNode {
  int planeNum;
  List<int> children;
  List<int> mins;
  List<int> maxs;
  BSPNode.init( this.planeNum, this.children, this.mins, this.maxs);
  BSPNode( Int32List data) {
    planeNum = data[0];
    children = data.sublist(1, 3);
    mins = data.sublist(3, 6);
    maxs = data.sublist(6, 9);
  }
  static List<BSPNode> parse(Int32List nodes) {
    List<BSPNode> nodes2 = new List<BSPNode>(nodes.length~/9);
    for( int i=0;i<nodes2.length;i++) {
      nodes2[i] = new BSPNode(nodes.sublist(i*9, i*9+9));
    }
    return nodes2;
  }
}

class Plane {
  Vector normal;
  double dist;
  Plane.init( this.normal, this.dist);
  Plane( Float32List data) {
    normal = new Vector.useList(data.sublist(0, 3));
    dist = data[3];
  }
  static List<Plane> parse(Float32List planes) {
    List<Plane> planes2 = new List<Plane>(planes.length~/4);
    for( int i=0;i<planes2.length;i++) {
      planes2[i] = new Plane(planes.sublist(i*4, i*4+4));
    }
    return planes2;
  }
}

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
  Leaf( Int32List data) {
    cluster = data[0];
    area = data[1];
    mins = data.sublist(2, 5);
    maxs = data.sublist(5, 8);
    firstLeafSurface = data[8];
    numLeafSurfaces = data[9];
    firstLeafBrush = data[10];
    numLeafBrushes = data[11];
  }
  static List<Leaf> parse(Int32List leaves) {
    List<Leaf> leaves2 = new List<Leaf>(leaves.length~/12);
    for( int i=0;i<leaves2.length;i++) {
      leaves2[i] = new Leaf(leaves.sublist(i*12, i*12+12));
    }
    return leaves2;
  }
}

class Brush {
  int firstSide;
  int numSides;
  int shaderNum;
  Brush.init( this.firstSide, this.numSides, this.shaderNum);
  Brush( Int32List data) {
    firstSide = data[0];
    numSides = data[1];
    shaderNum = data[2];
  }
  static List<Brush> parse(Int32List brushes) {
    List<Brush> brushes2 = new List<Brush>(brushes.length~/3);
    for( int i=0;i<brushes2.length;i++) {
      brushes2[i] = new Brush(brushes.sublist(i*3, i*3+3));
    }
    return brushes2;
  }
}

class Brushside {
  int planeNum;
  int shaderNum;
  Brushside.init(this.planeNum, this.shaderNum);
  Brushside( Int32List data) {
    planeNum = data[0];
    shaderNum = data[1];
  }
  
  static List<Brushside> parse(Int32List brushSides) {
    List<Brushside> brushSides2 = new List<Brushside>(brushSides.length~/2);
    for( int i=0;i<brushSides2.length;i++) {
      brushSides2[i] = new Brushside(brushSides.sublist(i*2, i*2+2));
    }
    return brushSides2;
  }
}

class Output {
  bool allSolid = false;
  bool startSolid = false;
  double fraction = 1.0;
  Vector endPos = new Vector();
  Plane plane;
}

class BSPTree {
  
  List<BSPNode> nodes;
  List<Plane> planes;
  List<Leaf> leaves;
  List<Brush> brushes;
  Int32List leafBrushes;
  var textures;
  List<Brushside> brushSides;

  BSPTree( this.nodes, this.planes, this.leaves, this.brushes, this.leafBrushes, this.textures, this.brushSides);
  
  
  Output trace( Vector start, Vector end, double radius) {
    Output output = new Output(); // TODO: use tmp
    output.endPos.set( end);
    
    traceNode( 0, 0.0, 1.0, start, end, radius, output);
    
    if( output.fraction != 1.0) { // collided with something
        for( int i = 0; i < 3; i++) {
            output.endPos[i] = start[i] + output.fraction * (end[i] - start[i]);
        }
    }
    
    return output;
  }

  void traceNode( int nodeIdx, double startFraction, double endFraction, Vector start, Vector end, double radius, Output output) {
    if( nodeIdx < 0) { // Leaf node?
      Leaf leaf = leaves[-(nodeIdx + 1)];
      for( int i = 0; i < leaf.numLeafBrushes; i++) {
        Brush brush = brushes[leafBrushes[leaf.firstLeafBrush + i]];
        var texture = textures[brush.shaderNum];
        if( brush.numSides > 0 && ((texture['contentFlags'] & 1) == 1)) {
          this.traceBrush( brush, start, end, radius, output);
        }
      }
      return;
    }
    
    // Tree node
    BSPNode node = nodes[nodeIdx];
    Plane plane = planes[node.planeNum];
    
    double startDist = plane.normal.dot(start) - plane.dist;
    double endDist = plane.normal.dot(end) - plane.dist;
    
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

  void traceBrush( Brush brush, Vector start, Vector end, double radius, Output output) {
    double startFraction = -1.0;
    double endFraction = 1.0;
    bool startsOut = false;
    bool endsOut = false;
    Plane collisionPlane = null;
    
    for (int i = 0; i < brush.numSides; i++) {
        Brushside brushSide = brushSides[brush.firstSide + i];
        Plane plane = planes[brushSide.planeNum];
        
        double startDist = start.dot(plane.normal ) - (plane.dist + radius);
        double endDist = end.dot(plane.normal ) - (plane.dist + radius);

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



