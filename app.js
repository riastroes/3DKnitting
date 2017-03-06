function App(){
    this.settings;
    this.grid;
    this.pattern;
    this.knitting;
    this.structure;
    this.skirt;
    this.gcode;
    this.isSaved = false;
}
App.prototype.init = function(){
    this.first = new Pos(0,0,0,0);
    this.settings = new Settings("PLA","normal",5);
    this.grid = new Grid("Round", this.settings,10,30);


   this.pattern = new Pattern("Round", "Circle",1,195);  //type, name, rows, stitches
   this.structure = new Structure(this.pattern, this.first, 0.27);
   this.skirt = new Skirt(this.first, this.pattern.rows,this.pattern.stitches,1);
}
App.prototype.generateGcode = function(){
  this.layer = new Layer(1,0.5,0.2,800); //layer, layerheight, thickness, speed
  this.gcode = new Gcode(this.layer);
  this.gcode.startCode();
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.skirt.gcode(this.settings, this.layer));
  this.gcode.getCodeToStart(this.skirt.skirt[0],this.structure.structure[0], this.layer);
  this.layer = new Layer(1,0.25, 0.15, 1800);  //layer, layerheight, thickness, speed
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.structure.gcode(this.settings, this.layer));

//layer 2
 // this.layer = new Layer(1,0.5, 0.15, 1800);  //layer, layerheight, thickness, speed
 // this.gcode.getCode(this.layer.gcode());
  //this.gcode.getCode(this.structure.gcode(this.settings, this.layer));

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
