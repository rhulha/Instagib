part of instagib;

class FPSCamera extends Animatable
{
  Camera camera;
  Vector momentum = new Vector();
  
  BSPTree bsp;
  
  FPSCamera( this.camera);
  
  void setBSPTree( BSPTree bsp) {
    this.bsp = bsp;
  }
  
  void animate( double elapsed)
  {
    Map<int, bool> cpk = currentlyPressedKeys;
    Map<String, bool> cpmb = currentlyPressedMouseButtons;
    
    if (cpk[Key.A] != null) {
      moveLeft(0.03);
    } else if (cpk[Key.D] != null) {
      moveRight(0.03);
    }
    if (cpk[Key.W] != null) {
      moveForward(0.03);
    } else if (cpk[Key.S] != null) {
      moveBackward(0.03);
    }
    
    if( cpk[Key.SPACE] != null) {
      momentum.scale( 0.92 );
    }
    
    if( mouseY!=0)
      camera.lookUp(mouseY*0.00006);
    if( mouseX!=0)
      camera.lookLeft(-mouseX*0.00003);

    camera.translateFromVec( momentum );
  }
  
  void moveForward(double amount) {
    Vector back = camera.getBack();
    back.negate();
    momentum.lerp( back, amount);
  }
  void moveBackward(double amount) {
    Vector back = camera.getBack();
    momentum.lerp( back, amount);
  }
  void moveUp( num amount) {
    Vector up = camera.getUp();
    momentum.lerp( up, amount);
  }
  void moveDown( num amount) {
    Vector up = camera.getUp();
    up.negate();
    momentum.lerp( up, amount);
  }
  void moveLeft( num amount) {
    Vector right = camera.getRight();
    right.negate();
    momentum.lerp( right, amount);
  }
  void moveRight( num amount) {
    Vector right = camera.getRight();
    momentum.lerp( right, amount);
  }
}
