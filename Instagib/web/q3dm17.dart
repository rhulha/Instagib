part of instagib;

List<int> removeUnneededObjects(List<Surface> surfaces, List<Shader> shaders, List<int> indexes) {
  List<String> skip = new List<String>();
  skip.add("flareShader");
  skip.add("textures/skies/blacksky");
  skip.add("textures/sfx/beam");
  skip.add("models/mapobjects/spotlamp/beam");
  skip.add("models/mapobjects/lamps/flare03");
  skip.add("models/mapobjects/teleporter/energy"); // TODO readd and make blue ?
  skip.add("models/mapobjects/spotlamp/spotlamp");
  skip.add("models/mapobjects/spotlamp/spotlamp_l");
  skip.add("models/mapobjects/lamps/bot_lamp"); // head on the railgun pad
  skip.add("models/mapobjects/lamps/bot_lamp2");
  skip.add("models/mapobjects/lamps/bot_flare");
  skip.add("models/mapobjects/lamps/bot_flare2");
  skip.add("models/mapobjects/lamps/bot_wing");
  //skip.add("models/mapobjects/kmlamp1"); // stand lights
  //skip.add("models/mapobjects/kmlamp_white");
  
  List<int> indicesList = new List<int>();
  for (Surface surface in surfaces) {
    if (skip.contains(shaders[surface.shaderNum].shader)) continue;
    for (int k = 0; k < surface.numIndexes; ++k) {
      int i = surface.firstVert + indexes[surface.firstIndex + k];
      indicesList.add(i);
    }
  }
  return indicesList;
}

void changeColors(List<Surface> surfaces, List<int> indexes, List<Shader> shaders, List<Vertex> vertexes) {
  List<String> blue = new List<String>();
  blue.add("textures/base_wall/c_met5_2");
  blue.add("textures/base_trim/border11b");
  blue.add("textures/base_trim/border11light");
  blue.add("textures/base_light/lt2_2000");
  blue.add("textures/base_light/lt2_8000");
  blue.add("textures/base_light/baslt4_1_4k");
  blue.add("textures/base_wall/metaltech12final");
  blue.add("textures/base_light/light5_5k");
  blue.add("textures/base_wall/main_q3abanner");
  blue.add("textures/base_support/cable");
  blue.add("models/mapobjects/kmlamp1");
  blue.add("models/mapobjects/kmlamp_white");
  blue.add("models/mapobjects/teleporter/teleporter");
  blue.add("textures/base_trim/pewter_shiney");

  List<String> red = new List<String>();
  //red.add("textures/base_wall/atech1_e");
  //red.add("textures/base_light/light5_5k");

  for (Surface face in surfaces) {
    if (blue.contains(shaders[face.shaderNum].shader)) {
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        vertexes[i].color[2] = 1.0;
      }
    } else if (red.contains(shaders[face.shaderNum].shader)) {
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        vertexes[i].color[0] = 1.0;
      }
    } else if (shaders[face.shaderNum].shader == "textures/base_floor/diamond2c") { // special middle jump pad handling
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        double z = vertexes[i].xyz[2];
        if (z >= 95 && z <= 108) {
          vertexes[i].color[0] = 0.25;
          vertexes[i].color[1] = 0.25;
          vertexes[i].color[2] = 1.0;
        }
      }
    } else {
      for (int k = 0; k < face.numIndexes; ++k) {
        int i = face.firstVert + indexes[face.firstIndex + k];
        vertexes[i].color[0] *= 0.5;
        vertexes[i].color[1] *= 0.5;
        vertexes[i].color[2] *= 0.5;
      }
    }
  }
}
