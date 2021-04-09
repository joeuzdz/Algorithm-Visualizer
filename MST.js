let validEdge = true;

class MST {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    update() {
        if (this.vertices.length != floor(slider.value() / 1)) {
            this.vertices = [];
            for (let i = 0; i < floor(slider.value() / 1); i++) {
                let xPos = random(0, 1);
                let yPos = random(0, 1);
                let vertex = new MSTvertex(xPos, yPos);
                this.vertices.push(vertex);
            }
        }
    }

    show() {
        let screenPercentage = 0.8;
        let mstWidth = screenPercentage * displayWidth;
        let mstHeight = 0.5 * height;
        let origin = createVector((displayWidth - mstWidth) / 2 + panelWidth, 0.25 * height);

        for (let edge of this.edges) {
            edge.show();
        }
        
        for (let vertex of this.vertices) {
            vertex.pos.x = origin.x + (mstWidth * vertex.x);
            vertex.pos.y = origin.y + (mstHeight * vertex.y);
            vertex.show();
        }
    }

    prims() {
        let unreached = [];
        let reached = [];
        let originVertex;
        let shortestDist = 1;
        for (let vertex of this.vertices) {
            unreached.push(vertex);
            if (vertex.x + vertex.y < shortestDist) {
                shortestDist = vertex.x + vertex.y;
                originVertex = vertex;
            }
        }

        reached.push(originVertex);
        let idx = unreached.indexOf(originVertex);
        unreached.splice(idx, 1);

        while(unreached.length != 0) {
            shortestDist = Infinity;
            let rIdx = 0;
            let uIdx = 0;

            for (let i = 0; i < reached.length; i++) {
                for (let j = 0; j < unreached.length; j++) {
                    let distance = dist(reached[i].pos.x, reached[i].pos.y, unreached[j].pos.x, unreached[j].pos.y);
                    if (distance < shortestDist) {
                        shortestDist = distance;
                        rIdx = i;
                        uIdx = j;
                    }
                }
            }

            let edge = new MSTedge(unreached[uIdx], reached[rIdx]);
            this.edges.push(edge);

            reached.push(unreached[uIdx]);
            unreached.splice(uIdx, 1);


            let numFrames = map(slider.value(), slider.elt.min, slider.elt.max, 10, 1);
            for (let i = 0; i < numFrames; i++) {
                animationQueue.push(this.getEdgesAndVertices());
            }

        }

    }

    kruskals() {
        let allEdges = this.getAllEdgesSorted();

        while(this.edges.length != this.vertices.length - 1) {
            
            let shortestEdge = allEdges.shift();
            let v1 = shortestEdge.v1;
            let v2 = shortestEdge.v2;
            this.checkIfValidEdge(v1,v2);
            if (validEdge) {
                this.edges.push(shortestEdge);
                v1.neighbors.push(v2);
                v2.neighbors.push(v1);

                let numFrames = map(slider.value(), slider.elt.min, slider.elt.max, 10, 1);
                for (let i = 0; i < numFrames; i++) {
                    animationQueue.push(this.getEdgesAndVertices());
                }
            }
        }
    }

    checkIfValidEdge(v1, v2) {
        validEdge = true;

        if (v1.neighbors.length == 0 || v2.neighbors.length == 0) {
            return;
        }

        this.cycleRecursionHelper(v1, v2);
    }


    cycleRecursionHelper(v1, v2, visited = []) {
        visited.push(v1);
        
        if (!validEdge) {
            return;
        }
        if (v1 == v2) {
            validEdge = false;
        } else {
            for (let i = 0; i < v1.neighbors.length; i++) {
                if (!visited.includes(v1.neighbors[i])) {
                    this.cycleRecursionHelper(v1.neighbors[i], v2, visited);
                }
            }
        }
    }

    getEdgesAndVertices() {
        let array = [];
        for (let e of this.edges) {
            array.push(e);
        }
        for (let v of this.vertices) {
            array.push(v);
        }
        return array;
    }

    getAllEdgesSorted() {
        let edges = [];

        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = i + 1; j < this.vertices.length; j++) {
                let edge = new MSTedge(this.vertices[i], this.vertices[j]);
                edges.push(edge);
            }
        }

        for (let i = 1; i < edges.length; i++) {
            let current = edges[i];
            let j = i-1; 
            while ((j > -1) && (current.distance < edges[j].distance)) {
                edges[j+1] = edges[j];
                j--;
            }
            edges[j+1] = current;
        }

        return edges;
    }
}