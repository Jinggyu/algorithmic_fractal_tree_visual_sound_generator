function Tree(){
  this.leaves = [];
  this.branches = [];
  this.reachedleafx; 
  this.reachedleafy;
  this.countleaves;

// randomly fill up the screen with leaves, print the position of the randomly generated leaves
  for (var i = 0; i < 500; i++){
  this.leaves.push(new Leaf());
  }

var pos = createVector(width/2, height);
var dir = createVector(0,-1);
var root = new Branch(null,pos,dir);


// generate branches
this.branches.push(root);

var current = root;
var found = false;
 
while (!found){
   for (var i = 0; i < this.leaves.length; i++){
      var d = p5.Vector.dist(current.pos, this.leaves[i].pos);
      if (d < max_dist){
          found = true;
  }
}

  if (!found){
    var branch = current.next();
    current = branch;
    this.branches.push(current);
    
    
  }
}


this.grow = function(){
  for (var i = 0; i < this.leaves.length; i++){
    var leaf = this.leaves[i];
    var closestBranch = null;
    var record = 10000;
    for (var j = 0; j < this.branches.length; j++){
      var branch = this.branches[j];
      var d = p5.Vector.dist(leaf.pos, branch.pos);
      if (d < min_dist){
        leaf.reached = true;
        closestBranch = null;
        break;
      } else if (d > max_dist){
        
      } else if (closestBranch == null || d < record ){
        closestBranch = branch;
        record = d;
      } 
    }
    if (closestBranch != null){
      var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
      newDir.normalize();
      closestBranch.dir.add(newDir);
      closestBranch.count++;
    }
  }
  for (var i = this.leaves.length-1; i >= 0; i--){
    if (this.leaves[i].reached){
      this.leaves.splice(i,1);
      this.countleaves = this.leaves.length;
      // find out the reached point's position and sent it to makenotes
        if (this.leaves[i]){
        this.reachedleafx = this.leaves[i].pos.x;
        this.reachedleafy = this.leaves[i].pos.y;
        } else {this.reachedleafx = null; this.reachedleafy = null;};
    }
  }
  
  for  (var i = this.branches.length-1; i >= 0; i--){
    var branch = this.branches[i];
    if (branch.count > 0){
      branch.dir.div(branch.count + 1);
      this.branches.push(branch.next());
    }
    branch.reset();
  }
  
}


this.show = function(){
  for (var i = 0; i < this.leaves.length; i++){
    this.leaves[i].show();
  }
  for (var i = 0; i < this.branches.length; i++){
    this.branches[i].show();
  }
}
}


