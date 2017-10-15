part of instagib;

double q3bsptree_trace_offset = 0.03125;

class Output {
  bool allSolid = false;
  bool startSolid = false;
  double fraction = 1.0;
  Vector endPos = new Vector();
  Plane plane;
}

class BSPTree {
  MyBSP myBSP;
  BSPTree( this.myBSP) {
    
    List<Patch> patches = new List<Patch>();
    
    for (Surface surface in myBSP.surfacesUntessellated) {
      if (surface.surfaceType == Surface.patch) {
        int width = surface.patch_size[0];
        int height = surface.patch_size[1];
        int c = width * height;
        assert ( c <= 1024 );
        List<Vector> points = new List<Vector>.generate(c, (idx)=>new Vector.fromList(myBSP.drawVerts[surface.firstVert+idx].xyz));
        Patch patch = new Patch(myBSP.shaders[surface.shaderNum]);
        patch.pc = generatePatchCollide( width, height, points );
        patches.add(patch);
      }
    }
    
  }
  
  PatchCollide generatePatchCollide( int width, int height, List<Vector> points) {
    assert( width > 2 && height > 2);
    assert( ((width&1)==1) && ((height & 1)==1) );
    assert ( width <= 129 && height <= 129 );
    
    Grid grid = new Grid();
    grid.width = width;
    grid.height = height;
    grid.wrapWidth = false;
    grid.wrapHeight = false;
    for ( int i = 0 ; i < width ; i++ ) {
      for ( int j = 0 ; j < height ; j++ ) {
        grid.points[j*width + i] = new Vector.fromVector( points[j*width + i]);
      }
    }
    
    // subdivide the grid
    setGridWrapWidth( grid);

    PatchCollide pc = new PatchCollide();
    return pc;
  }
  
  void setGridWrapWidth(Grid grid) {
    // TODO: next
  }
  
  
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
      Leaf leaf = myBSP.leafs[-(nodeIdx + 1)];
      for( int i = 0; i < leaf.numLeafBrushes; i++) {
        Brush brush = myBSP.brushes[myBSP.leafBrushes[leaf.firstLeafBrush + i]];
        Shader shader = myBSP.shaders[brush.shaderNum];
        if( brush.numSides > 0 && ((shader.contentFlags & 1) == 1)) {
          this.traceBrush( brush, start, end, radius, output);
        }
      }
      return;
    }
    
    // Tree node
    BSPNode node = myBSP.nodes[nodeIdx];
    Plane plane = myBSP.planes[node.planeNum];
    
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
        Brushside brushSide = myBSP.brushSides[brush.firstSide + i];
        Plane plane = myBSP.planes[brushSide.planeNum];
        
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
