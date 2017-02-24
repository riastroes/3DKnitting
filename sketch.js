
"use strict";
var app;


function setup() {
    createCanvas(1000,1000);
    background(255);
    
    app = new App();
    app.init();
    app.grid.draw();

    app.knitting.draw();
    app.skirt.draw();
    //app.grid.showPoint(50,50);
    noLoop();
}
function mousePressed(){
    if(!app.isSaved){
      app.generateGcode();
      app.gcode.save("3DKnitting-01");
      app.isSaved = true;
    }
}
