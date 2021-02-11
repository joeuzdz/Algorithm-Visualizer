let backgroundColor;
let font;
let panelWidth;
let displayWidth;
let midlineX;
//const minScreenHeight = 900;

let algoButtons = [];
const buttonHeight = 30;

//ALGO ENUM
let Algo = Object.freeze({BUBBLESORT: 1, 
                          MERGESORT: 3,
                          QUICKSORT: 2,
                          LINEARSEARCH: 4, 
                          JUMPSEARCH: 5, 
                          BINARYSEARCH: 6,
                          DIJKSTRAS: 7,
                          ASTAR: 8
                        })

//RUNS ONCE  
function setup() {
    createCanvas(windowWidth, windowHeight);
    defineGlobals();
    setupAlgoButtons();
    textFont(font);
}

//RUNS ~60 TIMES/SECOND
function draw() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
    background(backgroundColor);
    //displayGridLines();
    
    displayPanel();
    displayScreenDimensions();

    for (let button of algoButtons) {
        button.show();
    }

    checkMousePointer();
}

//define the globals in setup()
function defineGlobals() {
    backgroundColor = color(150);
    font = 'monospace';

    panelWidth = 250;
    updateDimensions();
    
}

//create the algorithm buttons on the panel
function setupAlgoButtons() {
    
    let bubbleSortButton = new Button(200, Algo.BUBBLESORT);
    let mergeSortButton = new Button(230, Algo.MERGESORT);
    let quickSortButton = new Button(260, Algo.QUICKSORT);

    algoButtons.push(bubbleSortButton);
    algoButtons.push(mergeSortButton);
    algoButtons.push(quickSortButton);
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
}

//displays border of panel
function displayPanelBackground() {
    push();
    fill(125);
    stroke(50, 30);
    strokeWeight(7);
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
        if (button.rollover()) {
            button.clicked();
        }
    }
}

function checkMousePointer() {
    cursor(ARROW);
    for (let button of algoButtons) {
        if (button.rollover() && !button.isSelected) {
            cursor('pointer');
            break;
        } 
    }
}