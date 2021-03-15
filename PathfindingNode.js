class PathfindingNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pos;
        this.size;
        this.isWall;
        this.isStartNode;
        this.isEndNode;
    }

    show(originX, originY, nodeSize) {
        this.size = nodeSize;
        this.pos = createVector(originX + this.x * nodeSize, originY + this.y * nodeSize);

        
        push();
        rectMode(CORNER);
        translate(originX, originY);
        
        if (this.isWall) {
            fill(30);
            strokeWeight(0.5);
            stroke(30);
            // fill(180);
            // stroke(180);
        } else if (this.isStartNode) {
            fill('green');
            noStroke();
        } else if (this.isEndNode) {
            fill('red');
            noStroke();
        } else {
            fill(220);
            let sWeight = map(slider.value(), slider.elt.min, slider.elt.max, 1, 0.5); 
            strokeWeight(sWeight);
            stroke('#add8e6');
            stroke(220);
            // noStroke();
            // noFill();
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
}