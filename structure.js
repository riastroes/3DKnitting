function Structure(pattern, first, layerheight){
    this.pattern = pattern.pattern;
    this.first = first;
    this.structure = [];
    this.purls = [];
    this.thickness =[];
    this.rows = [];
    this.layerheight = layerheight;
    this.s =0;
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
       next.x = row + this.rows[row].stitches[s].stitch[i].x;
       next.y += this.rows[row].stitches[s].stitch[i].y;
       next.z = (app.layer.layer * app.layer.layerheight) +  ( (this.layerheight /( app.grid.maxw))*(this.s+1))  + this.rows[row].stitches[s].stitch[i].z;
       println("i:" + i  + "z: " + this.rows[row].stitches[s].stitch[i].z);
       if(next.y >= app.grid.maxw){
         //end of circle
         next.y = 1;
         next.x = row;
         
       }
       
        append(this.structure, app.grid.get(next.x,next.y,next.z));
        append(this.thickness, 1);
       
     }
     this.s++;
     app.grid.last = next.copy();
     //app.grid.last.z = 0;
   }
}
Structure.prototype.gcode = function(settings, layer){
  var commands = new Array(";structure");
  commands = append(commands, "G0 F" + layer.speed);
  commands = append(commands, "G0 Z"+ layer.layerheight * layer.layer);
  
  var a = 0;
  var v;
  for(var k =1; k < this.structure.length; k++){
    if((this.thickness[k]) == 0 && k>0){
      commands = append(commands, "G0 X"+  (this.structure[k-1].x* settings.scale) + " Y"+ (this.structure[k-1].y* settings.scale) + " Z"+ this.structure[k-1].z);
    }
    else if(k >0 && !(floor(this.structure[k-1].x*100) == floor(this.structure[k].x*100) && floor(this.structure[k-1].y*100) == floor(this.structure[k].y*100) && floor(this.structure[k-1].z*100) == floor(this.structure[k].z*100))){
      v = createVector(this.structure[k-1].x, this.structure[k-1].y);
      v.x -= this.structure[k].x;
      v.y -= this.structure[k].y; 
      //v =  p5.Vector.sub(this.structure[k-1], this.structure[k]);
      
      v.mult(settings.scale);
      if(v.mag() > 0 && this.structure[k].x > 0 && this.structure[k].y > 0 && this.structure[k].z > 0 ){
     
        var t = layer.thickness ;
        app.gcode.extrude += v.mag() * t;
        
        commands = append(commands, "G1 X"+  (this.structure[k].x* settings.scale) + " Y"+ (this.structure[k].y* settings.scale) + " Z"+ this.structure[k].z  +" E" + app.gcode.extrude);
        
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
