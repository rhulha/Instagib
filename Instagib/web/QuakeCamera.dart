part of instagib;


double q3movement_stopspeed = 100.0;
double q3movement_duckScale = 0.25;
double q3movement_jumpvelocity = 50.0;

double q3movement_accelerate = 10.0;
double q3movement_airaccelerate = 0.1;
double q3movement_flyaccelerate = 8.0;

double q3movement_friction = 6.0;
double q3movement_flightfriction = 3.0;

double q3movement_frameTime = 0.30;
double q3movement_overclip = 0.501;
double STEPSIZE = 18.0;

double q3movement_gravity = 20.0;

double q3movement_playerRadius = 10.0;
double q3movement_scale = 50.0;



class QuakeCamera extends Animatable
{
  Camera camera;

  Vector dir = new Vector();
  
  Vector velocity = new Vector();
  Vector position = new Vector();
  bool onGround = false;
  
  Trace groundTrace = new Trace();
  Trace smTrace = new Trace(); // slideMove
  Trace ssmTrace = new Trace(); // stepSlideMove

  Vector tmp = new Vector();

  BSPTree bsp;
  
  Vector qup = new Vector(0.0,0.0,1.0);
  
  int movementX=0;
  int movementY=0;
  
  QuakeCamera( this.camera) {

    HTML.HtmlElement canvas = HTML.document.body;// querySelector('#webgl-canvas');
    canvas.onMouseDown.listen( (HTML.MouseEvent e) {
      e.preventDefault();
      if( HTML.document.pointerLockElement != canvas) {
        canvas.requestPointerLock();
        canvas.requestFullscreen();
      } else {
        snd.playSound('rail');
        addLaser(camera, 0, -0.2);
      }
    });
    
    canvas.onMouseMove.listen( (HTML.MouseEvent e) {
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
    
    dir.scale(0);
    
    if (cpk[Key.W] != null) {
      dir.subtract( camera.getBack() );
    }
    if (cpk[Key.A] != null) {
      dir.subtract( camera.getRight() );
    }
    if (cpk[Key.S] != null) {
      dir.add( camera.getBack() );
    }
    if (cpk[Key.D] != null) {
      dir.add( camera.getRight() );
    }
    
    dir.z=0.0; // don't move up or down 
    
    position.set( camera.getPos()).scale(100);

    if( cpk[Key.SPACE] != null) {
      jump();
      cpk[Key.SPACE] = null;
    }
    
    move( dir, 50.0/3.0);
    camera.setPosFromVec( position.scale(0.01));
    
    if( movementY!=0)
      camera.matrix.rotate( movementY*0.006, camera.getRight());
    if( movementX!=0)
      camera.matrix.rotate( movementX*0.006, qup);
    
    movementX=0;
    movementY=0;
  }
  
  void friction() {
    if(!onGround) { return; }
    
    // TODO: ignore slope movement
    
    double speed = velocity.length();
    
    double control = Math.max(speed, q3movement_stopspeed); // speed < q3movement_stopspeed ? q3movement_stopspeed : speed;
    double drop = control*q3movement_friction*q3movement_frameTime;
    
    double newSpeed = speed - drop;
    if( newSpeed < 0.0) {
        newSpeed = 0.0;
    }
    if( speed != 0.0) {
        newSpeed /= speed;
        //HTML.querySelector("#info").text = "$newSpeed, $speed, $drop"; // -25, 50, 75
        velocity.scale(newSpeed);
    } else {
        velocity.scale(0.0);
    }
  }

  Vector mins = new Vector(-15.0,-15.0,-24.0);
  Vector maxs = new Vector( 15.0, 15.0, 32.0); // ducked z = 16
  Vector checkPoint = new Vector();
  void groundCheck() {
    checkPoint.x = position[0];
    checkPoint.y = position[1];
    checkPoint.z = position[2] - 0.25;
    
    bsp.trace( groundTrace, position, checkPoint, mins, maxs);
    
    // TODO: if ( !PM_CorrectAllSolid(&trace) )
    
    if( groundTrace.fraction == 1.0) { // falling
        //HTML.querySelector("#info").text = 'falling: ' + position.toString();
        onGround = false;
        return;
    }
    
    if ( velocity[2] > 0 && velocity.dot( groundTrace.plane.normal ) > 10 ) { // jumping
        onGround = false;
        return;
    }
    
    if( groundTrace.plane.normal[2] < 0.7) { // steep slope
        onGround = false;
        return;
    }
    
    onGround = true;
  }

  Vector tmp_cv = new Vector();
  Vector clipVelocity( Vector velIn, Vector normal, Vector out) {
    double backoff = velIn.dot(normal);
    if( backoff < 0.0 ) {
        backoff *= q3movement_overclip;
    } else {
        backoff /= q3movement_overclip;
    }
    return out.set(velIn).subtract( tmp_cv.set( normal).scale( backoff));
    // TODO: return out.set(normal).scale(-backoff).add(velIn);
  }

  void accelerate( Vector wishdir, double wishspeed, double accel) {
    double currentSpeed = velocity.dot( wishdir);
    double addSpeed = wishspeed - currentSpeed;
    if( addSpeed <= 0) {
        return;
    }
    double accelSpeed = accel*q3movement_frameTime*wishspeed;
    if( accelSpeed > addSpeed) {
        accelSpeed = addSpeed;
    }
    velocity.addScaledVector( wishdir, accelSpeed);
  }

  Vector tmp_j = new Vector();
  bool jump() {
    if(!onGround) { return false; }
    
    onGround = false;
    velocity[2] = q3movement_jumpvelocity*2.5;
    
    //Make sure that the player isn't stuck in the ground
    double groundDist = position.dot( groundTrace.plane.normal ) - groundTrace.plane.dist - q3movement_playerRadius;
    
    tmp_j.set(groundTrace.plane.normal);
    
    position.add( tmp_j.scale( groundDist + 5));
    snd.playSound('jump');
    
    return true;
  }

  Vector move( Vector dir, double frameTime) {
    q3movement_frameTime = frameTime*0.0075;
    
    //HTML.querySelector("#info").text = 'onGround';
    groundCheck();
    
    dir.normalize();
    
    if( onGround) {
      //HTML.querySelector("#info").text = 'onGround';
      walkMove( dir);
    } else {
      //HTML.querySelector("#info").text = 'inAir';
      airMove( dir);
    }
    
    return position;
  }

  void airMove( Vector dir) {
    // TODO: is dir normalized, I think accelerate expects it to be
    double speed = dir.length() * q3movement_scale;
    
    accelerate( dir, speed, q3movement_airaccelerate);
    
    stepSlideMove( true);
  }

  void walkMove( Vector dir) {
    friction();
    
    double speed = dir.length() * q3movement_scale;
    
    accelerate( dir, speed, q3movement_accelerate);
    
    // TODO: don't decrease velocity when going up or down a slope
    clipVelocity( velocity, groundTrace.plane.normal, velocity);
    
    if( velocity[0]==0 && velocity[1]==0 ) { return; }
    
    stepSlideMove( false );
  }

  Vector endVelocity = new Vector();
  Vector clipVelocity_ = new Vector();
  Vector endClipVelocity = new Vector();
  
  // Returns true if the velocity was clipped in some way
  bool slideMove( bool gravity) {
    int bumpcount = 0;
    int numbumps = 4;
    List<Vector> planes = new List<Vector>();

    if( gravity) {
      endVelocity.set( velocity);
      endVelocity[2] -= q3movement_gravity * q3movement_frameTime;
      velocity[2] = ( velocity[2] + endVelocity[2] ) * 0.5;
        
      if ( groundTrace != null && groundTrace.plane != null) {
        // slide along the ground plane
        clipVelocity( velocity, groundTrace.plane.normal, velocity);
      }
    }

    // never turn against the ground plane
    if ( groundTrace != null && groundTrace.plane != null ) {
        //planes.add(new Vector().set(groundTrace.plane.normal)); // TODO: use tmp ?
      planes.add(groundTrace.plane.normal);
    }

    // never turn against original velocity
    planes.add(velocity.copy().normalize());

    double time_left = q3movement_frameTime;
    Vector end = new Vector();
    for(bumpcount=0; bumpcount < numbumps; ++bumpcount) {
        
        // calculate position we are trying to move to
      end.set( position);
      end.addScaledVector( velocity, time_left);
        
        // see if we can make it there
        bsp.trace( smTrace, position, end, mins, maxs);

        if( smTrace.allSolid) {
            // entity is completely trapped in another solid
            velocity[2] = 0.0;   // don't build up falling damage, but allow sideways acceleration
            return true;
        }

        if( smTrace.fraction > 0) {
          // actually covered some distance
          position.set( smTrace.endPos);
        }

        if( smTrace.fraction == 1.0) {
             break;     // moved the entire distance
        }
        
        time_left -= time_left * smTrace.fraction;
        
        planes.add( new Vector().set(smTrace.plane.normal));

        //
        // modify velocity so it parallels all of the clip planes
        //

        // find a plane that it enters
        for(int i = 0; i < planes.length; ++i) {
            double into = velocity.dot( planes[i]);
            if ( into >= 0.1 ) { continue; } // move doesn't interact with the plane
            
            // slide along the plane
            clipVelocity( velocity, planes[i], clipVelocity_);
            clipVelocity( endVelocity, planes[i], endClipVelocity);

            // see if there is a second plane that the new move enters
            for( int j = 0; j < planes.length; j++) {
                if ( j == i ) { continue; }
                if ( clipVelocity_.dot( planes[j] ) >= 0.1 ) { continue; } // move doesn't interact with the plane
                
                // try clipping the move to the plane
                clipVelocity( clipVelocity_, planes[j], clipVelocity_ );
                clipVelocity( endClipVelocity, planes[j], endClipVelocity );

                // see if it goes back into the first clip plane
                if ( clipVelocity_.dot( planes[i] ) >= 0 ) { continue; }

                // slide the original velocity along the crease
                
                Vector dir = new Vector(); // TODO: use class var
                dir.cross2( planes[i], planes[j]);
                dir.normalize();
                double d = dir.dot( velocity);
                clipVelocity_.set( dir);
                clipVelocity_.scale( d);

                dir.cross2( planes[i], planes[j] ); // TODO: Why do this again ?
                dir.normalize();
                d = dir.dot( endVelocity);
                endClipVelocity.set( dir);
                endClipVelocity.scale( d);

                // see if there is a third plane the the new move enters
                for( int k = 0; k < planes.length; ++k) {
                    if ( k == i || k == j ) { continue; }
                    if ( clipVelocity_.dot( planes[k] ) >= 0.1 ) { continue; } // move doesn't interact with the plane
                    
                    // stop dead at a tripple plane interaction
                    velocity.scale(0);
                    return true;
                }
            }

            // if we have fixed all interactions, try another move
            velocity.set( clipVelocity_ );
            endVelocity.set( endClipVelocity );
            break;
        }
    }

    if ( gravity ) {
      velocity.set( endVelocity);
    }

    return bumpcount != 0;
  }

  Vector start_o = new Vector();
  Vector start_v = new Vector();
  Vector down_o = new Vector();
  Vector down_v = new Vector();

  Vector up = new Vector(0.0,0.0,1.0);
  Vector down = new Vector();
  
  void stepSlideMove( bool gravity) {
    start_o.set( position);
    start_v.set( velocity);
    
    if ( ! slideMove( gravity ) ) { return; } // we got exactly where we wanted to go first try

    down.set( start_o);
    down[2] -= STEPSIZE;
    bsp.trace( ssmTrace, start_o, down, mins, maxs);
    
    up.set(qup);  
    
    // never step up when you still have up velocity
    if ( velocity[2] > 0 && (ssmTrace.fraction == 1.0 || ssmTrace.plane.normal.dot( up) < 0.7)) { return; }
    
    down_o.set( position);
    down_v.set( velocity);
    
    up.set( start_o);
    up[2] += STEPSIZE;
    
    // test the player position if they were a stepheight higher
    bsp.trace( ssmTrace, start_o, up, mins, maxs);
    if ( ssmTrace.allSolid ) { return; } // can't step up
    
    double stepSize = ssmTrace.endPos[2] - start_o[2];
    // try slidemove from this position
    position.set( ssmTrace.endPos);
    velocity.set( start_v);
    
    slideMove( gravity );
    
    // push down the final amount
    down.set(position );
    down[2] -= stepSize;
    bsp.trace( ssmTrace, position, down, mins, maxs);
    if ( !ssmTrace.allSolid) {
      position.set( ssmTrace.endPos);
    }
    if ( ssmTrace.fraction < 1.0) {
        clipVelocity( velocity, ssmTrace.plane.normal, velocity);
    }

  }
  
}
