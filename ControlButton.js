class ControlButton {
    constructor(type, width, height, isEnabled) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.xPos;
        this.yPos;
        this.isEnabled = isEnabled;
    }

    show() {
        if (this.type == ControlType.PLAY) {
            if (this.isEnabled) {
                if (this.rollover()) {
                    image(playButtonMOGraphic, this.xPos, this.yPos);
                } else {
                    image(playButtonEnGraphic, this.xPos, this.yPos);
                }
            } else {
                image(playButtonDisGraphic, this.xPos, this.yPos);
            }
        } else if (this.type == ControlType.PAUSE) {
            if (this.isEnabled) {
                if (this.rollover()) {
                    image(pauseButtonMOGraphic, this.xPos, this.yPos);
                } else {
                    image(pauseButtonEnGraphic, this.xPos, this.yPos);
                }
            } else {
                image(pauseButtonDisGraphic, this.xPos, this.yPos);
            }
        } else if (this.type == ControlType.RESET) {
            if (this.rollover()) {
                image(resetButtonMOGraphic, this.xPos, this.yPos);
            } else {
                image(resetButtonEnGraphic, this.xPos, this.yPos);
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
            playAlgorithm();
            pauseButton.isEnabled = true;
            console.log('flag');
            numBarsSlider.elt.setAttribute('disabled', 'true');
        } else if (this.type == ControlType.PAUSE) {
            animationIsPaused = true;
            playButton.isEnabled = true;
            pauseButton.isEnabled = false;
        } else if (this.type == ControlType.RESET) {
            if (currentMode == Mode.SORT) {
                setupSort();
                console.log(animationIsPaused);
            }
        }
    }


}

function playAlgorithm() {
    switch (currentAlgo) {
        case Algo.BUBBLESORT:
            if (animationQueue.length == 0) {
                sortCollection.bubbleSort();
            } else {
                animationIsPaused = false;
            }
            break;
        case Algo.MERGESORT:
            break;
        case Algo.QUICKSORT:
            break;
    }

    playButton.isEnabled = false;
}