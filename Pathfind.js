class Pathfind {
    constructor() {
        this.grid = [];
        this.nodeSize;
        this.origin;
        this.width;
        this.height;
    }

    updateGrid() {
        if (this.grid.length != slider.value() - 1) {
            this.grid = [];
            for (let i = 0; i < slider.value() - 1; i++) {
                let newCol = [];
                for (let j = 0; j < slider.value() / 2 - 1; j++) {
                    let newNode = new PathfindingNode(i, j);
                    // if (random() < 0.5) newNode.isWall = true;
                    newCol.push(newNode);   
                }
                this.grid.push(newCol);
            }
            this.createMaze();
        }
        this.grid[0][floor(this.grid[0].length/2)].isStartNode = true;
        this.grid[this.grid.length - 1][floor(this.grid[0].length/2)].isEndNode = true;
    }

    showGrid() {
        let minPercentage = 0.5;
        let maxPercentage = 0.8;
        let screenPercentage = map(slider.value(), slider.elt.min, slider.elt.max, minPercentage, maxPercentage);
        screenPercentage = 0.8;

        let pfWidth = displayWidth * screenPercentage;
        // let pfWidth = width * screenPercentage;
        let pfHeight = height * 0.5;

        let nodeSizeX = pfWidth / this.grid.length;
        let nodeSizeY = pfHeight / this.grid[0].length;
        this.nodeSize = min(nodeSizeX, nodeSizeY);
        
        pfWidth = this.nodeSize * this.grid.length;
        pfHeight = this.nodeSize * this.grid[0].length;
        this.width = pfWidth;
        this.height = pfHeight;

        let originX = panelWidth + ((displayWidth - pfWidth) / 2);
        // let originX = ((width - pfWidth) / 2);
        let originY = (height - pfHeight) / 2;
        this.origin = createVector(originX, originY);

        // push();
        // noFill();
        // stroke(180);
        // rect(midlineX, height/2, pfWidth + 6, pfHeight + 6, 20);
        // pop();

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j].show(originX, originY, this.nodeSize);
            }
        }
    }

    inCanvas() {
        return (mouseX > this.origin.x) && (mouseX < this.origin.x + this.width) && (mouseY > this.origin.y) && (mouseY < this.origin.y + this.height);
    }

    createMaze() {
        for (let i = 4; i < this.grid.length - 4; i += 4) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j].isWall = true;
                if (j % 4 == 0) {
                    if (i % 8 == 0) {
                        this.addBranch(this.grid[i][j], i);
                    } else {
                        this.addBranch(this.grid[i][j + 2], i);
                    }
                }
            }
            let walls = [];
            for (let j = 0; j < this.grid[0].length; j++) {
                if (j % 2 == 1) {
                    walls.push(j);
                }
            }
            for (let j = 0; j < max(walls.length/4, 2); j++) {
                try {
                    let k = walls[floor(random() * walls.length)];
                    this.grid[i][k].isWall = false;
                    let idx = walls.indexOf(k);
                    if (idx >= 2 && idx < walls.length - 2) {

                        walls.splice(idx - 2, 4);
                    }
                } catch {
                    //  
                }
            }

            
        }
    }

    addBranch(stemNode, i) {
        try {
            if (i + 4 < this.grid.length - 4 && random() < 0.8) {
                for (let i = 1; i < floor(random(2,4)); i++) {
                    pathfind.grid[stemNode.x+i][stemNode.y].isWall = true;
                }
            }
            if (i != 4 && random() < 0.6) {
                for (let i = 1; i < floor(random(2,4)); i++) {
                    pathfind.grid[stemNode.x-i][stemNode.y].isWall = true;
                }
            }
        } catch {
            //
        }
    }

    dijkstras() {
        
    }
}