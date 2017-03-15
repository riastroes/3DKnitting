
"use strict";
var app;


function setup() {
    createCanvas(1000,1000);
    background(255);
    
    app = new App();
    app.init();
    app.grid.draw();
    app.generateGcode();
    app.knitting.draw();
    app.skirt.draw();
    app.grid.showPoint(50,50);
    noLoop();
}
function mousePressed(){
    if(!app.isSaved){
      
      app.gcode.save("Serie170307"+ app.pattern.type +  app.pattern.name + app.pattern.rows + "x" + app.pattern.stitches);
      app.isSaved = true;
    }
}
