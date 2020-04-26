//import 'package:chronosgl/chronosgl.dart';
import 'dart:io';
import 'dart:typed_data';
import 'package:bspparser/BSPParser.dart';

main() {
  File file = new File("D:\\Action\\Quake3demo\\demoq3\\upper.md3");
  List<int> fileBytes = file.readAsBytesSync();

  ByteBuffer buffer = new Int8List.fromList(fileBytes).buffer;
  MD3Parser md3 = new MD3Parser(buffer);


}