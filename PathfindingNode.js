class PathfindingNode {
    constructor(x, y, pos=0, size=0, isWall=false, hasBeenSearched=false, isStartNode=false, isEndNode=false, isFinalPath=false) {
        this.x = x;
        this.y = y;
        this.pos = pos;
        this.size = size;
        this.isWall = isWall;
        this.hasBeenSearched = hasBeenSearched;
        this.isStartNode = isStartNode;
        this.isEndNode = isEndNode;
        this.isFinalPath = isFinalPath;
        this.neighbors = [];
        //dijkstras helper variables
        this.dk_tentDist = Infinity;
        this.dk_path = [];
    }

    show(originX, originY, nodeSize) {
        this.size = nodeSize;
        this.pos = createVector(originX + this.x * nodeSize, originY + this.y * nodeSize);

        
        push();
        rectMode(CORNER);
        translate(originX, originY);

        
        if (this.hasBeenSearched) {
            fill(245);
            stroke(245);
        } else if (this.isWall) {
            strokeWeight(0.5);
            fill(180);
            stroke(180);
        }  else {
            fill(220);
            let sWeight = map(slider.value(), slider.elt.min, slider.elt.max, 1, 0.5); 
            strokeWeight(sWeight);
            stroke('#add8e6');
            stroke(220);
            noStroke();
            noFill();
        }

        if (this.isFinalPath) {
            fill(70);
            stroke(70);
            // let c = floor(random(60,80));
            // fill(c);
            // stroke(c);
            // fill(252, 172, 163, 230);
            // stroke(252, 172, 163, 230);
            // fill(251, 150, 138, 230);
            // stroke(251, 150, 138, 230);
        }
        
        if (this.isStartNode) {
            fill('green');
            noStroke();
        } else if (this.isEndNode) {
            fill('red');
            noStroke();
        }

        //round 4 corners
        if (this.x == 0 && this.y == 0) rect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize, 10, 0, 0, 0);
        else if (this.x == pathfind.grid.length - 1 && this.y == 0) rect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize, 0, 10, 0, 0);
        else if (this.x == pathfind.grid.length - 1 && this.y == pathfind.grid[0].length - 1) rect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize, 0, 0, 10, 0);
        else if (this.x == 0 && this.y == pathfind.grid[0].length - 1) rect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize, 0, 0, 0, 10);
        else rect(this.x * nodeSize, this.y * nodeSize, nodeSize, nodeSize);
        pop();
    }

    rollover() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.size) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.size);
    }

    clone() {
        return new PathfindingNode(this.x, this.y, this.pos, this.size, this.isWall, this.hasBeenSearched, this.isStartNode, this.isEndNode, this.isFinalPath);
    }
}