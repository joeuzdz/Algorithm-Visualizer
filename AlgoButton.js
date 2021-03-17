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
        noStroke();
        fill(200);
        if (this.isSelected) {
            fill(190);
            fill(255, 150);
            rect(2, this.yPos, panelWidth - 5, algoButtonHeight);
            fill(10);
        } else if (this.rollover()) {
            fill(170);
            fill(255, 110);
            rect(2, this.yPos, panelWidth - 5, algoButtonHeight);
            fill(10);
        }
        
        
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
            case Algo.DIJKSTRAS:
                string = 'Dijkstras';
                break;
            case Algo.ASTAR:
                string = 'A* (Manhattan)';
                break;
            default:
                string = '???';
                break;
        }
        textSize(18); 
        text(string, 30, this.yPos + 20);
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
            case Algo.DIJKSTRAS:
                currentAlgo = Algo.DIJKSTRAS;
                setupPathfind();
                console.log('dijkstras');
                break;
            case Algo.ASTAR:
                currentAlgo = Algo.ASTAR;
                setupPathfind();
                console.log('astar');
                break;

        }
        
    }
}

function setupSort() {
    
    resetAnimationQueue();
    playButton.isEnabled = true;
    playButton.isPaused = true;
    slider.removeAttribute('disabled');
    sortCollection = new Sort();
    sortCollection.updateBars();
    
    updateSlider();
    if (currentMode != Mode.SORT) {
        let sliderValue = slider.value();
        let newValue = map(sliderValue, sliderMin, 59, sliderMin, sliderMax);
        slider.elt.step = 2;
        slider.elt.max = sliderMax;
        slider.elt.value = newValue;
    }
    currentMode = Mode.SORT;
}

function setupPathfind() {
    
    resetAnimationQueue();
    playButton.isEnabled = true;
    playButton.isPaused = true;
    slider.removeAttribute('disabled');
    pathfind = new Pathfind();
    pathfind.updateGrid();

    updateSlider();
    if (currentMode != Mode.PATHFIND) {
        let sliderValue = slider.value();
        let newValue = map(sliderValue, sliderMin, sliderMax, sliderMin, 59);
        slider.elt.step = 4;
        slider.elt.max = 59;
        slider.elt.value = newValue;
    }
    currentMode = Mode.PATHFIND;
}

function resetAnimationQueue() {
    animationQueue = [];
    animationIterator = 0;
    animationIsPaused = false;
    playButton.isEnabled = false;
    playButton.isPaused = true;
}