//scratch button class for butttons on panel
class AlgoButton {
    constructor(yPos, type) {
        this.yPos = yPos;
        this.type = type;
        this.isSelected = false;
    }

    //show the button with necessary highlighting
    show() {
        push();
        rectMode(CORNER);
        stroke(0);
        fill(150);
        if (this.rollover()) {
            fill(170);
        }
        if (this.isSelected) {
            fill(190);
        }
        rect(3, this.yPos, panelWidth - 8, algoButtonHeight, 5);
        noStroke();
        fill(30);
        textSize(18); 
        let string;
        switch (this.type) {
            case Algo.BUBBLESORT:
                string = 'Bubble Sort';
                break;
            case Algo.INSERTIONSORT:
                string = 'Insertion Sort';
                break;
            case Algo.SELECTIONSORT:
                string = 'Selection Sort';
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
        pop();
    }

    //returns true if mouse is on the button
    rollover() {
        return ((mouseX > 0) && (mouseX < panelWidth) && (mouseY >= this.yPos) && (mouseY < this.yPos + algoButtonHeight));
    }

    //gets called when button is clicked
    clicked() {
    
        //deselect all other buttons
        for (let button of algoButtons) { button.isSelected = false; }
        //select this button
        this.isSelected = true;

        //call necessary function
        switch (this.type) {
            case Algo.BUBBLESORT:
                currentAlgo = Algo.BUBBLESORT;
                setupSort();
                console.log('bubblesort');
                break;
            case Algo.INSERTIONSORT:
                currentAlgo = Algo.INSERTIONSORT;
                setupSort();
                console.log('insertion sort');
                break;
            case Algo.SELECTIONSORT:
                currentAlgo = Algo.SELECTIONSORT;
                setupSort();
                console.log('selection sort');
                break;
            case Algo.MERGESORT:
                currentAlgo = Algo.MERGESORT;
                setupSort();
                console.log('mergesort');
                break;
            case Algo.QUICKSORT:
                // setupSort();
                console.log('quicksort');
                break;
        }
        
    }
}

function setupSort() {
    currentMode = Mode.SORT;
    resetAnimationQueue();
    playButton.isEnabled = true;
    playButton.isPaused = true;
    numBarsSlider.removeAttribute('disabled');
    sortCollection = new Sort();
    sortCollection.updateBars();
    
    //call update which will reposition slider appropriately
    updateNumBarsSlider();
}

function resetAnimationQueue() {
    animationQueue = [];
    animationIterator = 0;
    animationIsPaused = false;
    playButton.isEnabled = false;
    playButton.isPaused = true;
}