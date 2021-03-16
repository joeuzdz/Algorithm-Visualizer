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
                    } else {
                        image(playButtonGraphic, this.xPos, this.yPos);
                    }
                } else {
                    if (this.rollover()) {
                        image(pauseButtonMOGraphic, this.xPos, this.yPos);
                    } else {
                        image(pauseButtonGraphic, this.xPos, this.yPos);
                    }
                }
            }
            
        } else if (this.type == ControlType.RESET) {
            if (this.rollover()) {
                image(resetButtonMOGraphic, this.xPos, this.yPos);
            } else {
                image(resetButtonGraphic, this.xPos, this.yPos);
            }
        }
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
    }
}