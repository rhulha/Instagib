part of instagib;

class Wrapper<T> {
  T value;
  Wrapper(this.value);
}

List<Vector> vectorList(int num) {
  return new List<Vector>.generate(num, (idx) => new Vector());
}

void CrossProduct(List<double> v1, List<double> v2, List<double> cross) {
  cross[0] = v1[1] * v2[2] - v1[2] * v2[1];
  cross[1] = v1[2] * v2[0] - v1[0] * v2[2];
  cross[2] = v1[0] * v2[1] - v1[1] * v2[0];
}

double DotProduct(List<double> a, List<double> b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

void VectorCopy(List<double> a, List<double> b) {
  for (int i = 0; i < b.length; i++) {
    b[i] = a[i];
  }
}

void VectorMA(Vector v, num s, List<double> b, Vector o) {
  o[0] = v[0] + b[0] * s;
  o[1] = v[1] + b[1] * s;
  o[2] = v[2] + b[2] * s;
}

double VectorNormalize(List<double> v) {
  double length = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
  if ( length!=0 ) {
    double ilength = 1/length;
    v[0] *= ilength;
    v[1] *= ilength;
    v[2] *= ilength;
  }
  return length;
}

// #define  SnapVector(v) {v[0]=((int)(v[0]));v[1]=((int)(v[1]));v[2]=((int)(v[2]));}
void snapVector(Vector normal) {
  for (int i=0 ; i<3 ; i++)
  {
    if ( (normal[i] - 1).abs() < NORMAL_EPSILON )
    {
      normal.scale(0);
      normal[i] = 1.0;
      break;
    }
    if ( (normal[i] - -1).abs() < NORMAL_EPSILON )
    {
      normal.scale(0);
      normal[i] = -1.0;
      break;
    }
  }
}

// TODO: is invplane really needed ? Why not use +plane[0]
// TODO: maybe return 0 =  false, 1 = flipped.value = false;, -1 flipped.value = true;
List<double> invplane = new List<double>(4);
bool planeEqual(PatchPlane p, List<double> plane, Wrapper<bool> flipped) {
  if ((p.plane[0] - plane[0]).abs() < NORMAL_EPSILON && (p.plane[1] - plane[1]).abs() < NORMAL_EPSILON && (p.plane[2] - plane[2]).abs() < NORMAL_EPSILON && (p.plane[3] - plane[3]).abs() < DIST_EPSILON) {
    flipped.value = false;
    return true;
  }
  invplane[0] = -plane[0];
  invplane[1] = -plane[1];
  invplane[2] = -plane[2];
  invplane[3] = -plane[3];

  if ((p.plane[0] - invplane[0]).abs() < NORMAL_EPSILON && (p.plane[1] - invplane[1]).abs() < NORMAL_EPSILON && (p.plane[2] - invplane[2]).abs() < NORMAL_EPSILON && (p.plane[3] - invplane[3]).abs() < DIST_EPSILON) {
    flipped.value = true;
    return true;
  }
  return false;
}

int signbitsForNormal(List<double> normal) {
  int bits = 0;
  for (int j = 0; j < 3; j++) {
    if (normal[j] < 0) {
      bits |= 1 << j;
    }
  }
  return bits;
}

Vector d1 = new Vector();
Vector d2 = new Vector();
bool planeFromPoints(List<double> plane, Vector a, Vector b, Vector c) {

  d1.set(b).subtract(a);
  d2.set(c).subtract(a);

  d2.cross(d1); // CrossProduct( d2, d1, plane );
  double len = d2.length();
  if (len == 0) {
    return false;
  }

  d2.scale(1 / len); // normalize
  plane[0] = d2[0];
  plane[1] = d2[1];
  plane[2] = d2[2];
  plane[3] = a.dot(d2);
  return true;
}
