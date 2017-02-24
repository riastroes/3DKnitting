function Row(types){

  this.maxstitches = types.length;
  this.stitches =[];
  this.maxp;
  this.createStitches(types);

}
Row.prototype.createStitches = function(types){
    for(var i = 0; i < types.length; i++){
       append(this.stitches, new Stitch(types.charAt(i)));
     }     
}
