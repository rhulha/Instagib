part of bspparser;

class BinaryReader {

  ByteBuffer buffer;
  ByteData dv;
  int pos = 0;

  BinaryReader(this.buffer) {
    dv = new ByteData.view(buffer);
  }

  int length() {
    return buffer.lengthInBytes;
  }

  Float32List readFloat_wrongEndian(int i) {
    Float32List data = new Float32List.view(buffer, pos, i);
    pos += (4 * i);
    return data;
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
    Uint8List data = new Uint8List.view(buffer, pos, i);
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

  Uint32List readInt_wrongEndian(int i) {
    Uint32List data = new Uint32List.view(buffer, pos, i);
    pos += (4 * i);
    return data;
  }
  
  String readString(int i) {
    return new String.fromCharCodes(readBytes(i));
  }
}
