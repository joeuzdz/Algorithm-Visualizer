class ControlButton {
    constructor(type, width, height, isEnabled) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.xPos;
        this.yPos;
        this.isEnabled = isEnabled;
        this.isPaused = true;
    }

    show() {
        //for text
        push();
        fill(200);
        textAlign(CENTER);
        textSize(14);
        if (this.type == ControlType.PLAY) {
            if (!this.isEnabled) {
                if (this.isPaused) {
                    image(playButtonDisGraphic, this.xPos, this.yPos);
                } else {
                    image(pauseButtonDisGraphic, this.xPos, this.yPos);
                }
            } else {
                if (this.isPaused) {
                    if (this.rollover()) {
                        image(playButtonMOGraphic, this.xPos, this.yPos);
                        
                        text('Play', midlineX, height - 10);
                    } else {
                        image(playButtonGraphic, this.xPos, this.yPos);
                    }
                } else {
                    if (this.rollover()) {
                        image(pauseButtonMOGraphic, this.xPos, this.yPos);

                        text('Pause', midlineX, height - 10);
                    } else {
                        image(pauseButtonGraphic, this.xPos, this.yPos);
                    }
                }
            }
            
        } else if (this.type == ControlType.RESET) {
            if (this.rollover()) {
                image(resetButtonMOGraphic, this.xPos, this.yPos);

                text('Reset', midlineX, height - 10);
            } else {
                image(resetButtonGraphic, this.xPos, this.yPos);
            }

        } else if ((this.type == ControlType.MAZE || this.type == ControlType.CLEAR) && currentMode == Mode.PATHFIND) {
            if (this.isEnabled) {
                if (this.rollover()) {
                    image(genericButtonMOGraphic, this.xPos, this.yPos);

                    if (this.type == ControlType.MAZE) {
                        text('Generate Maze', midlineX, height - 10);
                    } else {
                        text('Clear Board', midlineX, height - 10);
                    }
                } else {
                    image(genericButtonGraphic, this.xPos, this.yPos);
                }
            } else {
                image(genericButtonDisGraphic, this.xPos, this.yPos);
            }
            
        }
        pop();
    }

    rollover() {
        let offsetX1 = this.xPos - (this.width/2);
        let offsetX2 = this.xPos + (this.width/2);
        let offsetY1 = this.yPos - (this.height/2);
        let offsetY2 = this.yPos + (this.height/2);
        return ((mouseX > offsetX1) && (mouseX < offsetX2) && (mouseY > offsetY1) && (mouseY < offsetY2));
    }

    clicked() {
        if (this.type == ControlType.PLAY) {
            canDraw = false;
            mazeButton.isEnabled = false;
            if (this.isPaused) {
                triggerAlgorithm();
                // playAlgorithm();
                this.isPaused = false;
                slider.elt.setAttribute('disabled', 'true');
            } else {
                animationIsPaused = true;
                this.isPaused = true;
            }

        } else if (this.type == ControlType.RESET) {
            if (currentMode == Mode.SORT) {
                setupSort();
            } else if (currentMode == Mode.PATHFIND) {
                setupPathfind();
            }

        } else if (this.type == ControlType.MAZE) {
            pathfind.createMaze();
        } else if (this.type == ControlType.CLEAR) {
            pathfind.clearWalls();
            setupPathfind();
        }
    }


}

function triggerAlgorithm() {
    isLoading = true;
    triggerCounter = 0;
    if (currentMode == Mode.PATHFIND) {
        playButton.isEnabled = false;
    }
}

function playAlgorithm() {
    isLoading = false;
    switch (currentAlgo) {
        case Algo.BUBBLESORT:
            if (animationQueue.length == 0) {
                sortCollection.bubbleSort();
            } else {
                animationIsPaused = false;
            }
            break;
        case Algo.INSERTIONSORT:
            if (animationQueue.length == 0) {
                sortCollection.insertionSort();
            } else {
                animationIsPaused = false;
            }
            break;
        case Algo.SELECTIONSORT:
            if (animationQueue.length == 0) {
                sortCollection.selectionSort();
            } else {
                animationIsPaused = false;
            }
            break;
        case Algo.DIJKSTRAS:
            if (animationQueue.length == 0) {
                pathfind.dijkstras();
            } else {
                animationIsPaused = false;
            }
        case Algo.ASTAR:
            if (animationQueue.length == 0) {
                pathfind.astar();
            } else {
                animationIsPaused = false;
            }        
    }
}