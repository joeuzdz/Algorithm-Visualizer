function createControlButtonGraphics() {
    
    playButtonEnGraphic = createGraphics(70, 50);
    playButtonEnGraphic.strokeWeight(2);
    playButtonEnGraphic.stroke(100);
    playButtonEnGraphic.fill(230);
    playButtonEnGraphic.rect(1,1,68,48,30);
    playButtonEnGraphic.fill(0);
    playButtonEnGraphic.noStroke();
    playButtonEnGraphic.triangle(27, 15, 27, 35, 47, 25);
    
    playButtonDisGraphic = createGraphics(70, 50);
    playButtonDisGraphic.strokeWeight(2);
    playButtonDisGraphic.stroke(130);
    playButtonDisGraphic.fill(170);
    playButtonDisGraphic.rect(1,1,68,48,30);
    playButtonDisGraphic.fill(100);
    playButtonDisGraphic.noStroke();
    playButtonDisGraphic.triangle(27, 15, 27, 35, 47, 25);

    playButtonMOGraphic = createGraphics(70, 50);
    playButtonMOGraphic.strokeWeight(2);
    playButtonMOGraphic.stroke(100);
    playButtonMOGraphic.fill(255);
    playButtonMOGraphic.rect(1,1,68,48,30);
    playButtonMOGraphic.fill(0);
    playButtonMOGraphic.noStroke();
    playButtonMOGraphic.triangle(27, 15, 27, 35, 47, 25);

    pauseButtonEnGraphic = createGraphics(50, 50);
    pauseButtonEnGraphic.strokeWeight(2);
    pauseButtonEnGraphic.stroke(100);
    pauseButtonEnGraphic.fill(230);
    pauseButtonEnGraphic.ellipse(25, 25, 45);
    pauseButtonEnGraphic.fill(0);
    pauseButtonEnGraphic.noStroke();
    pauseButtonEnGraphic.rect(18, 15, 5, 20, 10);
    pauseButtonEnGraphic.rect(27, 15, 5, 20, 10);

    pauseButtonDisGraphic = createGraphics(50, 50);
    pauseButtonDisGraphic.strokeWeight(2);
    pauseButtonDisGraphic.stroke(130);
    pauseButtonDisGraphic.fill(170);
    pauseButtonDisGraphic.ellipse(25, 25, 45);
    pauseButtonDisGraphic.fill(100);
    pauseButtonDisGraphic.noStroke();
    pauseButtonDisGraphic.rect(18, 15, 5, 20, 10);
    pauseButtonDisGraphic.rect(27, 15, 5, 20, 10);

    pauseButtonMOGraphic = createGraphics(50, 50);
    pauseButtonMOGraphic.strokeWeight(2);
    pauseButtonMOGraphic.stroke(100);
    pauseButtonMOGraphic.fill(255);
    pauseButtonMOGraphic.ellipse(25, 25, 45);
    pauseButtonMOGraphic.fill(0);
    pauseButtonMOGraphic.noStroke();
    pauseButtonMOGraphic.rect(18, 15, 5, 20, 10);
    pauseButtonMOGraphic.rect(27, 15, 5, 20, 10);
    
    resetButtonEnGraphic = createGraphics(50, 50);
    resetButtonEnGraphic.strokeWeight(2);
    resetButtonEnGraphic.stroke(100);
    resetButtonEnGraphic.fill(230);
    resetButtonEnGraphic.ellipse(25, 25, 45);
    resetButtonEnGraphic.noStroke();
    resetButtonEnGraphic.fill(0);
    resetButtonEnGraphic.ellipse(25, 25, 26);
    resetButtonEnGraphic.fill(230);
    resetButtonEnGraphic.ellipse(25, 25, 20);
    resetButtonEnGraphic.rect(32,17,10,10);
    resetButtonEnGraphic.fill(0);
    resetButtonEnGraphic.triangle(27, 20, 36, 11, 36, 20);

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
}