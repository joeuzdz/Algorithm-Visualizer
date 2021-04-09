
//general globals
let backgroundColor;
let font;
let panelWidth;
let displayWidth;
let midlineX;
const minScreenWidth = 600;
const minScreenHeight = 600;

//algo titles on panel
let titleBars = [];

//button globals
let algoButtons = [];
const algoButtonHeight = 30;
//control buttons and their graphics
let controlButtons = [];
let playButton, playButtonGraphic, playButtonMOGraphic, playButtonDisGraphic;
let pauseButtonGraphic, pauseButtonMOGraphic;
let resetButton, resetButtonGraphic, resetButtonMOGraphic;
let mazeButton, clearButton;

let ControlType = Object.freeze({
                    PLAY: 1,
                    PAUSE: 2,
                    RESET: 3,
                    MAZE: 4,
                    CLEAR: 5
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
                    PRIMS: 12,
                    KRUSKALS: 13
                    })
//MODE ENUM
let Mode = Object.freeze({
                    DEFAULT: 1,
                    SORT: 2,
                    MST: 3,
                    PATHFIND: 4,
                    MISC: 5
                    })


//animation queue
let animationQueue = [];
let animationIterator = 0;
let animationIsPaused = false;

//slider
let slider;
const sliderMin           = 19;
const sliderMax           = 101;
const sliderDefaultValue  = 59;
const sliderStepInterval  = 2;
let globalID = 0;

//sort gloabals
let sort;

//pathfind globals
let pathfind;
let didAnimate = false;
let canDraw = false;
let doDraw = false;
let doAddWall = true;
let mazeImage;
let binImage;
let isLoading = false;
let triggerCounter = 0;

//mst globals
let mst;

//setup run once at start of program
function setup() {
    createCanvas(max(windowWidth,minScreenWidth), max(windowHeight,minScreenHeight));
    defineGlobals();
    setupAlgoButtonsAndTitles();
    mazeImage = loadImage('assets/maze.png');
    binImage = loadImage('assets/bin.png');
    createControlButtonGraphics();
    setupControlButtons();
    textFont(font);
    rectMode(CENTER);
    imageMode(CENTER);
    setupSlider();
}

//draw loop runs after setup()
function draw() {
    resizeCanvas(max(windowWidth,minScreenWidth), max(windowHeight,minScreenHeight));
    updateDimensions();
    background(backgroundColor);
    // displayGridLines();
    
    displayPanel();
    displayScreenDimensions();

    if (currentMode != Mode.DEFAULT) {
        displayControlButtons();
        updateSlider();
    }

    showAlgoTitles();

    checkMouse();

    //if animation queue is not empty, display each frame and then reset it
    if (animationQueue.length != 0) { 
        let nextFrame = animationQueue[animationIterator];
       
        if (currentMode == Mode.SORT) {
            for (let bar of nextFrame) {
                bar.show();
            }
        } else if (currentMode == Mode.PATHFIND) {
            for (let node of nextFrame) {
                node.show(pathfind.origin.x, pathfind.origin.y, pathfind.nodeSize);
            }
        } else if (currentMode == Mode.MST) {
            for (let ve of nextFrame) {
                ve.show();
            }
        }

        if (!animationIsPaused) {
            animationIterator++;
        }

        if (animationQueue.length <= animationIterator) {
            resetAnimationQueue();
        }

    //animation queue is empty, display proper mode
    } else { 

        if (currentMode == Mode.DEFAULT) {
            displayDefaultMessage();
        } else if (currentMode == Mode.SORT) {
            sort.update();
            sort.show();
        } else if (currentMode == Mode.PATHFIND) {
            pathfind.update();
            pathfind.show();
        } else if (currentMode == Mode.MST) {
            mst.update();
            mst.show();
        }

    }

    //if pathfinding is loading, display loading message
    if (isLoading) {
        if (currentMode == Mode.PATHFIND && animationQueue.length == 0) {
            fill(200);
            textSize(16);
            text('Finding a path...', panelWidth + 20, height - 20);
        }
        triggerCounter++;
        if (triggerCounter > 1) {
            playAlgorithm();
            isLoading = false;
            playButton.isEnabled = true;
        }
    }

    
}

function defineGlobals() {
    backgroundColor = color('#24476c');
    font = 'monospace';

    panelWidth = 220;
    updateDimensions();
    
    currentAlgo = Algo.DEFAULT;
    currentMode = Mode.DEFAULT;
}

function displayDefaultMessage() {
    push();
    fill(200);
    textAlign(CENTER);
    textSize(22);
    text('Select an algorithm', midlineX, height/2 - 15);
    text('to visualize it', midlineX, height/2 + 15);
    pop();
}

function showAlgoTitles() {
    let title;
        switch(currentAlgo) {
            case Algo.BUBBLESORT:
                title = 'Bubble Sort';
                break;
            case Algo.INSERTIONSORT:
                title = 'Insertion Sort';
                break;
            case Algo.SELECTIONSORT:
                title = 'Selection Sort';
                break;
            case Algo.DIJKSTRAS:
                title = 'Dijkstra\'s Algorithm';
                break;
            case Algo.ASTAR:
                title = 'A* Algorithm (Manhattan Distance)';
                break;
            case Algo.PRIMS:
                title = 'Prim\'s Algorithm';
                break;
            case Algo.KRUSKALS:
                title = 'Kruskal\'s Algorithm';
                break;
            default:
                title = '';
                break;
        }
        push();
        fill(200);
        textAlign(CENTER);
        textSize(22);
        text(title, midlineX, height * 0.1);
        pop();
}

function setupAlgoButtonsAndTitles() {
    let baseYPos = 150;
    let spacing = algoButtonHeight;
    let i = 0;

    let sortTitle = new TitleBar(baseYPos + spacing*i++, Mode.SORT);

    let bubbleSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.BUBBLESORT);
    let insertionSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.INSERTIONSORT);
    let selectionSortButton = new AlgoButton(baseYPos + spacing*i++, Algo.SELECTIONSORT);
    
    i++;
    let pathfindTitle = new TitleBar(baseYPos + spacing*i++, Mode.PATHFIND);

    let dijkstrasButton = new AlgoButton(baseYPos + spacing*i++, Algo.DIJKSTRAS);
    let aStarButton = new AlgoButton(baseYPos + spacing*i++, Algo.ASTAR);

    i++;
    let mstTitle = new TitleBar(baseYPos + spacing*i++, Mode.MST);

    let primsButton = new AlgoButton(baseYPos + spacing*i++, Algo.PRIMS);
    let kruskalsButton = new AlgoButton(baseYPos + spacing*i++, Algo.KRUSKALS);

    titleBars.push(sortTitle);
    titleBars.push(pathfindTitle);
    titleBars.push(mstTitle);

    algoButtons.push(bubbleSortButton);
    algoButtons.push(insertionSortButton);
    algoButtons.push(selectionSortButton);
    algoButtons.push(dijkstrasButton);
    algoButtons.push(aStarButton);
    algoButtons.push(primsButton);
    algoButtons.push(kruskalsButton);
}

function setupControlButtons() {
    playButton = new ControlButton(ControlType.PLAY, 70, 50, true);
    resetButton = new ControlButton(ControlType.RESET, 50, 50, true);

    mazeButton = new ControlButton(ControlType.MAZE, 50, 50, true);
    mazeButton.isEnabled = false;

    clearButton = new ControlButton(ControlType.CLEAR, 50, 50, true);
    clearButton.isEnabled = true;

    controlButtons.push(playButton);
    controlButtons.push(resetButton);
    controlButtons.push(mazeButton);
    controlButtons.push(clearButton);
}

function updateControlButtonPositions() {
   
    if (currentMode == Mode.PATHFIND) {
        playButton.xPos = midlineX - 25;
        playButton.yPos = height - 50;
        resetButton.xPos = midlineX + 35;
        resetButton.yPos = height - 50;
        mazeButton.xPos = midlineX - 85;
        mazeButton.yPos = height - 50;
        clearButton.xPos = midlineX + 85;
        clearButton.yPos = height - 50;
    } else {
        playButton.xPos = midlineX - 25;
        playButton.yPos = height - 50;
        resetButton.xPos = midlineX + 35;
        resetButton.yPos = height - 50;
    }
   
}

function displayControlButtons() {
    updateControlButtonPositions();
    
    push();
    noStroke();
    fill(255, 110);
    if (currentMode == Mode.PATHFIND) {
        rect(midlineX, height - 50, 170, 45);
    } else {
        rect(midlineX, height - 50, 60, 45);
    }
    pop();
    
    for (let button of controlButtons) {
        button.show();
    }

    if (currentMode == Mode.PATHFIND) {
        image(mazeImage, midlineX - 85, height - 50, 25, 25);
        image(binImage, midlineX + 85, height - 50, 30, 30);
    }
}

function updateDimensions() {
    displayWidth = width - panelWidth;
    midlineX = displayWidth/2 + panelWidth;
}

function displayPanel() {
    displayPanelBackground();
    displayTitle();
    displayAlgoButtonsAndTitle();
}

function displayPanelBackground() {
    push();
    fill('#1e3a59');
    stroke(50, 30);
    strokeWeight(5);
    rectMode(CORNER)
    rect(0, 0, panelWidth, height);
    pop();
}

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

function displayAlgoButtonsAndTitle() {
    for (let button of algoButtons) {
        button.show();
    }

    for (let title of titleBars) {
        title.show();
    }
}

function displayScreenDimensions() {
    push();
    fill(200);
    textSize(16);
    let string = str(width) + ', ' + str(height);
    text(string, width - 100, height - 20);
    pop();
}

//for positioning debugging
function displayGridLines() {
    push();
    stroke(0);
    strokeWeight(0.2);
    line(panelWidth, height/2, width, height/2);
    line(midlineX, 0, midlineX, height);
    pop();
}

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

function mousePressed() {
    if (currentMode == Mode.PATHFIND && canDraw) {
        for (let i = 0; i < pathfind.grid.length; i++) {
            for (let j = 0; j < pathfind.grid[0].length; j++) {
                if (pathfind.inCanvas()) {
                    doDraw = true;
                    if (pathfind.grid[i][j].rollover()) {
                        if (pathfind.grid[i][j].isWall) {
                            doAddWall = false;
                        } else {
                            doAddWall = true;
                        }
                    }
                } else {
                    doDraw = false;
                }
            }
        }
    }
}

function checkMouse() {
    checkMousePointer();

    if (currentMode == Mode.PATHFIND && canDraw && doDraw) {
        if (mouseIsPressed && pathfind.inCanvas()) {
            let x = mouseX - pathfind.origin.x;
            let i = floor(x / pathfind.nodeSize);
            let y = mouseY - pathfind.origin.y;
            let j = floor(y / pathfind.nodeSize);
            if (doAddWall && !pathfind.grid[i][j].isStartNode && !pathfind.grid[i][j].isEndNode) {
                pathfind.grid[i][j].isWall = true;
            } else {
                pathfind.grid[i][j].isWall = false;
            }
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
    for (let button of controlButtons) {
        if (button.rollover() && button.isEnabled) {
            cursor('pointer');
            break;
        }
    }
}

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

function resetAnimationQueue() {
    animationQueue = [];
    animationIterator = 0;
    animationIsPaused = false;
    playButton.isEnabled = false;
    playButton.isPaused = true;
}