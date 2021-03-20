class MSTedge {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
        this.distance = dist(v1.x, v1.y, v2.x, v2.y);
    }

    show() {
        push();
        stroke('#ffff76');
        strokeWeight(3);
        line(this.v1.pos.x, this.v1.pos.y, this.v2.pos.x, this.v2.pos.y);
        pop();
    }
}