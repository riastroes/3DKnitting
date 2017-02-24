function Skirt(first,rows,stitches, marge){
    this.skirt = [];
    this.commands = new Array(";skirt");

    this.next = first.copy();
    this.rows = rows;
    this.stitches = stitches;
    this.marge = marge;

    this.create();

}
Skirt.prototype.create = function(){
    var w = this.stitches * 4;
    var h = (this.rows+2) * 2;

    this.next.add2(-this.marge,-this.marge,0,0);

    this.skirt[0] = app.grid.pos[this.next.x][this.next.y].add(createVector(-2,-2,0));
    this.skirt[4] = app.grid.pos[this.next.x][this.next.y].add(createVector(-1,-1,0));
    this.skirt[8] = app.grid.pos[this.next.x][this.next.y];
    this.next.add2(0,(2*this.marge) + h, 0,0);
    println("this.next:" + h );
    this.skirt[1] = app.grid.pos[this.next.x][this.next.y].add(createVector(-2,2,0));
    this.skirt[5] = app.grid.pos[this.next.x][this.next.y].add(createVector(-1,1,0));
    this.next.add2((2*this.marge) + w, 0, 0,0);
    this.skirt[2] = app.grid.pos[this.next.x][this.next.y].add(createVector(2,2,0));
    this.skirt[6] = app.grid.pos[this.next.x][this.next.y].add(createVector(1,1,0));
    this.next.add2(0, -((2*this.marge) + h), 0,0);
    this.skirt[3] = app.grid.pos[this.next.x][this.next.y].add(createVector(2,-2,0));
    this.skirt[7] = app.grid.pos[this.next.x][this.next.y].add(createVector(1,-1,0));

    app.grid.last = this.next.copy();

}
Skirt.prototype.gcode = function(settings, layer){

    if(app.gcode.speed != layer.speed){
      app.gcode.speed = layer.speed;
      append(this.commands, "G1 F" + app.gcode.speed);
    }
    if(app.gcode.layerheight != layer.layerheight * layer.thickness){
      app.gcode.layerheight = layer.layerheight * layer.thickness;
      append(this.commands, "G0 Z" +  app.gcode.layerheight);
      append(this.commands, "G0 X"+  (this.skirt[0].x* settings.scale) + " Y"+ (this.skirt[0].y* settings.scale) );

    }

    for(var i = 1; i < this.skirt.length ; i++){
      var v = p5.Vector.sub(this.skirt[i], this.skirt[i-1]);
      v.mult(settings.scale);
      app.gcode.extrude += v.mag() * layer.layerheight * layer.thickness;
      append(this.commands, "G1 X"+ (this.skirt[i].x* settings.scale)  + " Y"+ (this.skirt[i].y* settings.scale)  + " E" + app.gcode.extrude);

    }
    return this.commands;
  }

Skirt.prototype.draw =function(){

    strokeWeight(0.2);
    stroke(0,0,200);
    noFill();
    beginShape();
       for(var s = 0; s < this.skirt.length; s++){
        vertex(this.skirt[s].x, this.skirt[s].y);
      }
    endShape();
  }
