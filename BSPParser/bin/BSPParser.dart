import 'dart:io';
import 'dart:typed_data';

abstract class LumpTypes {
  static final int Entities = 0;
  static final int Textures = 1;
  static final int Planes = 2;
  static final int Nodes = 3;
  static final int Leafs = 4;
  static final int Leaffaces = 5;
  static final int Leafbrushes = 6;
  static final int Models = 7;
  static final int Brushes = 8;
  static final int Brushsides = 9;
  static final int Vertexes = 10;
  static final int Meshverts = 11;
  static final int Effects = 12;
  static final int Faces = 13;
  static final int Lightmaps = 14;
  static final int Lightvols = 15;
  static final int Visdata = 16;
}

class BSPParser {
  
  RandomAccessFile raf;
  Int32List header;
  
  BSPParser(String filename) {
    var file = new File(filename);
    //Uint8List data = file.readAsBytesSync();
    
    raf = file.openSync(mode: READ);
    Uint8List headerBytes = new Uint8List(144);
    raf.readIntoSync(headerBytes);
    
    header = new Int32List.view( headerBytes.buffer);
    
    assert( header[0] == 1347633737); // "IBSP"
    assert( header[1] == 46); // Quake3 BSP version ID
    
  }

  Uint8List getLump( int type) {
    int offset = header[2+type*2];
    int length = header[2+type*2+1];
    
    Uint8List lump = new Uint8List(length);
    
    raf.setPositionSync(offset);
    raf.readIntoSync(lump);
    return lump;
  }
}


void main() {
  
  BSPParser bsp = new BSPParser('q3dm17.bsp');
  
  new File("q3dm17.brushes").writeAsBytesSync(bsp.getLump( LumpTypes.Brushes));
  new File("q3dm17.brushsides").writeAsBytesSync(bsp.getLump( LumpTypes.Brushsides));
  new File("q3dm17.leafbrushes").writeAsBytesSync(bsp.getLump( LumpTypes.Leafbrushes));
  new File("q3dm17.leafs").writeAsBytesSync(bsp.getLump( LumpTypes.Leafs));
  new File("q3dm17.nodes").writeAsBytesSync(bsp.getLump( LumpTypes.Nodes));
  new File("q3dm17.planes").writeAsBytesSync(bsp.getLump( LumpTypes.Planes));
  
  
}
