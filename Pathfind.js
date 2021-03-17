class Pathfind {
    constructor() {
        this.grid = [];
        this.nodeSize;
        this.origin;
        this.width;
        this.height;
    }

    updateGrid() {
        if (this.grid.length != slider.value() - 2) {
            this.grid = [];
            for (let i = 0; i < slider.value() - 2; i++) {
                let newCol = [];
                let colLength = floor(slider.value() / 2);
                if (colLength % 2 == 0) colLength++;
                for (let j = 0; j < colLength; j++) {
                    let newNode = new PathfindingNode(i, j);
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
        this.setCellNeighbors();
        
        let unvisited = [];
        let visited = [];
        let currentNode, testNode, newDist;

        unvisited = this.get1DGrid();
        currentNode = this.getStartNode();
        currentNode.dk_tentDist = 0;
        
        let nextFrame;

        let counter = 0;
        while (!currentNode.isEndNode) {
            nextFrame = this.get1DGridClone();

            for (let i = 0; i < currentNode.neighbors.length; i++) {
                testNode = currentNode.neighbors[i];
                if (unvisited.includes(testNode)) {
                    newDist = currentNode.dk_tentDist + 1;
                    if (newDist < testNode.dk_tentDist) {
                        testNode.dk_tentDist = newDist;
                        testNode.dk_path = [];
                        arrayCopy(currentNode.dk_path, testNode.dk_path);
                        testNode.dk_path.push(testNode);
                    }
                }
                // nextFrame.push(testNode.clone());
            }
            visited.push(currentNode);
            let idx = unvisited.indexOf(currentNode);
            unvisited.splice(idx, 1);
            let low = Infinity;
            let savedIdx;
            for (let i = 0; i < unvisited.length; i++) {
                if (unvisited[i].dk_tentDist <= low) {
                    low = unvisited[i].dk_tentDist;
                    savedIdx = i;
                }
            }
            currentNode = unvisited[savedIdx];
            currentNode.hasBeenSearched = true;
            
            let countTo = floor(map(slider.value(), slider.elt.min, slider.elt.max, 1, 5));
            if (counter % countTo == 0) {
                let numFrames = 1;
                for (let i = 0; i < numFrames; i++) {
                    animationQueue.push(nextFrame);
                }
            }
            counter++;

            if (currentNode.isEndNode) {
                animationQueue.push(nextFrame);
            }
        }

        for (let i = 0; i < currentNode.dk_path.length; i++) {
            nextFrame = this.get1DGridClone();
            currentNode.dk_path[i].isFinalPath = true;
            nextFrame.push(currentNode.dk_path[i]);
            animationQueue.push(nextFrame);
        }
    }

    astar() {
        this.setCellNeighbors(); 
        this.setFGHValues();
       
        let currentNode;
        let openList = [];
        let closedList = [];
        
        openList.push(this.getStartNode());

        let nextFrame;
        let counter = 0;
        while(openList.length != 0) {

            nextFrame = this.get1DGridClone();

            let lowIdx = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].as_f < openList[lowIdx].as_f) {
                    lowIdx = i;
                }
            }

            currentNode = openList[lowIdx];
            currentNode.hasBeenSearched = true;

            if (currentNode.isEndNode) {
                animationQueue.push(nextFrame);
                let curr = currentNode;
                let path = [];
                while(curr.as_parent) {
                    path.push(curr);
                    curr = curr.as_parent;
                }
                
                for (let i = path.length - 1; i >= 0; i--) {
                    nextFrame = this.get1DGridClone();
                    path[i].isFinalPath = true;
                    nextFrame.push(path[i]);
                    animationQueue.push(nextFrame);
                }

                return;
            }
            


            closedList.push(currentNode);
            // currentNode.hasBeenSearched = true;
            let idx = openList.indexOf(currentNode);
            openList.splice(idx, 1);
            // console.log(currentNode);
            for (let i = 0; i < currentNode.neighbors.length; i++) {
                let testNode = currentNode.neighbors[i];
                nextFrame.push(testNode.clone());
                if (closedList.includes(testNode)) {
                    continue;
                }

                let gScore = currentNode.as_g + 1;
                let gScoreIsBest = false;

                if (!openList.includes(testNode)) {
                    gScoreIsBest = true;
                    openList.push(testNode);
                } else if (gScore < testNode.as_g) {
                    gScoreIsBest = true;
                }

                if (gScoreIsBest) {
                    testNode.as_parent = currentNode;
                    testNode.as_g = gScore;
                    testNode.as_f = testNode.as_g + testNode.as_h;
                }
            }

            let countTo = floor(map(slider.value(), slider.elt.min, slider.elt.max, 1, 5));
            if (counter % countTo == 0) {
                let numFrames = 1;
                for (let i = 0; i < numFrames; i++) {
                    animationQueue.push(nextFrame);
                }
            }
            counter++;

        }
    }

    setFGHValues() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                let node = this.grid[i][j];
                if (node.isStartNode) {
                    node.as_g = 0;
                } else {
                    node.as_g = Infinity;
                }
                node.as_h = this.manhattan(node, this.getEndNode());
                node.as_f = node.as_g + node.as_h;
            }
        }
    }

    manhattan(nodeA, nodeB) {
        let d1 = abs(nodeA.x - nodeB.x);
        let d2 = abs(nodeA.y - nodeB.y);
        return d1 + d2;
    }

    setCellNeighbors() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (i != 0 && !this.grid[i - 1][j].isWall) {
                    this.grid[i][j].neighbors.push(this.grid[i - 1][j]);
                }
                if (i != this.grid.length - 1 && !this.grid[i + 1][j].isWall) {
                    this.grid[i][j].neighbors.push(this.grid[i + 1][j]);
                }
                if (j != 0 && !this.grid[i][j - 1].isWall) {
                    this.grid[i][j].neighbors.push(this.grid[i][j - 1]);
                }
                if (j != this.grid[0].length - 1 && !this.grid[i][j + 1].isWall) {
                    this.grid[i][j].neighbors.push(this.grid[i][j + 1]);
                }
            }
        }
    }

    get1DGrid() {
        let ret1DArr = [];
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                ret1DArr.push(this.grid[i][j]);
            }
        }
        return ret1DArr;
    }
    get1DGridClone() {
        let ret1DArrClone = [];
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                ret1DArrClone.push(this.grid[i][j].clone());
            }
        }
        return ret1DArrClone;
    }

    getStartNode() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j].isStartNode) {
                    return this.grid[i][j];
                }
            }
        }
    }

    getEndNode() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j].isEndNode) {
                    return this.grid[i][j];
                }
            }
        }
    }
}

