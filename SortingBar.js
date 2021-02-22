class SortingBar {
    constructor(value,id=globalID++, x=0, y=0, width=0, c=color(40, 200)) {
        this.value = value;
        this.id = id;
        this.xPos = x;
        this.yPos = y;
        this.width = width;
        this.color = c;
        this.rounded = 15;
    }

    show() {
        push();
        fill(this.color);
        noStroke();
        rect(this.xPos, this.yPos, this.width, this.value, this.rounded);
        pop();
    }

    clone() {
        return new SortingBar(this.value, this.id, this.xPos, this.yPos, this.width, this.color);
    }

    
    animateSwap(barToSwap) {
        let baseFrame = sortCollection.cloneArray(sortCollection.items);

        for (let i = 0; i < baseFrame.length; i++) {
            let bar = baseFrame[i];
            if (bar.id == this.id || bar.id == barToSwap.id) {
                let barIdx = baseFrame.indexOf(bar);
                baseFrame.splice(barIdx, 1);
                i--;
            }
        }

        let thisXPos = this.xPos;
        let swapXPos = barToSwap.xPos;
        let xDist = abs(thisXPos - swapXPos);
        let thisClone = this.clone();
        let swapClone = barToSwap.clone();


        this.xPos = swapXPos;
        barToSwap.xPos = thisXPos;

        // let numFrames;
        if (sortCollection.items.length > (numBarsSliderMax+numBarsSliderMin) / 2) {
            numFrames = 1;
        } else {
            numFrames = floor(map(sortCollection.items.length, numBarsSliderMin, (numBarsSliderMax+numBarsSliderMin) / 2, 15, 1));
        }
        for (let i = 1; i <= numFrames; i++) {
            let newFrame = sortCollection.cloneArray(baseFrame);
            if (thisXPos < swapXPos) {
                thisClone.xPos += (xDist/numFrames);
                swapClone.xPos -= (xDist/numFrames);
            } else {
                thisClone.xPos -= (xDist/numFrames);
                swapClone.xPos += (xDist/numFrames);
            }
            
            // swapClone.color = color('#e5e500');
            // thisClone.color = color('#cccc00');

            swapClone.color = color(225);
            thisClone.color = color(200);
            
            
            newFrame.push(thisClone);
            newFrame.push(swapClone);
            animationQueue.push(newFrame);

            thisClone = thisClone.clone();
            swapClone = swapClone.clone();
        }

    }
}