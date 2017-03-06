function Pattern(type, name, rows, stitches){
    this.name = name;
    this.rows = rows;
    this.pattern =[];
    if(type == "Straight"){
      this.stitches = stitches;
      
      this.create(name);
    }
    else if(type == "Round"){
      println("Round");
      var knit ="";
      this.stitches = stitches;
      for(var r = 0; r < this.rows; r++){
        for(var s = 0; s < this.stitches; s++){
          if(this.name == "Circle"){
            knit = knit.concat("+");
          }
          else if(this.name == "Circle1"){
             knit = knit.concat("1");
         }
           else if(this.name == "Circle2"){
             knit = knit.concat("2");
         }
         else if(this.name == "Circle3"){
             knit = knit.concat("3");
         }
        }
      }
      append(this.pattern, knit);
     
     
    }
}
Pattern.prototype.create = function(name){
    var pat ="";
    switch(name){
       case "none":{ //no difference in thickness
        this.patternKnit(this.rows, this.stitches);
        break;
      }
      case "Knit":{
        this.patternKnit(this.rows, this.stitches);
        break;
      }
      case "Purl":{
        this.patternPurl(this.rows, this.stitches);
        break;
      }
      case "RKnitRPurl":{
        //rij recht, rij averecht
        this.patternRKnitRPurl(this.rows, this.stitches);
        break;
      }
      case "KKPP":{
        //2 recht, 2 averecht
        this.patternKKPP(this.rows, this.stitches);
        break;
      }
      case "KP":{
        //Gerstekorrel
        this.patternKP(this.rows, this.stitches);
        break;
      }
       case "Triangle":{
        //minderen
        this.createPatternTriangle(this.rows, this.stitches);
        break;
      }
      
    }
    return this.pattern;
}
Pattern.prototype.createPatternTriangle = function(rows, stitches){
  this.rows =rows;
  var s = stitches;
  
  append(this.pattern, this.startR(s));
  for(var r = 0; r < this.rows; r++){
    append(this.pattern, this.rowR(r, s));
    s -= 1;
  }
  //append(this.pattern, this.endR(this.rows, this.stitches));
}
Pattern.prototype.patternKnit = function(){
    append(this.pattern, this.startR(this.stitches));
    for(var r = 0; r < this.rows; r++){
      append(this.pattern, this.rowR(r, this.stitches));
    }
    append(this.pattern, this.endR(this.rows, this.stitches));
}
Pattern.prototype.patternPurl= function(){
    append(this.pattern, this.startA(this.stitches));
    for(var r = 0 ; r < this.rows; r++){
      append(this.pattern, this.rowA(r, this.stitches));
    }
    append(this.pattern, this.endA(this.rows, this.stitches));
}
Pattern.prototype.patternRKnitRPurl= function(){
    append(this.pattern, this.startA(this.stitches));
    for(var r = 0 ; r < this.rows-1; r+=2){
      append(this.pattern, this.rowR(r, this.stitches));
      append(this.pattern, this.rowA(r+1, this.stitches));
    }
    if((this.rows % 2) ==1){
      append(this.pattern, this.rowR(this.rows-1, this.stitches));
    }
    append(this.pattern, this.endA(this.rows, this.stitches));
}
Pattern.prototype.patternKKPP= function(){
    append(this.pattern, this.startA(this.stitches));
    for(var r = 0 ; r < this.rows; r++){
      append(this.pattern, this.rowKKPP(r, this.stitches));
    }
    append(this.pattern, this.endA(this.rows, this.stitches));
}
Pattern.prototype.patternKP= function(){
    append(this.pattern, this.startA(this.stitches));
    for(var r = 0 ; r < this.rows; r++){
      append(this.pattern, this.rowKP(r, this.stitches));
    }
    append(this.pattern, this.endA(this.rows, this.stitches));
}
Pattern.prototype.startR = function(){
    var opzet ="A";
    for(var i = 1; i < this.stitches-1; i++){
      opzet = opzet.concat("B");
    }
    opzet = opzet.concat("C");
    println(opzet);
    return opzet;
  }

Pattern.prototype.rowR = function( row,  stitches){
    var knit ="";
    if(row % 2 == 0){
      knit =knit.concat("K");
      for(var i = 1; i < stitches; i++){
        knit = knit.concat("L");
      }
    }
    else{
      for(var i = 0; i < stitches-1; i++){
        knit = knit.concat("R");
      }
      knit =knit.concat("S");
    }
    println(knit);
    return knit;
  }
  Pattern.prototype.rowKKPP = function( row,  stitches){
      var knit ="";
      if(row % 2 == 0){
        knit =knit.concat("K");
        for(var i = 1; i < stitches; i++){
          if(i%4 <=1){
            knit = knit.concat("L");
          }
          else{
            knit = knit.concat("l");
          }
        }
      }
      else{
        for(var i = 0; i < stitches-1; i++){
          if(i%4 <=1){
            knit = knit.concat("R");
          }
          else{
            knit = knit.concat("r");
          }
        }
        knit =knit.concat("S");
      }
      println(knit);
      return knit;
    }
Pattern.prototype.rowKP = function( row,  stitches){
        var knit ="";
        if(row % 2 == 0){
          knit =knit.concat("K");
          for(var i = 1; i < stitches; i++){
            if(i%2 ==0){
              knit = knit.concat("L");
            }
            else{
              knit = knit.concat("l");
            }
          }
        }
        else{
          for(var i = 0; i < stitches-1; i++){
            if(i%2 ==1){
              knit = knit.concat("R");
            }
            else{
              knit = knit.concat("r");
            }
          }
          knit =knit.concat("S");
        }
        println(knit);
        return knit;
      }
 Pattern.prototype.endR = function( row,  stitches){
    var af ="";
    if(row % 2 == 1){
      af =af.concat("X");
      for(var i = 0; i < stitches-1; i++){
        af = af.concat("Y");
      }
      af = af.concat("Z");
    }
    else{

      af =af.concat("U");
      for(var i = 0; i < stitches-1; i++){
        af = af.concat("V");
      }
      af = af.concat("W");
    }

    println(af);
    return af;
  }



  Pattern.prototype.startA = function( stitches){
    var opzet ="a";
    for(var i = 1; i < stitches-1; i++){
      opzet = opzet.concat("b");
    }
    opzet = opzet.concat("c");
    println(opzet);
    return opzet;
  }

  Pattern.prototype.rowA = function( row,  stitches){
    var knit ="";
    if(row % 2 == 0){
      knit =knit.concat("k");
      for(var i = 1; i < stitches; i++){
        knit = knit.concat("l");
      }
    }
    else{
      for(var i = 0; i < stitches-1; i++){
        knit = knit.concat("r");
      }
      knit =knit.concat("s");
    }
    println(knit);
    return knit;
  }

  Pattern.prototype.endA = function( row,  stitches){
    var af ="";
    if(row % 2 == 1){
      af =af.concat("x");
      for(var i = 0; i < stitches-1; i++){
        af = af.concat("y");
      }
      af = af.concat("z");
    }
    else{

      af =af.concat("u");
      for(var i = 0; i < stitches-1; i++){
        af = af.concat("v");
      }
      af = af.concat("w");
    }

    println(af);
    return af;
  }
