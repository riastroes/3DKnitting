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
    this.first = new Pos(2,6,0,0);
    this.settings = new Settings("PLA","normal",5);
    this.grid = new Grid(this.settings, 100,100);
   // this.grid.stretch(1,1);

   //pattern with flower in the middle
   // this.grid.disorder(this.grid.pos[50][48],1000, 200);
   // this.grid.disorder(this.grid.pos[50][48],200, 200);
   // this.grid.disorder(this.grid.pos[50][48],200, 200);
   // this.grid.disorder(this.grid.pos[50][48],1000, -100);
   // this.grid.disorder(this.grid.pos[65][50],1000, -20);
   // this.grid.disorder(this.grid.pos[65][68], 120, 20);
   // this.grid.addRow(10);

   //round knitting;
   //this.grid.round(this.grid.pos[50][48], 500);
   //this.pattern = new Pattern("Round", "Knit", 100, 4);
   
    
    this.pattern = new Pattern("Straight", "Knit",10,24);
    this.knitting = new Knitting(this.pattern, this.first);
    this.skirt = new Skirt(this.first, this.pattern.rows,this.pattern.stitches,1);
}
App.prototype.generateGcode = function(){
  this.layer = new Layer(0,0.25,0.4,1600); //layer, layerheight, thickness, speed
  this.gcode = new Gcode(this.layer);
  this.gcode.startCode();
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.skirt.gcode(this.settings, this.layer));
  this.gcode.getCodeToStart(this.skirt.skirt[8],this.knitting.knitting[0], this.layer);
  this.layer = new Layer(1,1.4, 0.1, 800);  //layer, layerheight, thickness, speed
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.knitting.gcode(this.settings, this.layer));
  this.gcode.endCode();
}
