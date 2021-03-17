
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
let playButton, playButtonGraphic, playButtonMOGraphic, playButtonDisGraphic;
let pauseButtonGraphic, pauseButtonMOGraphic;
let resetButton, resetButtonGraphic, resetButtonMOGraphic;

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
                    ASTAR: 9,
                    INSERTIONSORT: 10,
                    SELECTIONSORT: 11,
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
let slider;
const sliderMin           = 19;
const sliderMax           = 101;
const sliderDefaultValue  = 59;
const sliderStepInterval  = 2;
let globalID = 0;

let pathfind;

let isLoading = false;
let triggerCounter = 0;

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
    setupSlider();
    
}

//RUNS REPEATEDLY
function draw() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
    background(backgroundColor);
    // displayGridLines();
    
    displayPanel();
    displayScreenDimensions();

    if (currentMode != Mode.DEFAULT) {
        displayControlButtons();
        updateSlider();
    }


    checkMousePointer();

    if (animationQueue.length != 0) { //then display animation queue frame by frame
        let nextFrame = animationQueue[animationIterator];
        //IGNORING SWAPPING ANIMATION
        //FIX
        // repositionSortingFrame(nextFrame);
       
        if (currentMode == Mode.SORT) {
            for (let bar of nextFrame) {
                bar.show();
            }
        } else if (currentMode == Mode.PATHFIND) {
            for (let node of nextFrame) {
                node.show(pathfind.origin.x, pathfind.origin.y, pathfind.nodeSize);
            }
        }
        

        if (!animationIsPaused) {
            animationIterator++;
        }

        if (animationQueue.length <= animationIterator) {
            resetAnimationQueue();
        }

    } else { //check currentMode to see what to display 

        if (currentMode == Mode.SORT) {
            if (slider.value() != sortCollection.items.length) {
                sortCollection.updateBars();
            }
            sortCollection.resetBarPositions();
            sortCollection.show();
            
        } else if (currentMode == Mode.PATHFIND) {
            pathfind.updateGrid();
            pathfind.showGrid();
        }
        

    }

    if (isLoading) {
        if (currentMode == Mode.PATHFIND && animationQueue.length == 0) {
            fill(200);
            textSize(16);
            text('Finding a path...', panelWidth + 20, height - 20);
        }
        triggerCounter++;
        if (triggerCounter > 1) {
            console.log('what');
            playAlgorithm();
            isLoading = false;
            playButton.isEnabled = true;
        }
    }
    
}

//define the globals in setup()
function defineGlobals() {
    backgroundColor = color('#24476c');
    font = 'monospace';

    panelWidth = 220;
    updateDimensions();
    
    currentAlgo = Algo.DEFAULT;
    currentMode = Mode.DEFAULT;

    // sortCollection = new Sort();
}

//create the algorithm buttons on the panel
function setupAlgoButtons() {
    let baseYPos = 200;
    let spacing = algoButtonHeight;
    let i = 0;

    let bubbleSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.BUBBLESORT);
    let insertionSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.INSERTIONSORT);
    let selectionSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.SELECTIONSORT);
    
    i++; //spacing
    let dijkstrasButton = new AlgoButton(baseYPos + spacing*i++, Algo.DIJKSTRAS);
    let aStarButton = new AlgoButton(baseYPos + spacing*i++, Algo.ASTAR);

    algoButtons.push(bubbleSortButton);
    algoButtons.push(insertionSortButton);
    algoButtons.push(selectionSortButton);
    algoButtons.push(dijkstrasButton);
    algoButtons.push(aStarButton);
}

function setupControlButtons() {
    playButton = new ControlButton(ControlType.PLAY, 70, 50, true);
    // pauseButton = new ControlButton(ControlType.PAUSE, 50, 50, false);
    resetButton = new ControlButton(ControlType.RESET, 50, 50, true);

    controlButtons.push(playButton);
    // controlButtons.push(pauseButton);
    controlButtons.push(resetButton);

}

function updateControlButtonPositions() {
    playButton.xPos = midlineX - 27;
    playButton.yPos = height - 50;
    resetButton.xPos = midlineX + 38;
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
    fill('#1e3a59');
    stroke(50, 30);
    strokeWeight(5);
    rectMode(CORNER)
    rect(0, 0, panelWidth, height);
    pop();
}

//displays the title in the panel
function displayTitle() {
    push();
    textAlign(CENTER, TOP);
    noStroke();
    fill(220);
    textSize(30);
    text('Algorithm', panelWidth/2, 15);
    textSize(28);
    text('Visualizer', panelWidth/2, 50);
    stroke(150);
    line(35, 90, panelWidth - 35, 90);
    line(40, 94, panelWidth - 40, 94);
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
    noStroke();
    fill(255, 110);
    rect(midlineX, height - 50, 65, 45);
    pop();
    
    for (let button of controlButtons) {
        button.show();
    }
}

//displays screen dimensions in lower right corner of screen
function displayScreenDimensions() {
    push();
    fill(200);
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
function setupSlider() {
    
    slider = createSlider(sliderMin, 
                                    sliderMax, 
                                    sliderDefaultValue, 
                                    sliderStepInterval
                                );
    //display out of screen until a sorting function is called which will
    //  reposition it appropriately                           
    slider.position(-100, -100);
    slider.style("width", "100px");
}

function updateSlider() {
    let xPos = midlineX - slider.width/2;
    let yPos = height - 110;
    slider.position(xPos, yPos);

    push();
    noStroke();
    fill(255, 110);
    rect(midlineX, height - 100, 125, 30, 20);
    pop();
}

// function repositionSortingFrame(frame) {
//     reorderFrame(frame);
//     let minPercentage = 0.4;
//     let maxPercentage = 0.8;
//     let screenPercentage = map(frame.length, numBarsSlider.elt.min, numBarsSlider.elt.max, minPercentage, maxPercentage);
    
//     let sortCollectionWidth = displayWidth * screenPercentage;
//     sortCollectionWidth -= sortCollection.barSpacing * frame.length;
//     let barWidth = sortCollectionWidth / frame.length;
    
//     let midIdx = floor(frame.length/2);
//     let midBar = frame[midIdx];
//     midBar.xPos = midlineX;

//     midBar.yPos = height/2;
//     midBar.width = barWidth;

//     for (let i = 0; i <= midIdx; i++) {
//         //calculate leftBar position
//         let leftBar = frame[midIdx - i];
//         leftBar.xPos = midlineX - i*(barWidth + sortCollection.barSpacing);
//         leftBar.yPos = height/2;
//         leftBar.width = barWidth;
//         //calculate rightBar position
//         let rightBar = frame[midIdx + i];
//         rightBar.xPos = midlineX + i*(barWidth + sortCollection.barSpacing);
//         rightBar.yPos = height/2;
//         rightBar.width = barWidth;
//     }

//     return frame;
// }

// function reorderFrame(frame) {
//     let swap;
//     let n = frame.length-1;
//     do {
//         swap = false;
//         for (let i = 0; i < n; i++)
//         {
//             if (frame[i].xPos > frame[i+1].xPos){
//                 let temp = frame[i];
//                 frame[i] = frame[i+1];
//                 frame[i+1] = temp;
//                 swap = true;
//             }
//         }
//         n--;
//     } while (swap);
// }



