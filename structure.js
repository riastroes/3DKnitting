function Structure(pattern, first, layerheight){
    this.pattern = pattern.pattern;
    this.first = first;
    this.structure = [];
    this.purls = [];
    this.thickness =[];
    this.rows = [];
    this.layerheight = layerheight;
    this.create();
 }

 Structure.prototype.create = function(){
     for(var i = 0; i < this.pattern.length; i++){
        this.createStitches(i, this.pattern[i]);
    }
 }
 Structure.prototype.createStitches = function(row,types){
   var next = new Pos(0,0,0,0);
   this.rows[row] = new Row(types);


   for(var s = 0; s < this.rows[row].maxstitches; s++){
     for(var i = 0; i < this.rows[row].stitches[s].stitch.length; i++){
       next = app.grid.last.copy();
       next.x = row;
       next.y += this.rows[row].stitches[s].stitch[i].y;
       next.z = this.rows[row].stitches[s].stitch[i].z;
       next.t += this.layerheight / app.grid.maxw //this.rows[row].stitches[s].stitch[i].t;
       if((next.y % app.grid.maxw) == 0 && s > 0){
           next.y = 0;
           next.t += this.layerheight;
       }
       append(this.structure, app.grid.get(next.x,next.y,next.z));
       append(this.thickness, next.t);
     }
     app.grid.last = next.copy();
     //app.grid.last.z = 0;
   }
}
Structure.prototype.gcode = function(settings, layer){
  var commands = new Array(";structure");
  commands = append(commands, "G0 F" + layer.speed);
  commands = append(commands, "G0 Z"+ layer.layerheight);
  
  var a = 0;
  var v;
  for(var k =0; k < this.structure.length; k++){
    if(this.structure[k].z > 0 ){
        commands = append(commands, "G0 Z"+ this.thickness[k].z);
    }

    if(floor(this.thickness[k]) == 0 && k>0){
      commands = append(commands, "G0 X"+  (this.structure[k-1].x* settings.scale) + " Y"+ (this.structure[k-1].y* settings.scale));
    }
    else if(k >0){
      v = p5.Vector.sub(this.structure[k-1], this.structure[k]);

      if(v.mag() > 0){

        v.mult(settings.scale);
        var z = this.thickness[k];
        
        if(app.pattern.name == "none"){ //no difference in thickness
           app.gcode.extrude += v.mag() * layer.thickness * 1 ;
           if(z==3){
              app.gcode.extrude += v.mag() * layer.thickness * 0.5;
              this.purls[a] =this.structure[k-1];
              this.purls[a+1]=this.structure[k];
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
        commands = append(commands, "G1 X"+  (this.structure[k].x* settings.scale) + " Y"+ (this.structure[k].y* settings.scale) + " E" + app.gcode.extrude);
      }else{
        println(v.mag()) ;
      }
    }

  }
  return commands;
}

Structure.prototype.draw= function(){
    var v;
    println("structure length:" + this.structure.length);
    
    for(var k = 1; k <this.structure.length; k++){
      v = p5.Vector.sub(this.structure[k-1], this.structure[k]);

      if(v.mag()>0){
        var t = int(this.thickness[k]);
        println(t);
        if(t == 0){
          strokeWeight(0);
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

        line(this.structure[k-1].x, this.structure[k-1].y, this.structure[k].x, this.structure[k].y);
      }
    }
}
