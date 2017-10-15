part of instagib;

final int LASER_LENGTH = 15;


class LaserBeam extends Node {
  num lifeTime=0;
  
  LaserBeam(Mesh child) : super( child);
  
  Vector boxCorner1 = new Vector();
  Vector boxCorner2 = new Vector();
  Vector lineStart = new Vector();
  Vector lineEnd = new Vector();
  Vector Hit = new Vector();

  void animate( num elapsed) {
    lifeTime -= elapsed;
    if( lifeTime < 0 )
    {
      this.enabled = false;
      return;
    }
    moveForward( (elapsed/2.0));
    
    lineStart.set( getPos() );
    lineEnd.set( getPos() );
    Vector back = getBack();
    back.scale( LASER_LENGTH);
    lineStart.add( back);
    lineEnd.subtract( back);

    bool found = false;
    num currentDistance=1000;
    Node currentBlock = null;

    List<Node> objects = chronosGL.programBasic.objects;
    for (int i = 0; i < objects.length; i++)
    {
      Node object = objects[i];
      if( "block" == object.type && object.enabled == true)
      {
        boxCorner1.set( object.getPos());
        boxCorner2.set( object.getPos());
        
        boxCorner1[0] -= 1.0;
        boxCorner1[1] -= 1.0;
        boxCorner1[2] -= 1.0;
        boxCorner2[0] += 1.0;
        boxCorner2[1] += 1.0;
        boxCorner2[2] += 1.0;
        int hitSide = checkLineBox( boxCorner1, boxCorner2, lineStart, lineEnd, Hit);
        if( hitSide > 0)
        {
          //print( hitSide + ' ' +  Hit);
          var d = lineStart.dist( Hit);
          if( d < currentDistance )
          {
            currentDistance = d;
            currentBlock = object;
          }
          found = true;
        }
      }
    }
    
    if(found)
    {
      currentBlock.enabled = false;
      //network.send("-block:"+currentBlock.matrix[Matrix4.POSX]+','+currentBlock.matrix[Matrix4.POSY]+','+currentBlock.matrix[Matrix4.POSZ]);
      this.lifeTime = 0;
    }
    
  }  
}

void addLaser( Spatial spatial, num moveLeft, num moveUp ) {
  
  LaserBeam laserBeam;
  bool found = false;
  List<Node> objects = chronosGL.programBasic.objects;

  // TODO: optimize, group laser beams into a separate node or so.
  for (var i = 0; i < objects.length; i++)
  {
    if( "laser" == objects[i].type && objects[i].enabled == false)
    {
      laserBeam = objects[i] as LaserBeam;
      found = true;
      break;
    }
  }

  if( found == true)
  {
    //console.log("laser found in cache");
    laserBeam.enabled=true;
    laserBeam.transform.identity();
  } else {
    //console.log("laser cache miss");
    Mesh laserMesh = new Mesh( createCylinderInternal( 0.1, LASER_LENGTH*2.0, 20), texture: textureCache.get("red"));
    laserMesh.transform.rotate(0.5*Math.PI, laserMesh.getRight()); // point the cylinder forward
    laserBeam = new LaserBeam( laserMesh);
    laserBeam.type = "laser";
    laserBeam.invert = true;
  }

  laserBeam.lifeTime = 10 * 1000; // 10 secs

  laserBeam.transform.setElements(spatial.transform);
  laserBeam.moveLeft( moveLeft);
  laserBeam.moveUp( moveUp);

  if( spatial is Camera)
  {
    // shoot the laser to where the mouse is pointing (like FreeLancer)
    laserBeam.lookUp(mouseY*0.0012);
    laserBeam.lookLeft(-mouseX*0.0009);
  } else {
    // make the laser lookAt the player ship !
    laserBeam.moveForward( 1);
    laserBeam.lookAt( camera.getPos(), spatial.getUp());
  }

  if( found != true)
    chronosGL.programBasic.add(laserBeam);
  
}
