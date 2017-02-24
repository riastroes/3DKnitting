function Layer(layer, layerheight, thickness, speed){
  this.layer = layer;
  this.layerheight = layerheight;
  this.thickness = thickness;
  this.speed = speed;
  this.commands = new Array(";Layer " + this.layer);
  append(this.commands, ";param layerheight: " + this.layerheight);
  append(this.commands, ";param thickness:   " + this.thickness);
  append(this.commands, ";param speed:       " + this.speed);
}
Layer.prototype.gcode = function(){
  return this.commands;
}
