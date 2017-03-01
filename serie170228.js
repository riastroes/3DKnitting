function App(){
    this.settings;
    this.grid;
    this.pattern;
    this.knitting;
    this.skirt;
    this.gcode;
    this.isSaved = false;
}
App.prototype.init = function(){
    this.first = new Pos(16,16,0,0);
    this.settings = new Settings("PLA","normal",5);
    this.grid = new Grid(this.settings,200, 200);
   // this.grid.stretch(1,1);

   //pattern with flower in the middle
//    this.grid.disorder(this.grid.pos[50][48],1000, 200);
//    this.grid.disorder(this.grid.pos[50][48],200, 200);
//    this.grid.disorder(this.grid.pos[50][48],200, 200);
//    this.grid.disorder(this.grid.pos[50][48],1000, -100);
  // this.grid.disorder(this.grid.pos[65][50],1000, -20);
  // this.grid.disorder(this.grid.pos[65][68], 120, 20);
  // this.grid.addRow(10);

   //round knitting;
   //this.grid.round(this.grid.pos[50][48], 500);
   //this.pattern = new Pattern("Round", "Purl", 100, 4);
   
    
    this.pattern = new Pattern("Straight", "Triangle",10,9);
    
    this.knitting = new Knitting(this.pattern, this.first);
    this.skirt = new Skirt(this.first, this.pattern.rows,this.pattern.stitches,1);
}
App.prototype.generateGcode = function(){
  this.layer = new Layer(1,0.5,0.2,800); //layer, layerheight, thickness, speed
  this.gcode = new Gcode(this.layer);
  this.gcode.startCode();
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.skirt.gcode(this.settings, this.layer));
  this.gcode.getCodeToStart(this.skirt.skirt[0],this.knitting.knitting[0], this.layer);
  this.layer = new Layer(1,1.3, 0.15, 800);  //layer, layerheight, thickness, speed
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.knitting.gcode(this.settings, this.layer));
//layer 2
 // this.layer = new Layer(2,1.3, 0.15, 800);  //layer, layerheight, thickness, speed
 // this.gcode.getCode(this.layer.gcode());
 // this.gcode.getCode(this.knitting.gcode(this.settings, this.layer));

  //create extra layer on the purls.
  // if(this.knitting.purls.length > 0){
  //   this.layer = new Layer(2,2, 0.1, 800);  //layer, layerheight, thickness, speed
  //   this.plus = new Plus(this.layer, this.knitting.purls);
  //   this.gcode.getCode(this.plus.gcode("purl", this.settings,2,0.5,3,400));//name, settings, density,min, max, speed
  // }
  this.gcode.endCode();
}
