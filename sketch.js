var compose;
var max_dist = 100;
var min_dist = 10;
var freqstart;


function setup() {
  createCanvas(screen.width, screen.height);
  colorMode(RGB,100,500,10,255);
  compose = new Compose();
  // start frequency
  freqstart = random(50,1000);
  compose.toStart(freqstart);
}


function draw() {
  background(0);
  compose.tree()
  compose.composeSound();
  }


function mousePressed() {
  
}


