function Skirt(first,rows,stitches, marge){
    this.skirt = [];
    this.last = 2;
    this.commands = new Array(";skirt");

    this.next = first.copy();
    this.rows = rows;
    this.stitches = stitches;
    this.marge = marge;

    this.createLineAbs();

}
Skirt.prototype.createLine = function(){
    var w = this.stitches * 4;
    var h = (this.rows+2) * 2; //2

    //this.next.add2(-this.marge,-this.marge,0,0);

    this.skirt[0] = app.grid.pos[this.next.x][this.next.y].add(createVector(0,-20,0));
    this.next.add2(w,0, 0,0);
    this.skirt[1] = app.grid.pos[this.next.x][this.next.y].add(createVector(0,-20,0));
    this.next.add2(-w,0, 0,0);
    this.skirt[2] = app.grid.pos[this.next.x][this.next.y];
    this.last = this.skirt.length;
    app.grid.last = this.next.copy();

}
Skirt.prototype.createLineAbs = function(){
    var w = this.stitches * 4;
    var h = (this.rows+2) * 2; //2

    //this.next.add2(-this.marge,-this.marge,0,0);

    this.skirt[0] = createVector(10,10);
    this.skirt[1] = createVector(200,10);
    this.skirt[2] = createVector(10,10);
    
    this.last = this.skirt.length;
    app.grid.last = this.next.copy();

}
Skirt.prototype.createRect = function(){
    var w = this.stitches * 4;
    var h = (this.rows+2) * 2; //2

    this.next.add2(-this.marge,-this.marge,0,0);

    this.skirt[0] = app.grid.pos[this.next.x][this.next.y].add(createVector(-2,-2,0));
    this.skirt[4] = app.grid.pos[this.next.x][this.next.y].add(createVector(-1,-1,0));
    this.skirt[8] = app.grid.pos[this.next.x][this.next.y];
    this.next.add2(0,(2*this.marge) + h, 0,0);
   
    this.skirt[1] = app.grid.pos[this.next.x][this.next.y].add(createVector(-2,2,0));
    this.skirt[5] = app.grid.pos[this.next.x][this.next.y].add(createVector(-1,1,0));
    this.next.add2((2*this.marge) + w, 0, 0,0);
    this.skirt[2] = app.grid.pos[this.next.x][this.next.y].add(createVector(2,2,0));
    this.skirt[6] = app.grid.pos[this.next.x][this.next.y].add(createVector(1,1,0));
    this.next.add2(0, -((2*this.marge) + h), 0,0);
    this.skirt[3] = app.grid.pos[this.next.x][this.next.y].add(createVector(2,-2,0));
    this.skirt[7] = app.grid.pos[this.next.x][this.next.y].add(createVector(1,-1,0));
    this.last = this.skirt.length;
    app.grid.last = this.next.copy();

}
Skirt.prototype.gcode = function(settings, layer){

    append(this.commands, "G0 F" + layer.speed);
    append(this.commands, "G0 Z" + layer.layerheight);
    append(this.commands, "G0 X"+  (this.skirt[0].x* settings.scale) + " Y"+ (this.skirt[0].y* settings.scale) );
   
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
