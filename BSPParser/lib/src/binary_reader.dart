part of bspparser;

class BinaryReader {
  final offset;
  final int length;
  ByteData dv;
  int pos = 0;

  //BytesBuilder
  BinaryReader(ByteBuffer buffer, this.offset, this.length) {
    dv = new ByteData.view(buffer, offset, length);
  }

  double readOneFloat() {
    pos += 4;
    return dv.getFloat32(pos - 4, Endian.little);
  }

  Float32List readFloat(int i) {
    //List<double> buf = new List<double>(i);
    Float32List buf = new Float32List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneFloat();
    }
    return buf;
  }

  Uint8List readBytes(int i) {
    Uint8List data = new Uint8List.view(dv.buffer, dv.offsetInBytes + pos, i);
    pos += i;
    return data;
  }

  int readOneInt() {
    pos += 4;
    return dv.getUint32(pos - 4, Endian.little);
  }

  Uint32List readInt(int i) {
    //List<double> buf = new List<double>(i);
    Uint32List buf = new Uint32List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneInt();
    }
    return buf;
  }

  String readString(int i) {
    return new String.fromCharCodes(readBytes(i));
  }

  int readOneSignedInt() {
    pos += 4;
    return dv.getInt32(pos - 4, Endian.little);
  }

  Int32List readSignedInt(int i) {
    Int32List buf = new Int32List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneSignedInt();
    }
    return buf;
  }

  int readOneSignedInt16() {
    pos += 2;
    return dv.getInt16(pos - 2, Endian.little);
  }

  Uint16List readInt32IntoUInt16(int i) {
    Uint16List buf = new Uint16List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneSignedInt();
    }
    return buf;
  }

  Int16List readSignedInt16(int i) {
    Int16List buf = new Int16List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneSignedInt16();
    }
    return buf;
  }

  Int32List readAllSignedInts() {
    return readSignedInt(length ~/ 4);
  }
}
