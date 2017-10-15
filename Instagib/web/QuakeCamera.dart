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
double q3movement_stepsize = 18.0;

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
  
  Output groundTrace = null;

  Vector tmp = new Vector();

  BSPTree _bsp;
  
  Vector up = new Vector(0.0,0.0,1.0);
  
  int movementX=0;
  int movementY=0;
  
  QuakeCamera( this.camera) {

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
    _bsp = bsp;
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
    move( dir, 50.0/3.0);
    
    if( cpk[Key.SPACE] != null) {
      jump();
    }

    camera.setPosFromVec( position.scale(0.01));
    
    if( movementY!=0)
      camera.matrix.rotate( movementY*0.006, camera.getRight());
    if( movementX!=0)
      camera.matrix.rotate( movementX*0.006, up);
    
    movementX=0;
    movementY=0;
  }
  
  void applyFriction() {
    if(!onGround) { return; }
    
    double speed = velocity.length();
    
    double control = speed < q3movement_stopspeed ? q3movement_stopspeed : speed;
    double drop = control*q3movement_friction*q3movement_frameTime;
    
    double newSpeed = speed - drop;
    if( newSpeed < 0.0) {
        newSpeed = 0.0;
    }
    if( speed != 0.0) {
        newSpeed /= speed;
        velocity.scale(newSpeed);
    } else {
        velocity.scale(0.0);
    }
  }

  Vector checkPoint = new Vector();
  void groundCheck() {
    checkPoint.x = position[0];
    checkPoint.y = position[1];
    checkPoint.z = position[2] - q3movement_playerRadius - 0.25;
    
    groundTrace = _bsp.trace( position, checkPoint, q3movement_playerRadius);
    
    if( groundTrace.fraction == 1.0) { // falling
        HTML.querySelector("#info").text = 'falling: ' + position.toString();
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
    
    out.set(velIn);
    tmp_cv.set( normal);
    tmp_cv.scale( backoff);
    
    return out.subtract( tmp_cv);
  }

  Vector tmp_a = new Vector();
  void accelerate( Vector dir, double speed, double accel) {
    double currentSpeed = velocity.dot( dir);
    double addSpeed = speed - currentSpeed;
    if( addSpeed <= 0) {
        return;
    }
    
    double accelSpeed = accel*q3movement_frameTime*speed;
    if( accelSpeed > addSpeed) {
        accelSpeed = addSpeed;
    }
    
    tmp_a.set(dir);
    tmp_a.scale( accelSpeed);
    velocity.add( tmp_a);
  }

  Vector tmp_j = new Vector();
  bool jump() {
    if(!onGround) { return false; }
    
    onGround = false;
    velocity[2] = q3movement_jumpvelocity*5;
    
    //Make sure that the player isn't stuck in the ground
    double groundDist = position.dot( groundTrace.plane.normal ) - groundTrace.plane.distance - q3movement_playerRadius;
    
    tmp_j.set(groundTrace.plane.normal);
    
    position.add( tmp_j.scale( groundDist + 5));
    
    return true;
  }

  Vector move( Vector dir, double frameTime) {
    q3movement_frameTime = frameTime*0.0075;
    
    HTML.querySelector("#info").text = 'onGround';
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
    double speed = dir.length() * q3movement_scale;
    
    accelerate( dir, speed, q3movement_airaccelerate);
    
    stepSlideMove( true);
  }

  void walkMove( Vector dir) {
    applyFriction();
    
    double speed = dir.length() * q3movement_scale;
    
    accelerate( dir, speed, q3movement_accelerate);
    
    clipVelocity( velocity, groundTrace.plane.normal, velocity);
    
    if( velocity[0]==0 && velocity[1]==0 ) { return; }
    
    stepSlideMove( false );
  }

  Vector endVelocity = new Vector();
  Vector clipVelocity_ = new Vector();
  Vector endClipVelocity = new Vector();
  
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
        planes.add(new Vector().set(groundTrace.plane.normal)); // TODO: use tmp ?
    }

    // never turn against original velocity
    planes.add(new Vector().set(velocity).normalize());

    double time_left = q3movement_frameTime;
    Vector end = new Vector();
    for(bumpcount=0; bumpcount < numbumps; ++bumpcount) {
        
        // calculate position we are trying to move to
      end.set( position);
      end.add( new Vector().set(velocity).scale( time_left) ); // TODO: use tmp
        
        // see if we can make it there
        Output trace = _bsp.trace( position, end, q3movement_playerRadius);

        if( trace.allSolid) {
            // entity is completely trapped in another solid
            velocity[2] = 0.0;   // don't build up falling damage, but allow sideways acceleration
            return true;
        }

        if( trace.fraction > 0) {
          // actually covered some distance
          position.set( trace.endPos);
        }

        if( trace.fraction == 1.0) {
             break;     // moved the entire distance
        }
        
        time_left -= time_left * trace.fraction;
        
        planes.add( new Vector().set(trace.plane.normal));

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

  Vector down = new Vector();
  
  void stepSlideMove( bool gravity) {
    start_o.set( position);
    start_v.set( velocity);
    
    if ( ! slideMove( gravity ) ) { return; } // we got exactly where we wanted to go first try

    down.set( start_o);
    down[2] -= q3movement_stepsize;
    Output trace = _bsp.trace( start_o, down, q3movement_playerRadius);
    
    Vector up = new Vector(0.0,0.0,1.0); // TODO: use tmp, don't collide with top up var
    
    // never step up when you still have up velocity
    if ( velocity[2] > 0 && (trace.fraction == 1.0 || trace.plane.normal.dot( up) < 0.7)) { return; }
    
    down_o.set( position);
    down_v.set( velocity);
    
    up.set( start_o);
    up[2] += q3movement_stepsize;
    
    // test the player position if they were a stepheight higher
    trace = _bsp.trace( start_o, up, q3movement_playerRadius); // TODO: pass in Output to avoid Object creation
    if ( trace.allSolid ) { return; } // can't step up
    
    double stepSize = trace.endPos[2] - start_o[2];
    // try slidemove from this position
    position.set( trace.endPos);
    velocity.set( start_v);
    
    slideMove( gravity );
    
    // push down the final amount
    down.set(position );
    down[2] -= stepSize;
    trace = _bsp.trace( position, down, q3movement_playerRadius);
    if ( !trace.allSolid) {
      position.set( trace.endPos);
    }
    if ( trace.fraction < 1.0) {
        clipVelocity( velocity, trace.plane.normal, velocity);
    }

  }
  
}
