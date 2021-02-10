let backgroundColor;
let font;

let x = 0;

//dropdowns
let dropdowns = [];
let sortDD;
let searchDD;
let pathfindDD;
let miscDD;

function setup() {
    createCanvas(windowWidth, windowHeight * 2);
    defineGlobals();
    setupDropdowns();
    textFont(font);

}

function draw() {
    resizeCanvas(windowWidth, windowHeight * 2);
    background(backgroundColor);
    //displayGridLines();
    displayTitle();
    displayScreenDimensions();

    repositionDropdowns();
}

function defineGlobals() {
    backgroundColor = color(150);
    font = 'monospace';
}

function setupDropdowns() {
   

    sortDD = createSelect();
    sortDD.option('Bubble Sort');
    sortDD.option('Quick Sort');
    sortDD.option('Merge Sort');
    sortDD.selected('Bubble Sort');

    
    searchDD = createSelect();
    searchDD.option('Linear Search');
    searchDD.option('Binary Search');
    searchDD.option('Jump Search');
    searchDD.selected('Linear Search');
    
    
    pathfindDD = createSelect();
    pathfindDD.option('Dijkstra\'s');
    pathfindDD.option('A*');
    pathfindDD.option('Depth First');
    pathfindDD.selected('A*');
    
    miscDD = createSelect();
    miscDD.option('Misc a');
    miscDD.option('Misc b');
    miscDD.option('Misc c');
    miscDD.selected('Misc a');

    
    // miscDD.size(200, 30);
    // miscDD.elt.setAttribute('font-size', '64px');

    dropdowns.push(sortDD);
    dropdowns.push(searchDD);
    dropdowns.push(pathfindDD);
    dropdowns.push(miscDD);

    repositionDropdowns();
}

function repositionDropdowns() {
    let increment = width/6;
    let xPosCounter = 1;
    let xPos;

    for (let dropdown of dropdowns) {
        xPos = increment * xPosCounter++;
        dropdown.position(xPos, height*0.15);
    }
}

function displayTitle() {
    push();
    fill(50);
    noStroke();
    
    textAlign(CENTER, TOP);
    if (width > 1000) {
        textSize(64);
    } else {
        textSize(map(width, 0, 1000, 16, 64));
    }
    text('Algorithm Visualizer', width/2, height*0.02);
    pop();
}

function displayScreenDimensions() {
    push();
    textSize(16);
    let string = str(width) + ', ' + str(height);
    text(string, width - 100, height - 20);
    pop();
}

function displayGridLines() {
    push();
    stroke(0);
    strokeWeight(0.2);
    line(0, height/2, width, height/2);
    line(width/2, 0, width/2, height);
    pop();
}