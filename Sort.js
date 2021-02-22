class Sort {
    constructor() {
        this.items = [];        //bars in the collection
        this.barWidth;          //bars individual width
        this.barSpacing = 4;    //number of pixels between bars
    }

    updateBars() {
        this.updateNumBars();
        this.resetBarPositions();
    }

    //update number of bars in the collection, remove or add as neccessary
    updateNumBars() {
        let randMinValue = height*0.01;
        let randMaxValue = height*0.5;

        //if start of program, add one initial bar
        if (this.items.length == 0) {
            let barValue = random(randMinValue, randMaxValue);
            let newBar = new SortingBar(barValue);
            this.items.push(newBar);
        }

        //add one bar to beginning and end of array until this.items.length == value
        if (this.items.length < numBarsSlider.value()) {
            let toAdd = numBarsSlider.value() - this.items.length;
            for (let i = 0; i < floor(toAdd/2); i++) {
                //add new bar to the end of array
                let barValue = random(randMinValue, randMaxValue);
                let newBar = new SortingBar(barValue);
                this.items.push(newBar);
                //add new bar to the front of array
                barValue = random(randMinValue, randMaxValue);
                newBar = new SortingBar(barValue);
                this.items.unshift(newBar);
            }

        //splice bars from end of array so length is equal to slider value
        } else if (this.items.length > numBarsSlider.value()) {
            this.items.splice(numBarsSlider.value(), this.items.length - numBarsSlider.value());
        }
    }

    //center bars in bar collection on the screen
    resetBarPositions() {
        let minPercentage = 0.4;
        let maxPercentage = 0.7;
        let screenPercentage = this.scale(this.items.length, numBarsSlider.elt.min, numBarsSlider.elt.max, minPercentage, maxPercentage);
        //let barCollectionWidth = width * screenPercentage;
        let sortCollectionWidth = displayWidth * screenPercentage;
        sortCollectionWidth -= this.barSpacing * this.items.length;
        this.barWidth = sortCollectionWidth / this.items.length;
        
        let midIdx = floor(this.items.length/2);
        let midBar = this.items[midIdx];
        //midBar.xPos = width/2;
        midBar.xPos = midlineX;

        midBar.yPos = height/2;
        midBar.width = this.barWidth;

        for (let i = 0; i <= midIdx; i++) {
            //calculate leftBar position
            let leftBar = this.items[midIdx - i];
            // leftBar.xPos = (width/2) - i*(this.barWidth + this.barSpacing);
            leftBar.xPos = midlineX - i*(this.barWidth + this.barSpacing);
            leftBar.yPos = height/2;
            leftBar.width = this.barWidth;
            //calculate rightBar position
            let rightBar = this.items[midIdx + i];
            // rightBar.xPos = width/2 + i*(this.barWidth + this.barSpacing);
            rightBar.xPos = midlineX + i*(this.barWidth + this.barSpacing);
            rightBar.yPos = height/2;
            rightBar.width = this.barWidth;
        }
    }

    //display the sort collection
    show() {
        for (let bar of this.items) {
            bar.show();
        }
    }
    
    //used in this.show() to scale number of bars to screen width
    //      SAME THING AS MAP (SWITCH)
    scale(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    //use animation queue, all processing time up front (takes a while to load)
    bubbleSort() {
        let swap;
        let n = this.items.length-1;
        do {
            swap = false;
            for (let i = 0; i < n; i++)
            {
                if (this.items[i].value > this.items[i+1].value){

                    this.items[i].animateSwap(this.items[i+1]);
                   
                    let temp = this.items[i];
                    this.items[i] = this.items[i+1];
                    this.items[i+1] = temp;
                    swap = true;
                }
            }
            n--;
        } while (swap);
        
        
    }

    cloneArray(arr) {
        let clonedArray = [];
        for (let bar of arr) {
            let clonedBar = bar.clone();
            clonedArray.push(clonedBar);
        }
        return clonedArray;
    }

}