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
  
  int totalPatchBlocks=0;
  int numPlanes;
  List<PatchPlane> planes = new List<PatchPlane>(2048);
  int numFacets;
  List<Facet> facets = new List<Facet>(2048);
  
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
        grid.points[i][j].set( points[j*width + i]);
      }
    }
    
    // subdivide the grid
    setGridWrapWidth( grid);
    subdivideGridColumns( grid);
    removeDegenerateColumns( grid);
    
    transposeGrid( grid );

    setGridWrapWidth( grid);
    subdivideGridColumns( grid);
    removeDegenerateColumns( grid);

    // we now have a grid of points exactly on the curve
    // the aproximate surface defined by these points will be
    // collided against
    PatchCollide pc = new PatchCollide();
        
    clearBounds( pc.bounds[0], pc.bounds[1] );
    for ( int i=0; i < grid.width; i++ ) {
      for ( int j=0; j < grid.height; j++ ) {
        addPointToBounds( grid.points[i][j], pc.bounds[0], pc.bounds[1] );
      }
    }

    totalPatchBlocks += ( grid.width - 1 ) * ( grid.height - 1 );

    // generate a bsp tree for the surface
    patchCollideFromGrid( grid, pc );

    // expand by one unit for epsilon purposes
    pc.bounds[0][0] -= 1;
    pc.bounds[0][1] -= 1;
    pc.bounds[0][2] -= 1;

    pc.bounds[1][0] += 1;
    pc.bounds[1][1] += 1;
    pc.bounds[1][2] += 1;

    return pc;
  }
  
  void patchCollideFromGrid(Grid grid, PatchCollide pc) {
    int i, j;
    Vector p1, p2, p3;
    List<List<List<int>>> gridPlanes = new List<List<List<int>>>.generate(129, (idx)=> new List<List<int>>.generate(129, (idx)=>new List<int>())); //[MAX_GRID_SIZE][MAX_GRID_SIZE][2];
    
    Facet facet;
    List<int> borders  = new List<int>(4);
    List<int> noAdjust = new List<int>(4);

    numPlanes = 0;
    numFacets = 0;

    // find the planes for each triangle of the grid
    for ( i = 0 ; i < grid.width - 1 ; i++ ) {
      for ( j = 0 ; j < grid.height - 1 ; j++ ) {
        p1 = grid.points[i][j];
        p2 = grid.points[i+1][j];
        p3 = grid.points[i+1][j+1];
        gridPlanes[i][j][0] = findPlane( p1, p2, p3 );

        p1 = grid.points[i+1][j+1];
        p2 = grid.points[i][j+1];
        p3 = grid.points[i][j];
        gridPlanes[i][j][1] = findPlane( p1, p2, p3 );
      }
    }

    // create the borders for each facet
    for ( i = 0 ; i < grid.width - 1 ; i++ ) {
      for ( j = 0 ; j < grid.height - 1 ; j++ ) {
         
        borders[EN_TOP] = -1;
        if ( j > 0 ) {
          borders[EN_TOP] = gridPlanes[i][j-1][1];
        } else if ( grid.wrapHeight ) {
          borders[EN_TOP] = gridPlanes[i][grid.height-2][1];
        } 
        noAdjust[EN_TOP] = ( borders[EN_TOP] == gridPlanes[i][j][0] );
        if ( borders[EN_TOP] == -1 || noAdjust[EN_TOP] ) {
          borders[EN_TOP] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 0 );
        }

        borders[EN_BOTTOM] = -1;
        if ( j < grid.height - 2 ) {
          borders[EN_BOTTOM] = gridPlanes[i][j+1][0];
        } else if ( grid.wrapHeight ) {
          borders[EN_BOTTOM] = gridPlanes[i][0][0];
        }
        noAdjust[EN_BOTTOM] = ( borders[EN_BOTTOM] == gridPlanes[i][j][1] );
        if ( borders[EN_BOTTOM] == -1 || noAdjust[EN_BOTTOM] ) {
          borders[EN_BOTTOM] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 2 );
        }

        borders[EN_LEFT] = -1;
        if ( i > 0 ) {
          borders[EN_LEFT] = gridPlanes[i-1][j][0];
        } else if ( grid.wrapWidth ) {
          borders[EN_LEFT] = gridPlanes[grid.width-2][j][0];
        }
        noAdjust[EN_LEFT] = ( borders[EN_LEFT] == gridPlanes[i][j][1] );
        if ( borders[EN_LEFT] == -1 || noAdjust[EN_LEFT] ) {
          borders[EN_LEFT] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 3 );
        }

        borders[EN_RIGHT] = -1;
        if ( i < grid.width - 2 ) {
          borders[EN_RIGHT] = gridPlanes[i+1][j][1];
        } else if ( grid.wrapWidth ) {
          borders[EN_RIGHT] = gridPlanes[0][j][1];
        }
        noAdjust[EN_RIGHT] = ( borders[EN_RIGHT] == gridPlanes[i][j][0] );
        if ( borders[EN_RIGHT] == -1 || noAdjust[EN_RIGHT] ) {
          borders[EN_RIGHT] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 1 );
        }

        if ( numFacets == MAX_FACETS ) {
          Com_Error( ERR_DROP, "MAX_FACETS" );
        }
        facet = &facets[numFacets];
        Com_Memset( facet, 0, sizeof( *facet ) );

        if ( gridPlanes[i][j][0] == gridPlanes[i][j][1] ) {
          if ( gridPlanes[i][j][0] == -1 ) {
            continue;   // degenrate
          }
          facet.surfacePlane = gridPlanes[i][j][0];
          facet.numBorders = 4;
          facet.borderPlanes[0] = borders[EN_TOP];
          facet.borderNoAdjust[0] = noAdjust[EN_TOP];
          facet.borderPlanes[1] = borders[EN_RIGHT];
          facet.borderNoAdjust[1] = noAdjust[EN_RIGHT];
          facet.borderPlanes[2] = borders[EN_BOTTOM];
          facet.borderNoAdjust[2] = noAdjust[EN_BOTTOM];
          facet.borderPlanes[3] = borders[EN_LEFT];
          facet.borderNoAdjust[3] = noAdjust[EN_LEFT];
          CM_SetBorderInward( facet, grid, gridPlanes, i, j, -1 );
          if ( CM_ValidateFacet( facet ) ) {
            CM_AddFacetBevels( facet );
            numFacets++;
          }
        } else {
          // two seperate triangles
          facet.surfacePlane = gridPlanes[i][j][0];
          facet.numBorders = 3;
          facet.borderPlanes[0] = borders[EN_TOP];
          facet.borderNoAdjust[0] = noAdjust[EN_TOP];
          facet.borderPlanes[1] = borders[EN_RIGHT];
          facet.borderNoAdjust[1] = noAdjust[EN_RIGHT];
          facet.borderPlanes[2] = gridPlanes[i][j][1];
          if ( facet.borderPlanes[2] == -1 ) {
            facet.borderPlanes[2] = borders[EN_BOTTOM];
            if ( facet.borderPlanes[2] == -1 ) {
              facet.borderPlanes[2] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 4 );
            }
          }
          CM_SetBorderInward( facet, grid, gridPlanes, i, j, 0 );
          if ( CM_ValidateFacet( facet ) ) {
            CM_AddFacetBevels( facet );
            numFacets++;
          }

          if ( numFacets == MAX_FACETS ) {
            Com_Error( ERR_DROP, "MAX_FACETS" );
          }
          facet = &facets[numFacets];
          Com_Memset( facet, 0, sizeof( *facet ) );

          facet.surfacePlane = gridPlanes[i][j][1];
          facet.numBorders = 3;
          facet.borderPlanes[0] = borders[EN_BOTTOM];
          facet.borderNoAdjust[0] = noAdjust[EN_BOTTOM];
          facet.borderPlanes[1] = borders[EN_LEFT];
          facet.borderNoAdjust[1] = noAdjust[EN_LEFT];
          facet.borderPlanes[2] = gridPlanes[i][j][0];
          if ( facet.borderPlanes[2] == -1 ) {
            facet.borderPlanes[2] = borders[EN_TOP];
            if ( facet.borderPlanes[2] == -1 ) {
              facet.borderPlanes[2] = CM_EdgePlaneNum( grid, gridPlanes, i, j, 5 );
            }
          }
          CM_SetBorderInward( facet, grid, gridPlanes, i, j, 1 );
          if ( CM_ValidateFacet( facet ) ) {
            CM_AddFacetBevels( facet );
            numFacets++;
          }
        }
      }
    }

    // copy the results out
    pf.numPlanes = numPlanes;
    pf.numFacets = numFacets;
    pf.facets = Hunk_Alloc( numFacets * sizeof( *pf.facets ), h_high );
    Com_Memcpy( pf.facets, facets, numFacets * sizeof( *pf.facets ) );
    pf.planes = Hunk_Alloc( numPlanes * sizeof( *pf.planes ), h_high );
    Com_Memcpy( pf.planes, planes, numPlanes * sizeof( *pf.planes ) );
  }
  
  double DotProduct( List<double> a, List<double> b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  void VectorCopy( List<double> a, List<double> b) {
    for(int i=0; i<b.length; i++) {
      b[i] = a[i];
    }
  }
  
  int findPlane(Vector p1, Vector p2, Vector p3) {
    List<double> plane=new List<double>(4);
    int i;
    double d;

    if ( !planeFromPoints( plane, p1, p2, p3 ) ) {
      return -1;
    }

    // see if the points are close enough to an existing plane
    for ( i = 0 ; i < numPlanes ; i++ ) {
      if ( DotProduct( plane, planes[i].plane ) < 0 ) {
        continue; // allow backwards planes?
      }

      d = DotProduct( p1.array, planes[i].plane ) - planes[i].plane[3];
      if ( d < -0.1 || d > 0.1 ) {
        continue;
      }

      d = DotProduct( p2.array, planes[i].plane ) - planes[i].plane[3];
      if ( d < -0.1 || d > 0.1 ) {
        continue;
      }

      d = DotProduct( p3.array, planes[i].plane ) - planes[i].plane[3];
      if ( d < -0.1 || d > 0.1 ) {
        continue;
      }

      // found it
      return i;
    }

    // add a new plane
    assert( numPlanes < 2048 );
    VectorCopy( plane, planes[numPlanes].plane );
    planes[numPlanes].signbits = signbitsForNormal( plane );
    numPlanes++;
    return numPlanes-1;
  }
  
  int signbitsForNormal(List<double> normal) {
    int bits = 0;
    for (int j=0 ; j<3 ; j++) {
      if ( normal[j] < 0 ) {
        bits |= 1<<j;
      }
    }
    return bits;
  }
  
  bool planeFromPoints(List<double> plane, Vector a, Vector b, Vector c) {
    Vector d1, d2;

    d1 = new Vector.fromVector(b).subtract(a);
    d2 = new Vector.fromVector(c).subtract(a);
    
    d2.cross(d1); // CrossProduct( d2, d1, plane );
    double len = d2.length();
    if ( len == 0 ) {
      return false;
    }

    d2.scale(1/len); // normalize
    plane[0] = d2[0];
    plane[1] = d2[1];
    plane[2] = d2[2];
    plane[3] = a.dot( d2 );
    return true;
  }
  
  addPointToBounds( Vector v, Vector mins, Vector maxs ) {
    if ( v[0] < mins[0] ) {
      mins[0] = v[0];
    }
    if ( v[0] > maxs[0]) {
      maxs[0] = v[0];
    }

    if ( v[1] < mins[1] ) {
      mins[1] = v[1];
    }
    if ( v[1] > maxs[1]) {
      maxs[1] = v[1];
    }

    if ( v[2] < mins[2] ) {
      mins[2] = v[2];
    }
    if ( v[2] > maxs[2]) {
      maxs[2] = v[2];
    }
  }
  
  clearBounds( Vector mins, Vector maxs ) {
    mins[0] = mins[1] = mins[2] = 99999.9;
    maxs[0] = maxs[1] = maxs[2] = -99999.9;
  }
  
  void transposeGrid(Grid grid) {
    int i, j, l;
    Vector temp = new Vector();
    bool tempWrap;

    if ( grid.width > grid.height ) {
      for ( i = 0 ; i < grid.height ; i++ ) {
        for ( j = i + 1 ; j < grid.width ; j++ ) {
          if ( j < grid.height ) {
            // swap the value
            temp.set( grid.points[i][j]);
            grid.points[i][j].set( grid.points[j][i]);
            grid.points[j][i].set( temp);
          } else {
            // just copy
            grid.points[i][j].set( grid.points[j][i]);
          }
        }
      }
    } else {
      for ( i = 0 ; i < grid.width ; i++ ) {
        for ( j = i + 1 ; j < grid.height ; j++ ) {
          if ( j < grid.width ) {
            // swap the value
            temp.set( grid.points[j][i]);
            grid.points[j][i].set( grid.points[i][j]);
            grid.points[i][j].set( temp);
          } else {
            // just copy
            grid.points[j][i].set( grid.points[i][j]);
          }
        }
      }
    }

    l = grid.width;
    grid.width = grid.height;
    grid.height = l;

    tempWrap = grid.wrapWidth;
    grid.wrapWidth = grid.wrapHeight;
    grid.wrapHeight = tempWrap;
  }

  bool comparePoints( Vector a, Vector b ) {
    double d = a[0] - b[0];
    if ( d < -0.1 || d > 0.1 ) {
      return false;
    }
    d = a[1] - b[1];
    if ( d < -0.1 || d > 0.1 ) {
      return false;
    }
    d = a[2] - b[2];
    if ( d < -0.1 || d > 0.1 ) {
      return false;
    }
    return true;
  }
  
  void removeDegenerateColumns(Grid grid) {
    int i, j, k;
    for ( i = 0 ; i < grid.width - 1 ; i++ ) {
      for ( j = 0 ; j < grid.height ; j++ ) {
        if ( !comparePoints( grid.points[i][j], grid.points[i+1][j] ) ) {
          break;
        }
      }

      if ( j != grid.height ) {
        continue; // not degenerate
      }

      for ( j = 0 ; j < grid.height ; j++ ) {
        // remove the column
        for ( k = i + 2 ; k < grid.width ; k++ ) {
          grid.points[k-1][j].set( grid.points[k][j]);
        }
      }
      grid.width--;

      // check against the next column
      i--;
    }
  }
  
  bool needsSubdivision( Vector a, Vector b, Vector c ) {
    Vector cmid = new Vector();
    Vector lmid = new Vector();
    Vector delta = new Vector();
    double dist=0.0;
    int i=0;

    for ( i = 0 ; i < 3 ; i++ ) {
      // calculate the linear midpoint
      lmid[i] = 0.5*(a[i] + c[i]);
      // calculate the exact curve midpoint
      cmid[i] = 0.5 * ( 0.5*(a[i] + b[i]) + 0.5*(b[i] + c[i]) );
    }

    // see if the curve is far enough away from the linear mid
    delta.set(cmid).subtract(lmid);
    dist = delta.length();
    
    return dist >= 16; // SUBDIVIDE_DISTANCE // 4 // never more than this units away from curve
  }

  
  void subdivideGridColumns(Grid grid) {
    int   i, j, k;

    for ( i=0; i<grid.width-2;  ) {
      // grid.points[i][x] is an interpolating control point
      // grid.points[i+1][x] is an aproximating control point
      // grid.points[i+2][x] is an interpolating control point

      //
      // first see if we can collapse the aproximating collumn away
      //
      for ( j=0; j<grid.height; j++ ) {
        if ( needsSubdivision( grid.points[i][j], grid.points[i+1][j], grid.points[i+2][j]  ) ) {
          break;
        }
      }
      if ( j==grid.height ) {
        // all of the points were close enough to the linear midpoints
        // that we can collapse the entire column away
        for ( j = 0 ; j < grid.height ; j++ ) {
          // remove the column
          for ( k = i + 2 ; k < grid.width ; k++ ) {
            grid.points[k-1][j].set(grid.points[k][j]);
          }
        }

        grid.width--;

        // go to the next curve segment
        i++;
        continue;
      }

      //
      // we need to subdivide the curve
      //
      for ( j = 0 ; j < grid.height ; j++ ) {
        Vector prev, mid, next;

        // save the control points now
        prev = new Vector.fromVector(grid.points[i+0][j]);
        mid  = new Vector.fromVector(grid.points[i+1][j]);
        next = new Vector.fromVector(grid.points[i+2][j]);

        // make room for two additional columns in the grid
        // columns i+1 will be replaced, column i+2 will become i+4
        // i+1, i+2, and i+3 will be generated
        for ( k = grid.width - 1 ; k > i + 1 ; k-- ) {
          grid.points[k+2][j].set( grid.points[k][j]);
        }

        // generate the subdivided points
        subdivide( prev, mid, next, grid.points[i+1][j], grid.points[i+2][j], grid.points[i+3][j] );
      }

      grid.width += 2;

      // the new aproximating point at i+1 may need to be removed
      // or subdivided farther, so don't advance i
    }
  }
  
  void subdivide( Vector a, Vector b, Vector c, Vector out1, Vector out2, Vector out3 ) {
    int i;

    for( i=0; i<3; i++ ) {
      out1[i] = 0.5 * (a[i] + b[i]);
      out3[i] = 0.5 * (b[i] + c[i]);
      out2[i] = 0.5 * (out1[i] + out3[i]);
    }
  }

  void setGridWrapWidth(Grid grid) {
    int h, j;
    double d;

    for(h=0; h<grid.height; h++) {
      for(j=0; j<3; j++) {
        //d = grid.points[h*grid.width][j] - grid.points[h*grid.width+grid.width-1][j];
        d = grid.points[0][h][j] - grid.points[grid.width-1][h][j];
        if ( d < -0.1 || d > 0.1 ) { // WRAP_POINT_EPSILON
          break;
        }
      }
      if ( j != 3 ) {
        break;
      }
    }
    grid.wrapWidth = h==grid.height;
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
