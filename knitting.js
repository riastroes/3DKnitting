function Knitting(pattern, first){

  this.pattern = pattern.pattern;
  this.first = first;
  this.knitting = [];
  this.purls = [];
  this.thickness =[];
  this.rows = [];
  this.create();
}
Knitting.prototype.create = function(){
  for(var i = 0; i < this.pattern.length; i++){
     this.createStitches(i, this.pattern[i]);
  }

}
Knitting.prototype.createStitches = function(row,types){
   var next = new Pos(0,0,0,0);
   var atype = "";
   if(row % 2 == 1){

     atype= types.split('').reverse().toString();
     atype = atype.replace(/,/g , "");

     this.rows[row] = new Row(atype);
   }
   else{
     this.rows[row] = new Row(types);
   }


   for(var r = 0; r < this.rows[row].maxstitches; r++){
     for(var i = 0; i < this.rows[row].stitches[r].stitch.length; i++){
       next = (this.rows[row].stitches[r].stitch[i].copy());
       next.add2(app.grid.last.x, app.grid.last.y, app.grid.last.z,0);
       append(this.knitting, app.grid.get(next.x,next.y,next.z));
       append(this.thickness, next.t);
     }
     app.grid.last = next.copy();
     app.grid.last.z = 0;
   }
}
Knitting.prototype.gcode = function(settings, layer){
  var commands = new Array(";knitting");
  commands = append(commands, "G0 F" + layer.speed);
  commands = append(commands, "G0 Z"+ layer.layerheight);
  
  var a = 0;
  var v;
  for(var k =1; k < this.knitting.length; k++){


    if(floor(this.thickness[k]) == 0){
      commands = append(commands, "G0 X"+  (this.knitting[k].x* settings.scale) + " Y"+ (this.knitting[k].y* settings.scale));
    }
    else{
      v = p5.Vector.sub(this.knitting[k-1], this.knitting[k]);

      if(v.mag() > 0){

        v.mult(settings.scale);
        var z = this.thickness[k];
        
        if(app.pattern.name == "none"){ //no difference in thickness
           app.gcode.extrude += v.mag() * layer.thickness * 1 ;
           if(z==3){
              app.gcode.extrude += v.mag() * layer.thickness * 0.5;
              this.purls[a] =this.knitting[k-1];
              this.purls[a+1]=this.knitting[k];
              a += 2;
           }
        }
        else{
          if( z == 1){
            app.gcode.extrude += v.mag() * layer.thickness * 1 ;
                    }
          else if( z == 2){
            app.gcode.extrude += v.mag() * layer.thickness * 1.3;
          }
          else if( z == 3){
            app.gcode.extrude += v.mag() * layer.thickness * 1.6;
          }
          else if( z == 0){
            app.gcode.extrude += v.mag() * layer.thickness;
          }else{
            println("FOUT");
          }
        }
        commands = append(commands, "G1 X"+  (this.knitting[k].x* settings.scale) + " Y"+ (this.knitting[k].y* settings.scale) + " E" + app.gcode.extrude);
      }else{
        println(v.mag()) ;
      }
    }

  }
  return commands;
}

Knitting.prototype.draw= function(){
    var v;
    println("knitting length:" + this.knitting.length);
    for(var k = 1; k <this.knitting.length; k++){
      v = p5.Vector.sub(this.knitting[k-1], this.knitting[k]);

      if(v.mag()>0){
        var t = int(this.thickness[k]);
        if(t == 0){
          strokeWeight(1);
          stroke(0,255,0);
        }
        else if(t == 1){
          strokeWeight(1);
          stroke(0);
        }
        else if(t == 2){
          strokeWeight(2);
          stroke(0);
        }
        else if(t == 3){
          strokeWeight(3);
          stroke(0);
        }

        line(this.knitting[k-1].x, this.knitting[k-1].y, this.knitting[k].x, this.knitting[k].y);
      }
    }
}
