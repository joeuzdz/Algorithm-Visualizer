class MSTedge {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
        //kruskals helper variable
        this.distance = dist(v1.pos.x, v1.pos.y, v2.pos.x, v2.pos.y);
    }

    show() {
        push();
        stroke('#ffff76');
        strokeWeight(3);
        line(this.v1.pos.x, this.v1.pos.y, this.v2.pos.x, this.v2.pos.y);
        pop();
    }
}