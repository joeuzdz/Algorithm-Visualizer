class MSTvertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pos = createVector();
        //kruskals
        this.neighbors = [];
        this.id = globalID++;
    }

    show() {
        push();
        fill(200);
        stroke(200);
        strokeWeight(7);
        point(this.pos.x, this.pos.y);
        pop();
    }
}