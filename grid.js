function Grid(type, settings, maxrows, maxstitches){
  this.pos = [];
  this.last = app.first.copy();
  this.width = settings.width;
  this.height = settings.height;
  this.maxw = maxstitches;
  this.maxh = maxrows;
  this.init(type);
}
Grid.prototype.init = function(type){
  if(type == "Rect"){
    for(var x = 0; x < this.maxw; x += 1){
      this.pos[x]=[];
      for(var y = 0; y < this.maxw; y += 1){
        var xx = (this.width/this.maxw)*x;
        var yy = (this.height/this.maxh)*y;
        this.pos[x][y] = createVector(xx,yy,0);
      }
    }
  }
  else if(type == "Round"){
    //x = rows 
    //y = stitches 
    var center = createVector(this.width/2, this.height/2);
    for(var x = 0; x < this.maxh; x += 1){
      this.pos[x]=[];
      for(var y = 0; y < this.maxw; y += 1){
        var radius = 100 + ( x * this.maxh);
        var xx = center.x  + (radius * cos((TWO_PI/(this.maxw-1)) * y));
        var yy = center.y + (radius * sin((TWO_PI/(this.maxw-1)) * y));
        println(xx + " " + yy);
        this.pos[x][y] = createVector(xx,yy,0);
        println(x + "----" + y);
      }
    }
  }
}
Grid.prototype.get = function(x,y,z){
  var p;
  if(x < this.maxh && y < this.maxw){
    p = this.pos[x][y].copy();
    p.z = z;
  }
  else{
    println("FOUT:" + x + ","  + y);
    p = createVector(0,0,0); // FOUT
  }
  return p;
}
Grid.prototype.stretch = function(sx, sy){
  for(var x = 0; x < this.maxw; x += 1){
    this.pos[x]=[];
    for(var y = 0; y < this.maxh; y += 1){
      var xx = (this.width/(this.maxw / sx)) *x;
      var yy = (this.height/(this.maxh / sy))*y;
      this.pos[x][y] = createVector(xx,yy,0);
    }
  }
}

Grid.prototype.showPoint = function(x,y){
  stroke(255,0,0);
  strokeWeight(5);
  point(this.pos[x][y].x, this.pos[x][y].y);
}
Grid.prototype.draw = function(){
  stroke(0);
  strokeWeight(1);
  // for(var x = 0; x < this.maxw; x += 1){
  //   for(var y = 0; y < this.maxh; y += 1){
 for(var x = 0; x < this.maxh; x += 1){
    for(var y = 0; y < this.maxw; y += 1){
      //var i = y * this.maxw + x;
      point(this.pos[x][y].x, this.pos[x][y].y);
    }
  }
}
Grid.prototype.disorder = function(center, radius, force){
  var d=0;
  var dis;
  for(var x = 0; x < this.maxw; x +=1){
    for(var y = 0; y < this.maxh; y +=1){
      d = dist(center.x, center.y, this.pos[x][y].x, this.pos[x][y].y);
      if(d < radius){
        dis = center.copy();
        dis.sub(this.pos[x][y]);
        dis.normalize();
        dis.mult(force);
        this.pos[x][y].x += dis.x;
        this.pos[x][y].y += dis.y;
      }
    }
  }
}
Grid.prototype.round = function(center, radius){
  var s = 4;
  var r = 4;
  this.pos = [];
  for(var x = 0; x < this.maxw; x +=1){
    this.pos[x]=[];
    for(var y = 0; y < s; y +=1){
      var angle = (TWO_PI / s);
      var xx = center.x + (r * cos(angle * y ));
      var yy = center.y + (r * sin(angle * y ));
      this.pos[x][y] = createVector(xx,yy);
    }
    s += 4;
    r += 4; 
  }
}

Grid.prototype.addRow = function(row){
  for(var x = 0; x < this.maxw; x +=1){
    for(var y = 0; y < this.maxh; y +=1){
      if(y > row ){
        var xx = (this.width/this.maxw)*x;
        var yy = (this.height/this.maxh)*(y-0.5);
        this.pos[x][y] = createVector(xx,yy,0);
     }
    }
  }
  for(var x = 0; x < this.maxw; x +=1){
    for(var y = this.maxh ; y < this.maxh +1 ; y +=1){
      var xx = (this.width/this.maxw)*x;
      var yy = (this.height/this.maxh)*y;
      this.pos[x][y] = createVector(xx,yy,0);
    }
  }
  this.maxh +=1;
}
/*
void disorderRadius(PVector center, float radius,  float force){
    PVector dis;
    float distance = 0;
    
    
    for(int h = 0; h < this.hmax; h++){
      for( int w = 0 ; w < this.wmax; w++){
        distance = dist(center.x, center.y, this.pos[(h* this.wmax)+ w].x, this.pos[(h* this.wmax)+ w].y);
        
        if(distance < radius){
          dis = center.copy();
          dis.sub(this.pos[(h* this.wmax)+ w]);
          dis.normalize();
          dis.mult(force);
          this.pos[(h* this.wmax)+ w].add(dis);
        }
      }
    }  
  }
*/
