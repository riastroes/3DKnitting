function Plus(layer, knitting){
    this.commands = [];
    this.layer = layer;
    this.knitting = knitting;
    
}
Plus.prototype.gcode = function(name, settings, density,min, max, speed){
    this.commands = append(this.commands, ";param density: " + density);
    this.commands = append(this.commands, ";param min: " + min);
    this.commands = append(this.commands, ";param max: " + max);
     this.commands = append(this.commands, "G0 F"+ speed);
    for(var k =1; k < this.knitting.length; k += density){
        if(name =="mohair"){
        
         this.commands = append(this.commands, "G0 Z"+ min + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale));
         app.gcode.extrude += (max-min) * this.layer.thickness;
         this.commands = append(this.commands, "G1 Z"+ max + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude );
        }
        else if(name =="relief"){
         app.gcode.extrude += (max-min) * this.layer.thickness;
         
         this.commands = append(this.commands, "G1 Z"+ min + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude);
         app.gcode.extrude += (max-min) * this.layer.thickness;
         this.commands = append(this.commands, "G1 Z"+ max + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude );
        }
         else if(name =="lussen"){
         this.commands = append(this.commands, "G0 Z"+ min + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) );
         app.gcode.extrude += (max-min) * this.layer.thickness;
         this.commands = append(this.commands, "G1 Z"+ max + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude );
         app.gcode.extrude += (max-min) * this.layer.thickness;
         this.commands = append(this.commands, "G1 Z"+ min + " X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude);
        }
        else if(name =="purl"){
         this.commands = append(this.commands, "G0  X"+ (this.knitting[k-1].x* settings.scale)  + " Y"+ (this.knitting[k-1].y* settings.scale) );
         var v = createVector(this.knitting[k-1].x, this.knitting[k-1].y);
         v.sub(this.knitting[k].x, this.knitting[k].y);
         app.gcode.extrude += v.mag() * this.layer.thickness * 0.5;
         this.commands = append(this.commands, "G1  X"+ (this.knitting[k].x* settings.scale)  + " Y"+ (this.knitting[k].y* settings.scale) + " E"+ app.gcode.extrude);
        
        }
    }
    return this.commands;
}