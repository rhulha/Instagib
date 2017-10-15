part of instagib;

double q3bsptree_trace_offset = 0.03125;


class Output {
  bool allSolid = false;
  bool startSolid = false;
  double fraction = 1.0;
  Vector endPos = new Vector();
  Plane plane;
  int surfaceFlags; // surface hit
  int contents; // contents on other side of surface hit
  int entityNum;  // entity the contacted sirface is a part of
}

class BSPTree {
  MyBSP myBSP;

  BSPTree( this.myBSP) {
    for (Surface surface in myBSP.surfacesUntessellated) {
      if (surface.surfaceType != Surface.patch) {
        continue;
      }
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
  
  
  Output trace( Vector start, Vector end, double radius) {
    Output output = new Output(); // TODO: use tmp
    output.endPos.set( end);
    
    traceThroughTree( 0, 0.0, 1.0, start, end, radius, output);
    
    if( output.fraction != 1.0) { // collided with something
        for( int i = 0; i < 3; i++) {
            output.endPos[i] = start[i] + output.fraction * (end[i] - start[i]);
        }
    }
    
    return output;
  }
  
  void traceThroughLeaf(int nodeIdx, Vector start, Vector end, double radius, Output output) {
    Leaf leaf = myBSP.leafs[-(nodeIdx + 1)];
    for( int i = 0; i < leaf.numLeafBrushes; i++) {
      Brush brush = myBSP.brushes[myBSP.leafBrushes[leaf.firstLeafBrush + i]];
      Shader shader = myBSP.shaders[brush.shaderNum];
      if( brush.numSides > 0 && ((shader.contentFlags & 1) == 1)) {
        this.traceThroughBrush( brush, start, end, radius, output);
      }
    }
    
    for ( int k = 0 ; k < leaf.numLeafSurfaces; k++ ) {
      Patch patch = patches[ myBSP.leafSurfaces[ leaf.firstLeafSurface + k ] ];
      if ( patch == null) {
        continue;
      }
      //if ( patch.checkcount == cm.checkcount ) {
      //  continue; // already checked this patch in another leaf      }
      //patch->checkcount = cm.checkcount;

      //if ( !(patch->contents & tw->contents) ) {
        //continue;      }
      
      traceThroughPatch( output, patch );
      //if ( !tw->trace.fraction ) {
        //return;      }
    }

  }
  
  void traceThroughPatch(Output output, Patch patch) {
    //c_patch_traces++;

    double oldFrac = output.fraction;

    traceThroughPatchCollide( output, patch.pc );

    if ( output.fraction < oldFrac ) {
      output.surfaceFlags = patch.surfaceFlags;
      output.contents = patch.contents;
    }

  }
  
  void traceThroughPatchCollide(Output output, PatchCollide pc) {
    int j, hit, hitnum;
    double offset, enterFrac, leaveFrac, t;
    PatchPlane planes;
    Facet facet;
    List<double> plane, bestplane; // [4]
    Vector startp = new Vector(), endp = new Vector();

    //if (tw->isPoint) {
      //CM_TracePointThroughPatchCollide( tw, pc );
      //return;    }

    
    for( int i=0 ; i < pc.numFacets; i++ ) {
      facet = pc.facets[i];
      enterFrac = -1.0;
      leaveFrac = 1.0;
      hitnum = -1;
      //
      planes = pc.planes[ facet.surfacePlane ];
      VectorCopy(planes.plane, plane);
      plane[3] = planes->plane[3];
      if ( tw->sphere.use ) {
        // adjust the plane distance apropriately for radius
        plane[3] += tw->sphere.radius;

        // find the closest point on the capsule to the plane
        t = DotProduct( plane, tw->sphere.offset );
        if ( t > 0.0f ) {
          VectorSubtract( tw->start, tw->sphere.offset, startp );
          VectorSubtract( tw->end, tw->sphere.offset, endp );
        }
        else {
          VectorAdd( tw->start, tw->sphere.offset, startp );
          VectorAdd( tw->end, tw->sphere.offset, endp );
        }
      }
      else {
        offset = DotProduct( tw->offsets[ planes->signbits ], plane);
        plane[3] -= offset;
        VectorCopy( tw->start, startp );
        VectorCopy( tw->end, endp );
      }

      if (!CM_CheckFacetPlane(plane, startp, endp, &enterFrac, &leaveFrac, &hit)) {
        continue;
      }
      if (hit) {
        Vector4Copy(plane, bestplane);
      }

      for ( j = 0; j < facet->numBorders; j++ ) {
        planes = &pc->planes[ facet->borderPlanes[j] ];
        if (facet->borderInward[j]) {
          VectorNegate(planes->plane, plane);
          plane[3] = -planes->plane[3];
        }
        else {
          VectorCopy(planes->plane, plane);
          plane[3] = planes->plane[3];
        }
        if ( tw->sphere.use ) {
          // adjust the plane distance apropriately for radius
          plane[3] += tw->sphere.radius;

          // find the closest point on the capsule to the plane
          t = DotProduct( plane, tw->sphere.offset );
          if ( t > 0.0f ) {
            VectorSubtract( tw->start, tw->sphere.offset, startp );
            VectorSubtract( tw->end, tw->sphere.offset, endp );
          }
          else {
            VectorAdd( tw->start, tw->sphere.offset, startp );
            VectorAdd( tw->end, tw->sphere.offset, endp );
          }
        }
        else {
          // NOTE: this works even though the plane might be flipped because the bbox is centered
          offset = DotProduct( tw->offsets[ planes->signbits ], plane);
          plane[3] += fabs(offset);
          VectorCopy( tw->start, startp );
          VectorCopy( tw->end, endp );
        }

        if (!CM_CheckFacetPlane(plane, startp, endp, &enterFrac, &leaveFrac, &hit)) {
          break;
        }
        if (hit) {
          hitnum = j;
          Vector4Copy(plane, bestplane);
        }
      }
      if (j < facet->numBorders) continue;
      //never clip against the back side
      if (hitnum == facet->numBorders - 1) continue;

      if (enterFrac < leaveFrac && enterFrac >= 0) {
        if (enterFrac < tw->trace.fraction) {
          if (enterFrac < 0) {
            enterFrac = 0;
          }

          tw->trace.fraction = enterFrac;
          VectorCopy( bestplane, tw->trace.plane.normal );
          tw->trace.plane.dist = bestplane[3];
        }
      }
    }

  }

  void traceThroughTree( int nodeIdx, double startFraction, double endFraction, Vector start, Vector end, double radius, Output output) {
    if( nodeIdx < 0) { // Leaf node?
      traceThroughLeaf(nodeIdx, start, end, radius, output);
      return;
    }
    
    // Tree node
    BSPNode node = myBSP.nodes[nodeIdx];
    Plane plane = myBSP.planes[node.planeNum];
    
    double startDist = plane.normal.dot(start) - plane.dist;
    double endDist = plane.normal.dot(end) - plane.dist;
    
    if (startDist >= radius && endDist >= radius) {
      this.traceThroughTree(node.children[0], startFraction, endFraction, start, end, radius, output );
    } else if (startDist < -radius && endDist < -radius) {
      this.traceThroughTree(node.children[1], startFraction, endFraction, start, end, radius, output );
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
      
      this.traceThroughTree(node.children[side], startFraction, middleFraction, start, middle, radius, output );
      
      middleFraction = startFraction + (endFraction - startFraction) * fraction2;
      
      for (int i = 0; i < 3; i++) {
        middle[i] = start[i] + fraction2 * (end[i] - start[i]);
      }
      
      this.traceThroughTree(node.children[side==0?1:0], middleFraction, endFraction, middle, end, radius, output );
    }
  }

  void traceThroughBrush( Brush brush, Vector start, Vector end, double radius, Output output) {
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
