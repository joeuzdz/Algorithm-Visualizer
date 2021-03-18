function createControlButtonGraphics() {
    
    playButtonGraphic = createGraphics(70, 50);
    playButtonGraphic.strokeWeight(2);
    playButtonGraphic.stroke(100);
    playButtonGraphic.fill(220);
    playButtonGraphic.rect(1,1,68,48,30);
    playButtonGraphic.fill(0);
    playButtonGraphic.noStroke();
    playButtonGraphic.triangle(27, 15, 27, 35, 47, 25);

    pauseButtonGraphic = createGraphics(70, 50);
    pauseButtonGraphic.strokeWeight(2);
    pauseButtonGraphic.stroke(100);
    pauseButtonGraphic.fill(220);
    pauseButtonGraphic.rect(1,1,68,48,30);
    pauseButtonGraphic.fill(0);
    pauseButtonGraphic.noStroke();
    pauseButtonGraphic.rect(28, 15, 5, 20, 10);
    pauseButtonGraphic.rect(37, 15, 5, 20, 10);
    
    playButtonDisGraphic = createGraphics(70, 50);
    playButtonDisGraphic.strokeWeight(2);
    playButtonDisGraphic.stroke(130);
    playButtonDisGraphic.fill(170);
    playButtonDisGraphic.rect(1,1,68,48,30);
    playButtonDisGraphic.fill(100);
    playButtonDisGraphic.noStroke();
    playButtonDisGraphic.triangle(27, 15, 27, 35, 47, 25);

    pauseButtonDisGraphic = createGraphics(70, 50);
    pauseButtonDisGraphic.strokeWeight(2);
    pauseButtonDisGraphic.stroke(130);
    pauseButtonDisGraphic.fill(170);
    pauseButtonDisGraphic.rect(1,1,68,48,30);
    pauseButtonDisGraphic.fill(100);
    pauseButtonDisGraphic.noStroke();
    pauseButtonDisGraphic.rect(28, 15, 5, 20, 10);
    pauseButtonDisGraphic.rect(37, 15, 5, 20, 10);

    playButtonMOGraphic = createGraphics(70, 50);
    playButtonMOGraphic.strokeWeight(2);
    playButtonMOGraphic.stroke(100);
    playButtonMOGraphic.fill(255);
    playButtonMOGraphic.rect(1,1,68,48,30);
    playButtonMOGraphic.fill(0);
    playButtonMOGraphic.noStroke();
    playButtonMOGraphic.triangle(27, 15, 27, 35, 47, 25);

    pauseButtonMOGraphic = createGraphics(70, 50);
    pauseButtonMOGraphic.strokeWeight(2);
    pauseButtonMOGraphic.stroke(100);
    pauseButtonMOGraphic.fill(255);
    pauseButtonMOGraphic.rect(1,1,68,48,30);
    pauseButtonMOGraphic.fill(0);
    pauseButtonMOGraphic.noStroke();
    pauseButtonMOGraphic.rect(28, 15, 5, 20, 10);
    pauseButtonMOGraphic.rect(37, 15, 5, 20, 10);
    
    resetButtonGraphic = createGraphics(50, 50);
    resetButtonGraphic.strokeWeight(2);
    resetButtonGraphic.stroke(100);
    resetButtonGraphic.fill(220);
    resetButtonGraphic.ellipse(25, 25, 45);
    resetButtonGraphic.noStroke();
    resetButtonGraphic.fill(0);
    resetButtonGraphic.ellipse(25, 25, 26);
    resetButtonGraphic.fill(220);
    resetButtonGraphic.ellipse(25, 25, 20);
    resetButtonGraphic.rect(32,17,10,10);
    resetButtonGraphic.fill(0);
    resetButtonGraphic.triangle(27, 20, 36, 11, 36, 20);

    resetButtonMOGraphic = createGraphics(50, 50);
    resetButtonMOGraphic.strokeWeight(2);
    resetButtonMOGraphic.stroke(100);
    resetButtonMOGraphic.fill(255);
    resetButtonMOGraphic.ellipse(25, 25, 45);
    resetButtonMOGraphic.noStroke();
    resetButtonMOGraphic.fill(0);
    resetButtonMOGraphic.ellipse(25, 25, 26);
    resetButtonMOGraphic.fill(255);
    resetButtonMOGraphic.ellipse(25, 25, 20);
    resetButtonMOGraphic.rect(32,17,10,10);
    resetButtonMOGraphic.fill(0);
    resetButtonMOGraphic.triangle(27, 20, 36, 11, 36, 20);

    genericButtonGraphic = createGraphics(50, 50);
    genericButtonGraphic.strokeWeight(2);
    genericButtonGraphic.stroke(100);
    genericButtonGraphic.fill(220);
    genericButtonGraphic.ellipse(25, 25, 45);

    genericButtonDisGraphic = createGraphics(50, 50);
    genericButtonDisGraphic.strokeWeight(2);
    genericButtonDisGraphic.stroke(130);
    genericButtonDisGraphic.fill(170);
    genericButtonDisGraphic.ellipse(25, 25, 45);

    genericButtonMOGraphic = createGraphics(50, 50);
    genericButtonMOGraphic.strokeWeight(2);
    genericButtonMOGraphic.stroke(100);
    genericButtonMOGraphic.fill(255);
    genericButtonMOGraphic.ellipse(25, 25, 45);
}