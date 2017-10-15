part of bspparser;

class Shader {
  String shader;
  int surfaceFlags;
  int contentFlags;

  static const int size = 72;

  Shader(this.shader, this.surfaceFlags, this.contentFlags);


  Map toJson() {
    Map map = new Map();
    map["shader"] = shader;
    map["surfaceFlags"] = surfaceFlags;
    map["contentFlags"] = contentFlags;
    return map;
  }

}
