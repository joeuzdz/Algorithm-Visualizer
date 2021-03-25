class TitleBar {
    constructor(yPos, type) {
        this.yPos = yPos;
        this.type = type;
    }

    show() {
        let string;
        switch (this.type) {
            case Mode.SORT:
                string = 'SORTING';
                break;
            case Mode.PATHFIND:
                string = 'PATHFINDING';
                break;
            case Mode.MST:
                string = 'MIN. SPANNING TREE';
                break;
            default:
                string = '???';
                break;

        }

        push();
        fill(220);
        noStroke();
        rectMode(CORNER);
        rect(2, this.yPos + 3, panelWidth - 5, algoButtonHeight - 6);
        fill(10);
        textAlign(CENTER);
        textSize(16);
        text(string, panelWidth / 2, this.yPos + 20);
        pop();
    }
}