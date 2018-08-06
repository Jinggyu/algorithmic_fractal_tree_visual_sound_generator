function Branch(parent,pos,dir){
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = 5;
  this.h = 0;
  this.h1=0;
  
  this.reset = function(){
    this.dir = this.origDir.copy();
    this.count = 0;
  }
  
  this.next = function(){
    //var nextDirr = p5.Vector.mult(this.dir,this.len);
    //var nextPoss = p5.Vector.add(this.pos, nextDirr); // grows faster
    var nextPos = p5.Vector.add(this.pos, this.dir);  // grows very slow
    var nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }
  

  this.show = function(){
    if (parent !== null){
    // drawing the jittering cell wall
      var a = this.pos.x;
      var b = this.pos.y;
      var c = this.parent.pos.x;
      var d = this.parent.pos.y;
      // creating jitter
      a += random(-19,20);
      b += random(-20,20);
      c += random(-5,5);
      d += random(-5,5);
    this.wall = function(){
      stroke(this.h,300,220,2);
      this.h += 1;
      if(this.h > 400){
        this.h = 1;
      }
      strokeWeight(150);
      line (a, b, c, d);
         }    
    this.inner = function(){ 
    // drawing tree branches  
      stroke(this.h1,255,255,25);
      this.h1 += 1;
      if(this.h1 > 255){
        this.h1 = 1;
      }
      strokeWeight(8);
      line (this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }
    
    this.wall();
    this.inner();
    } 

  } 
}