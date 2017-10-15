part of instagib;

double q3bsptree_trace_offset = 0.03125; // TODO: remove
final Vector ORIGIN = new Vector(0.0,0.0,0.0);

class Trace {
  bool allSolid = false;
  bool startSolid = false;
  double fraction = 1.0;
  Vector endPos = new Vector();
  Plane plane;
  int surfaceFlags; // surface hit
  int contents; // contents on other side of surface hit
  int entityNum; // entity the contacted sirface is a part of

  void reset() {
    allSolid = false;
    startSolid = false;
    fraction = 1.0;
    endPos.scale(0);
    plane = null;
    surfaceFlags = 0;
    contents = 0;
    entityNum = 0;
  }
}

class TraceWork {
  Vector start = new Vector();
  Vector end = new Vector();
  // size of the box being swept through the model
  List<Vector> size = vectorList(2);
  // [signbits][x] = either size[0][x] or size[1][x]
  List<Vector> offsets = vectorList(8);
  double maxOffset; // longest corner length from origin
  Vector extents = new Vector(); // greatest of abs(size[0]) and abs(size[1])
  List<Vector> bounds = vectorList(2); // enclosing box of start and end surrounding by size
  Vector modelOrigin = new Vector();// origin of the model tracing through
  int contents; // ored contents of the model tracing through
  bool isPoint; // optimized case
  Trace trace = new Trace(); // returned from trace call
  //Sphere sphere;   // sphere for oriendted capsule collision

  void reset() {
    start.scale(0);
    end.scale(0);
    size.forEach((v) => v.scale(0));
    offsets.forEach((v) => v.scale(0));
    maxOffset = 0.0;
    extents.scale(0);
    bounds.forEach((v) => v.scale(0));
    modelOrigin.scale(0);
    contents = 0;
    isPoint = false;
    trace.reset();
  }
}
class WrapHit {
  int hit;
  double enterFrac;
  double leaveFrac;
}

class BSPTree {
  ClipMap cm;

  BSPTree(this.cm) {
    for (Surface surface in cm.surfacesUntessellated) {
      if (surface.surfaceType != Surface.patch) {
        continue;
      }
      int width = surface.patch_size[0];
      int height = surface.patch_size[1];
      int c = width * height;
      assert(c <= 1024);
      List<Vector> points = new List<Vector>.generate(c, (idx) => new Vector.fromList(cm.drawVerts[surface.firstVert + idx].xyz));
      Patch patch = new Patch(cm.shaders[surface.shaderNum]);
      patch.pc = generatePatchCollide(width, height, points);
      patches.add(patch);
    }
  }

  TraceWork tw = new TraceWork();
  
  Trace trace(Vector start, Vector end, {Vector mins, Vector maxs, int modelClipHandle:0, Vector origin, int brushmask:0, int capsule:0} /*, Sphere sphere*/) {
    if(mins==null) {
      mins = ORIGIN;
    }
    if(maxs==null) {
      maxs = ORIGIN;
    }
    if(origin==null) {
      origin = ORIGIN;
    }
    
    tw.reset();

    tw.trace.endPos.set(end);

    traceThroughTree(tw, 0, 0.0, 1.0, start, end);

    if (tw.trace.fraction != 1.0) { // collided with something
      for (int i = 0; i < 3; i++) {
        tw.trace.endPos[i] = start[i] + tw.trace.fraction * (end[i] - start[i]);
      }
    }

    return tw.trace;
  }

  void traceThroughLeaf(TraceWork tw, Leaf leaf) {
    for (int i = 0; i < leaf.numLeafBrushes; i++) {
      Brush brush = cm.brushes[cm.leafBrushes[leaf.firstLeafBrush + i]];
      Shader shader = cm.shaders[brush.shaderNum];
      if (brush.numSides > 0 && ((shader.contentFlags & 1) == 1)) {
        this.traceThroughBrush(tw, brush);
      }
    }

    for (int k = 0; k < leaf.numLeafSurfaces; k++) {
      Patch patch = patches[cm.leafSurfaces[leaf.firstLeafSurface + k]];
      if (patch == null) {
        continue;
      }
      //if ( patch.checkcount == cm.checkcount ) {
      //  continue; // already checked this patch in another leaf      }
      //patch->checkcount = cm.checkcount;

      //if ( !(patch->contents & tw->contents) ) {
      //continue;      }

      traceThroughPatch(tw, patch);
      //if ( !tw->trace.fraction ) {
      //return;      }
    }

  }

  void traceThroughPatch(TraceWork tw, Patch patch) {
    //c_patch_traces++;

    double oldFrac = tw.trace.fraction;

    traceThroughPatchCollide(tw, patch.pc);

    if (tw.trace.fraction < oldFrac) {
      tw.trace.surfaceFlags = patch.surfaceFlags;
      tw.trace.contents = patch.contents;
    }

  }

  List<double> plane = new List<double>(4);
  List<double> bestplane = new List<double>(4);
  Vector startp = new Vector();
  Vector endp = new Vector();
  WrapHit wrapHit = new WrapHit();
  void traceThroughPatchCollide(TraceWork tw, PatchCollide pc) {
    int j, hitnum;
    double offset;
    PatchPlane planes;
    Facet facet;

    //if (tw->isPoint) {
    //CM_TracePointThroughPatchCollide( tw, pc );
    //return;    }


    for (int i = 0; i < pc.numFacets; i++) {
      facet = pc.facets[i];
      wrapHit.enterFrac = -1.0;
      wrapHit.leaveFrac = 1.0;
      hitnum = -1;

      planes = pc.planes[facet.surfacePlane];
      VectorCopy(planes.plane, plane);
      /*
      if ( tw.sphere.use ) {
        // adjust the plane distance apropriately for radius
        plane[3] += tw->sphere.radius;

        // find the closest point on the capsule to the plane
        double t = DotProduct( plane, tw->sphere.offset );
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
      */

      offset = DotProduct(tw.offsets[planes.signbits].array, plane);
      plane[3] -= offset;
      startp.set(tw.start);
      endp.set(tw.end);
      /*
       * }
       */

      if (!checkFacetPlane(plane, startp, endp, wrapHit)) {
        continue;
      }
      if (wrapHit.hit != 0) {
        bestplane.setAll(0, plane); //VectorCopy(plane, bestplane);
      }

      for (j = 0; j < facet.numBorders; j++) {
        planes = pc.planes[facet.borderPlanes[j]];

        if (facet.borderInward[j]) {
          plane[0] = -planes.plane[0];
          plane[1] = -planes.plane[1];
          plane[2] = -planes.plane[2];
          plane[3] = -planes.plane[3];
        } else {
          VectorCopy(planes.plane, plane);
        }
        /* // TODO: Sphere
        if ( tw->sphere.use ) {
          // adjust the plane distance apropriately for radius
          plane[3] += tw->sphere.radius;

          // find the closest point on the capsule to the plane
          double t = DotProduct( plane, tw->sphere.offset );
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
         */
        // NOTE: this works even though the plane might be flipped because the bbox is centered
        offset = DotProduct(tw.offsets[planes.signbits].array, plane);
        plane[3] += offset.abs();
        startp.set(tw.start);
        endp.set(tw.end);
        /* } */

        if (!checkFacetPlane(plane, startp, endp, wrapHit)) {
          break;
        }
        if (wrapHit.hit != 0) {
          hitnum = j;
          VectorCopy(plane, bestplane);
        }
      }
      if (j < facet.numBorders) continue;
      //never clip against the back side
      if (hitnum == facet.numBorders - 1) continue;

      if (wrapHit.enterFrac < wrapHit.leaveFrac && wrapHit.enterFrac >= 0) {
        if (wrapHit.enterFrac < tw.trace.fraction) {
          if (wrapHit.enterFrac < 0) {
            wrapHit.enterFrac = 0.0;
          }

          tw.trace.fraction = wrapHit.enterFrac;
          VectorCopy(bestplane, tw.trace.plane.normal.array);
          tw.trace.plane.dist = bestplane[3];
        }
      }
    }

  }

  bool checkFacetPlane(List<double> plane, Vector start, Vector end, WrapHit wrapHit) {
    double d1, d2, f;

    wrapHit.hit = 0;

    d1 = DotProduct(start.array, plane) - plane[3];
    d2 = DotProduct(end.array, plane) - plane[3];

    // if completely in front of face, no intersection with the entire facet
    if (d1 > 0 && (d2 >= SURFACE_CLIP_EPSILON || d2 >= d1)) {
      return false;
    }

    // if it doesn't cross the plane, the plane isn't relevent
    if (d1 <= 0 && d2 <= 0) {
      return true;
    }

    // crosses face
    if (d1 > d2) { // enter
      f = (d1 - SURFACE_CLIP_EPSILON) / (d1 - d2);
      if (f < 0) {
        f = 0.0;
      }
      //always favor previous plane hits and thus also the surface plane hit
      if (f > wrapHit.enterFrac) {
        wrapHit.enterFrac = f;
        wrapHit.hit = 1;
      }
    } else { // leave
      f = (d1 + SURFACE_CLIP_EPSILON) / (d1 - d2);
      if (f > 1) {
        f = 1.0;
      }
      if (f < wrapHit.leaveFrac) {
        wrapHit.leaveFrac = f;
      }
    }
    return true;
  }

  /*
  ==================
  CM_TraceThroughTree

  Traverse all the contacted leafs from the start to the end position.
  If the trace is a point, they will be exactly in order, but for larger
  trace volumes it is possible to hit something in a later leaf with
  a smaller intercept fraction.
  ==================
  */
  void traceThroughTree(TraceWork tw, int num, double p1f, double p2f, Vector p1, Vector p2) {
    double t1, t2, offset;
    double frac, frac2, idist;
    Vector mid = new Vector();
    int side;
    double midf;

    if (tw.trace.fraction <= p1f) {
      return; // already hit something nearer
    }
    
    // if < 0, we are in a leaf node
    if (num < 0) {
      traceThroughLeaf(tw, cm.leafs[-1-num]);
      return;
    }

    // find the point distances to the seperating plane
    // and the offset for the size of the box

    BSPNode node = cm.nodes[num];
    Plane plane = cm.planes[node.planeNum];
  
    // adjust the plane distance apropriately for mins/maxs
    if ( plane.type < 3 ) {
      t1 = p1[plane.type] - plane.dist;
      t2 = p2[plane.type] - plane.dist;
      offset = tw.extents[plane.type]; // TODO: make sure extents is correctly filled
    } else {
      t1 = plane.normal.dot(p1) - plane.dist;
      t2 = plane.normal.dot(p2) - plane.dist;
      if(tw.isPoint) {
        offset=0.0;
      } else {
        offset=2048.0; // this is silly
      }
    }
  
    if (t1 >= offset + 1 && t2 >= offset + 1) {
      traceThroughTree(tw, node.children[0], p1f, p2f, p1, p2);
      return;
    } else if (t1 < -offset-1 && t2 < -offset-1) {
      traceThroughTree(tw, node.children[1], p1f, p2f, p1, p2);
      return;
    }
    
    // put the crosspoint SURFACE_CLIP_EPSILON pixels on the near side
    if (t1 < t2) {
      idist = 1.0/(t1-t2);
      side = 1; // back
      frac2 = (t1 + offset + SURFACE_CLIP_EPSILON) * idist;
      frac = (t1 - offset + SURFACE_CLIP_EPSILON) * idist;
    } else if (t1 > t2) {
      idist = 1.0/(t1-t2);
      side = 0; // front
      frac2 = (t1 - offset - SURFACE_CLIP_EPSILON) * idist;
      frac = (t1 + offset + SURFACE_CLIP_EPSILON) * idist;
    } else {
      side = 0; // front
      frac = 1.0;
      frac2 = 0.0;
    }

    // move up to the node
    if (frac < 0)
      frac = 0.0;
    else if (frac > 1)
      frac = 1.0;
    
    midf = p1f + (p2f - p1f)*frac;

    for (int i = 0; i < 3; i++) {
      mid[i] = p1[i] + frac * (p2[i] - p1[i]);
    }

    traceThroughTree(tw, node.children[side], p1f, midf, p1, mid);

    if (frac2 < 0)
      frac2 = 0.0;
    else if (frac2 > 1)
      frac2 = 1.0;

    midf = p1f + (p2f - p1f)*frac2;

    for (int i = 0; i < 3; i++) {
      mid[i] = p1[i] + frac2 * (p2[i] - p1[i]);
    }

    traceThroughTree(tw, node.children[side == 0 ? 1 : 0], midf, p2f, mid, p2);
  }

  void traceThroughBrush(TraceWork tw, Brush brush) {
    Plane clipplane = null;
    double dist;
    double enterFrac = -1.0;
    double leaveFrac = 1.0;
    bool startout = false;
    bool getout = false;
    double f;
    
    Brushside leadside;

    // TODO: if( tw.sphere.use)
    
    for (int i = 0; i < brush.numSides; i++) {
      Brushside side = cm.brushSides[brush.firstSide + i];
      Plane plane = cm.planes[side.planeNum];

      // adjust the plane distance apropriately for mins/maxs
      dist = plane.dist - tw.offsets[plane.signbits].dot(plane.normal);

      double d1 = tw.start.dot(plane.normal) - dist;
      double d2 = tw.end.dot(plane.normal) - dist;

      if (d2 > 0) getout = true; // endpoint is not in solid
      if (d1 > 0) startout = true;

      // if completely in front of face, no intersection with the entire brush
      if (d1 > 0 && ( d2 >= SURFACE_CLIP_EPSILON || d2 >= d1 ) ) {
        return;
      }

      // if it doesn't cross the plane, the plane isn't relevent
      if (d1 <= 0 && d2 <= 0) {
        continue;
      }

      // crosses face
      if (d1 > d2) { // line is entering into the brush
        double f = (d1-SURFACE_CLIP_EPSILON) / (d1-d2);
        if( f < 0)
          f=0.0;
        if (f > enterFrac) {
          enterFrac = f;
          clipplane = plane;
          leadside = side;
        }
      } else { // line is leaving the brush
        f = (d1+SURFACE_CLIP_EPSILON) / (d1-d2);
        if( f > 1)
          f=1.0;
        if (f < leaveFrac)
          leaveFrac = f;
      }
    }

    // all planes have been checked, and the trace was not
    // completely outside the brush
    
    if (!startout) { // original point was inside brush
      tw.trace.startSolid = true;
      if (!getout) {
        tw.trace.allSolid = true;
        tw.trace.fraction = 0.0;
        tw.trace.contents = cm.shaders[brush.shaderNum].contentFlags;
      }
      return;
    }

    if (enterFrac < leaveFrac) {
      if (enterFrac > -1 && enterFrac < tw.trace.fraction) {
        if (enterFrac < 0.0)
          enterFrac = 0.0;
        tw.trace.fraction = enterFrac;
        tw.trace.plane = clipplane;
        tw.trace.surfaceFlags = cm.shaders[leadside.shaderNum].surfaceFlags;
        tw.trace.contents = cm.shaders[brush.shaderNum].contentFlags;
      }
    }

   
  }
}
