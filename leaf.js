function Leaf(){
  this.h = 0;
  this.pos = createVector(random(width), random(height-100));
  this.reached = false;
  
  this.jitter = function(){
    this.pos.x += random(-1,1);
    this.pos.y += random(-1,1);
  }
  
  this.show = function(){
    fill(0);
    noStroke();
    strokeWeight(10)
    ellipse(this.pos.x, this.pos.y, 1, 1);
    this.jitter();
  }
  
  
}