function Gcode(layer){
    this.speed = layer.speed;
    this.layerheight = layer.layerheight;
    this.thickness = layer.thickness;
    this.extrude = 0;
    this.commands = new Array(";Project: Generate Knitting",";Ria Stroes");
}

Gcode.prototype.startCode = function(){
    append(this.commands, ";start code");
    append(this.commands, "M140 S50");
    append(this.commands, "M109 T0 S210");
    append(this.commands, "T0");

    append(this.commands, "M190 S50           ;bed temperature on");
    append(this.commands, "M109 S210          ;extruder temperature on");
    append(this.commands, "G21                ;metric values");
    append(this.commands, "G90                ;absolute positioning");
    append(this.commands, "M107               ;start with the fan off");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "G28 Z0             ;move Z to min endstops");
    append(this.commands, "G0 Z15.0 F800      ;move the platform up 15mm");
    append(this.commands, "G92 E0             ;zero the extruded");
    append(this.commands, "G1 F200 E10        ;extrude 10mm of feed stock");
    append(this.commands, "G92 E0             ;zero the extruded length again");
    append(this.commands, "M117 Printing...");
}
Gcode.prototype.getCode = function(knitting){
    for(var i = 0; i < knitting.length; i++){
      append(this.commands, knitting[i]);
    }

}
Gcode.prototype.endCode = function(){
    append(this.commands, ";end code");
    append(this.commands, "G91                ;relative positioning");
    append(this.commands, "G1 F300            ;retract the filament a bit before lifting the nozzle, to release some of the pressure");
    append(this.commands, "M104 S0            ;extruder heater off");
    append(this.commands, "M140 S0            ;heated bed heater off");
    append(this.commands, "G1 Z+5 F2000       ;move Z up a bit and retract filament even more");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "M84                ;steppers off");
    append(this.commands, "G90                ;absolute positioning");
}
Gcode.prototype.getCodeToStart = function(skirtlast, knittingfirst, thickness, speed, scale){
  var tostart = new Array("");
  if(this.speed != speed){
    this.speed = speed;
    append(tostart, ";tostart");
    append(tostart, "G1 F" + this.speed);
  }

  var v = p5.Vector.sub(skirtlast, knittingfirst);
  v.mult(app.settings.scale);
  this.extrude += (v.mag() * this.layerheight * this.thickness);
  tostart = append(tostart, "G1 Z"+ (this.layer* this.layerheight) +" X"+  (knittingfirst.x*scale) + " Y"+ (knittingfirst.y*scale) + " E"+ this.extrude  );
  this.commands.concat(tostart);
}
Gcode.prototype.save = function(name){

    save(this.commands,name + ".gcode");
    console.log(name + " is saved.");
}
