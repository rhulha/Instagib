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

  Float32List readFloat(int i) {
    Float32List data = new Float32List.view(buffer, pos, i);
    pos += (4 * i);
    return data;
  }

  double readOneFloat() {
    pos += 4;
    return dv.getFloat32(pos - 4);
  }

  List<double> readListDouble(int i) {
    List<double> buf = new List<double>(i);
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
    return dv.getUint32(pos - 4);
  }
  
  Uint32List readInt(int i) {
    Uint32List data = new Uint32List.view(buffer, pos, i);
    pos += (4 * i);
    return data;
  }
}
