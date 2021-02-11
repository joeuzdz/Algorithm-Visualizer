//scratch button class for butttons on panel
class Button {
    constructor(yPos, type) {
        this.yPos = yPos;
        this.type = type;
        this.isSelected = false;
    }

    //show the button with necessary highlighting
    show() {
        push();
        noStroke();
        
        if (this.rollover()) {
            fill(170);
            rect(3, this.yPos, panelWidth - 8, buttonHeight, 5);
        }
        if (this.isSelected) {
            fill(190);
            rect(3, this.yPos, panelWidth - 8, buttonHeight, 5);
        }
        fill(30);
        textSize(20); 
        let string;
        switch (this.type) {
            case Algo.BUBBLESORT:
                string = 'Bubble Sort';
                break;
            case Algo.MERGESORT:
                string = 'Merge Sort';
                break;
            case Algo.QUICKSORT:
                string = 'Quick Sort';
                break;
            default:
                string = '???';
                break;
        }
        text(string, 40, this.yPos + 20);
    }

    //returns true if mouse is on the button
    rollover() {
        return ((mouseX > 0) && (mouseX < panelWidth) && (mouseY >= this.yPos) && (mouseY < this.yPos + buttonHeight));
    }

    //gets called button is clicked
    clicked() {
        if (this.isSelected) {
            //do nothing if already selected
        } else {
            this.isSelected = true;
            //deselect any other selected button
            for (let button of algoButtons) {
                if (button.type != this.type) {
                    button.isSelected = false;
                }
            }
            //call necessary function
            switch (this.type) {
                case Algo.BUBBLESORT:
                    console.log('bubblesort');
                    break;
                case Algo.MERGESORT:
                    console.log('mergesort');
                    break;
                case Algo.QUICKSORT:
                    console.log('quicksort');
                    break;
            }
        }
    }
}