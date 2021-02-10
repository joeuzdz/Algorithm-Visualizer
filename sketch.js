let x = 0;

function setup() {
    createCanvas(400, 400);
    
}

function draw() {
    background(50);

    ellipse(x, height/2, 50);
    x += 10;
    if (x > width) {
        x = 0;
    }
}
