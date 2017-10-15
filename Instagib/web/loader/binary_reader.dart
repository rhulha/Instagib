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
    return dv.getFloat32(pos - 4, Endianness.LITTLE_ENDIAN);
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
    Uint8List data = new Uint8List.view(dv.buffer, dv.offsetInBytes+ pos, i);
    pos += i;
    return data;
  }
  
  int readOneInt() {
    pos += 4;
    return dv.getUint32(pos - 4, Endianness.LITTLE_ENDIAN);
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
    return dv.getInt32(pos - 4, Endianness.LITTLE_ENDIAN);
  }

  Int32List readSignedInt(int i) {
    //List<double> buf = new List<double>(i);
    Int32List buf = new Int32List(i);
    for (int j = 0; j < buf.length; j++) {
      buf[j] = readOneSignedInt();
    }
    return buf;
  }

  Int32List readAllSignedInts() {
    return readSignedInt(length~/4);
  }
}
