
//general globals
let backgroundColor;
let font;
let panelWidth;
let displayWidth;
let midlineX;
//const minScreenHeight = 900;

//button globals
let algoButtons = [];
const algoButtonHeight = 30;
//control buttons and their graphics
let controlButtons = [];
let playButton, playButtonEnGraphic, playButtonDisGraphic;
let pauseButton, pauseButtonEnGraphic, pauseButtonDisGraphic;
let resetButton, resetButtonEnGraphic, resetButtonDisGraphic;

let ControlType = Object.freeze({
                    PLAY: 1,
                    PAUSE: 2,
                    RESET: 3
                    })

//mode globals
let currentAlgo;
let currentMode;
//ALGO ENUM
let Algo = Object.freeze({
                    DEFAULT: 1,
                    BUBBLESORT: 2, 
                    MERGESORT: 3,
                    QUICKSORT: 4,
                    LINEARSEARCH: 5, 
                    JUMPSEARCH: 6, 
                    BINARYSEARCH: 7,
                    DIJKSTRAS: 8,
                    ASTAR: 9
                    })
//MODE ENUM
let Mode = Object.freeze({
                    DEFAULT: 1,
                    SORT: 2,
                    SEARCH: 3,
                    PATHFIND: 4,
                    MISC: 5
                    })


//animation queue
let animationQueue = [];
let animationIterator = 0;
let animationIsPaused = false;

//collection globals 
let sortCollection;
let numBarsSlider;
const numBarsSliderMin           = 11;
const numBarsSliderMax           = 101;
const numBarsSliderDefaultValue  = 55;
const numBarsSliderStepInterval  = 2;
let globalID = 0;

//RUNS ONCE  
function setup() {
    createCanvas(windowWidth, windowHeight);
    defineGlobals();
    setupAlgoButtons();
    createControlButtonGraphics();
    setupControlButtons();
    textFont(font);
    rectMode(CENTER);
    imageMode(CENTER);
    setupNumBarsSlider();
    
}

//RUNS REPEATEDLY
function draw() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
    background(backgroundColor);
    //displayGridLines();
    
    displayPanel();
    displayScreenDimensions();

    if (currentMode != Mode.DEFAULT) {
        displayControlButtons();
    }

    checkMousePointer();


    if (animationQueue.length != 0) { //then display animation queue frame by frame

        for (let bar of animationQueue[animationIterator]) {
            bar.show();
        }

        if (!animationIsPaused) {
            animationIterator++;
        }

        if (animationQueue.length <= animationIterator) {
            resetAnimationQueue();
        }

    } else { //check currentMode to see what to display 

        if (currentMode == Mode.SORT) {
            if (numBarsSlider.value() != sortCollection.items.length) {
                sortCollection.updateBars();
            }
            sortCollection.show();
            sortCollection.resetBarPositions();
            updateNumBarsSlider();
        }

    }
    
}

//define the globals in setup()
function defineGlobals() {
    backgroundColor = color(150);
    font = 'monospace';

    panelWidth = 250;
    updateDimensions();
    
    currentAlgo = Algo.DEFAULT;
    currentMode = Mode.DEFAULT;

    sortCollection = new Sort();
}

//create the algorithm buttons on the panel
function setupAlgoButtons() {
    let bubbleSortButton = new AlgoButton(200, Algo.BUBBLESORT);
    let mergeSortButton = new AlgoButton(230, Algo.MERGESORT);
    let quickSortButton = new AlgoButton(260, Algo.QUICKSORT);

    algoButtons.push(bubbleSortButton);
    algoButtons.push(mergeSortButton);
    algoButtons.push(quickSortButton);
}

function setupControlButtons() {
    playButton = new ControlButton(ControlType.PLAY, 70, 50, true);
    pauseButton = new ControlButton(ControlType.PAUSE, 50, 50, false);
    resetButton = new ControlButton(ControlType.RESET, 50, 50, true);

    controlButtons.push(playButton);
    controlButtons.push(pauseButton);
    controlButtons.push(resetButton);

}

function updateControlButtonPositions() {
    playButton.xPos = midlineX;
    playButton.yPos = height - 50;
    pauseButton.xPos = midlineX - 65;
    pauseButton.yPos = height - 50;
    resetButton.xPos = midlineX + 65;
    resetButton.yPos = height - 50;
}

//update dimension-dependent variables
function updateDimensions() {
    displayWidth = width - panelWidth;
    midlineX = displayWidth/2 + panelWidth;
}

//displays panel where algorithms are shown
function displayPanel() {
    displayPanelBackground();
    displayTitle();
    displayAlgoButtons();
}

//displays border of panel
function displayPanelBackground() {
    push();
    fill(125);
    stroke(50, 30);
    strokeWeight(7);
    rectMode(CORNER)
    rect(0, 0, panelWidth, height);
    pop();
}

//displays the title in the panel
function displayTitle() {
    push();
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(40);
    text('Algorithm', panelWidth/2, 15);
    textSize(36);
    text('Visualizer', panelWidth/2, 60);
    pop();
}

function displayAlgoButtons() {
    for (let button of algoButtons) {
        button.show();
    }
}

function displayControlButtons() {
    updateControlButtonPositions();
    
    push();
    stroke(100);
    strokeWeight(2);
    noStroke();
    fill(130);
    rect(midlineX, height - 50, 120, 40);
    pop();
    
    for (let button of controlButtons) {
        button.show();
    }
}

//displays screen dimensions in lower right corner of screen
function displayScreenDimensions() {
    push();
    textSize(16);
    let string = str(width) + ', ' + str(height);
    text(string, width - 100, height - 20);
    pop();
}

//displays a vertical and horizontal line through middle of working canvas
function displayGridLines() {
    push();
    stroke(0);
    strokeWeight(0.2);
    line(panelWidth, height/2, width, height/2);
    line(midlineX, 0, midlineX, height);
    pop();
}

//calls necessary functions when mouse is clicked
function mouseClicked() {
    for (let button of algoButtons) {
        if (button.rollover() && !button.isSelected) {
            button.clicked();
        }
    }
    for (let button of controlButtons) {
        if (button.rollover() && button.isEnabled) {
            button.clicked();
        }
    }
}

//check for mouse over to change cursor
function checkMousePointer() {
    cursor(ARROW);
    for (let button of algoButtons) {
        if (button.rollover() && !button.isSelected) {
            cursor('pointer');
            break;
        } 
    }
    for (let button of controlButtons) {
        if (button.rollover() && button.isEnabled) {
            cursor('pointer');
            break;
        }
    }
}



//sorting functions
function setupNumBarsSlider() {
    
    numBarsSlider = createSlider(numBarsSliderMin, 
                                    numBarsSliderMax, 
                                    numBarsSliderDefaultValue, 
                                    numBarsSliderStepInterval
                                );
    //display out of screen until a sorting function is called which will
    //  reposition it appropriately                           
    numBarsSlider.position(-100, -100);
    numBarsSlider.style("width", "150px");
}

function updateNumBarsSlider() {
    let xPos = midlineX - numBarsSlider.width/2;
    let yPos = height - 110;
    numBarsSlider.position(xPos, yPos);
}


