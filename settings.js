function Settings(printer, material, style, scale){
  this.printer = printer;
  this.material = material;
  this.style = style;
  this.width = width;
  this.height = height;
  this.scale = 0.23;         //canvas = 1000 px, bed = 220 mm


  this.nozzletemp;
  this.bedtemp;
  this.initTemperature();


}
Settings.prototype.initTemperature = function(){
  switch(this.material){
    case "PLA":{
      this.nozzletemp = 210;
      this.bedtemp = 50;
      if(this.style == "fine"){
        this.layerheight = 1;
        this.thickness = 0.01; //0.02
      }
      break;
    }
    case "TPC FLEX":{
      this.nozzletemp = 210;
      this.bedtemp = 80;
      break;
    }
  }
}
