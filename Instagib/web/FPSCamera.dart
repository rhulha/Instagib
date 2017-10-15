part of instagib;

class FPSCamera extends Animatable
{
  Camera camera;
  Vector momentum = new Vector();
  Vector movement = new Vector();
  Vector tmp = new Vector();

  Vector traceStart = new Vector();
  Vector traceEnd = new Vector();
  
  BSPTree bsp;
  
  Vector up = new Vector(0.0,0.0,1.0);
  
  int movementX=0;
  int movementY=0;
  
  FPSCamera( this.camera) {

    HTML.document.onMouseDown.listen( (HTML.MouseEvent e) {
      e.preventDefault();
      HTML.document.body.requestPointerLock();
    });
    
    HTML.document.body.onMouseMove.listen( (HTML.MouseEvent e) {
      e.preventDefault();
      movementX += e.movement.x;
      movementY += e.movement.y;
    });

  }
  
  void setBSPTree( BSPTree bsp) {
    this.bsp = bsp;
  }
  
  void animate( double elapsed)
  {
    Map<int, bool> cpk = currentlyPressedKeys;
    Map<String, bool> cpmb = currentlyPressedMouseButtons;
    
    movement.scale(0);
    
    if (cpk[Key.W] != null) {
      movement.subtract( camera.getBack() );
    }
    if (cpk[Key.A] != null) {
      movement.subtract( camera.getRight() );
    }
    if (cpk[Key.S] != null) {
      movement.add( camera.getBack() );
    }
    if (cpk[Key.D] != null) {
      movement.add( camera.getRight() );
    }
    
    movement.z = 0.0;
    movement.normalize();
    momentum.add(movement);
    tmp.set(momentum);
    tmp.scale(0.02);
    
    traceStart.set(camera.getPos());
    traceEnd.set(camera.getPos());
    traceEnd.add(tmp);
    
    traceStart.scale(100); // we draw the map 100 times smaller
    traceEnd.scale(100);
    
    Output output = bsp.trace( traceStart, traceEnd, 10.0);
    print( output.fraction);
    if( output.fraction == 1.0 || output.startSolid || output.allSolid )
        camera.translateFromVec(tmp);
    momentum.scale( 0.85);
    
    if( cpk[Key.SPACE] != null) {
    }
    
    if( movementY!=0)
      camera.matrix.rotate( movementY*0.006, camera.getRight());
    if( movementX!=0)
      camera.matrix.rotate( movementX*0.006, up);
    
    movementX=0;
    movementY=0;
  }
  
}
