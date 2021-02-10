let backgroundColor;
let font;

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(150);
    font = 'monospace';
    textFont(font);
}

function draw() {
    resizeCanvas(windowWidth, windowHeight);
    background(backgroundColor);
    //displayGridLines();
    displayTitle();
    displayScreenDimensions();
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