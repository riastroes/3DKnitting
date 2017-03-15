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
    this.first = new Pos(1,16,0,0);
    this.settings = new Settings("Ultimaker2+","PLA","fine",5);

    // the s in het grid zorgt voor het minderen 
    this.grid = new Grid("Rect", this.settings,200, 300);
       
    this.pattern = new Pattern("Straight", "none",10,74);
    this.knitting = new Knitting(this.pattern, this.first);
    this.skirt = new Skirt(this.first, this.pattern.rows,this.pattern.stitches,1);
}
App.prototype.generateGcode = function(){
  this.layer = new Layer(1,this.settings.layerheight,this.settings.thickness*2,1000); //layer, layerheight, thickness, speed
  this.gcode = new Gcode(this.layer);
  this.gcode.startCode();
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.skirt.gcode(this.settings, this.layer));
  this.gcode.getCodeToStart(this.skirt.last,this.knitting.knitting[0], this.layer);
  this.layer = new Layer(1,this.settings.layerheight,this.settings.thickness, 1000);  //layer, layerheight, thickness, speed
  this.gcode.getCode(this.layer.gcode());
  this.gcode.getCode(this.knitting.gcode(this.settings, this.layer));
//  this.plus = new Plus(this.layer, this.knitting.knitting);
//  this.gcode.getCode(this.plus.gcode("lussen", this.settings,2,0.5,3,300));
//  this.gcode.endCode();
}
