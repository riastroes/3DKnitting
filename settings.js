function Settings(material, style, scale){
  this.material = material;
  this.style = style;
  this.width = width;
  this.height = height;
  this.scale = 0.2;         //canvas = 1000 px, bed = 200 mm

  this.nozzletemp;
  this.bedtemp;
  this.initTemperature();


}
Settings.prototype.initTemperature = function(){
  switch(this.material){
    case "PLA":{
      this.nozzletemp = 210;
      this.bedtemp = 50;
      break;
    }
    case "TPC FLEX":{
      this.nozzletemp = 210;
      this.bedtemp = 80;
      break;
    }
  }
}
