class Sort {
    constructor() {
        this.items = [];        
        this.barWidth;          
        this.barSpacing = 4;    
    }

    update() {
        if (slider.value() != sort.items.length) {
            this.updateNumBars();
        }
        this.resetBarPositions();
    }

    updateNumBars() {

        //if start of program, add one initial bar
        if (this.items.length == 0) {
            let barValue = random(0.1, 1);
            let newBar = new SortingBar(barValue);
            this.items.push(newBar);
        }

        //add one bar to beginning and end of array until this.items.length == value
        if (this.items.length < slider.value()) {
            let toAdd = slider.value() - this.items.length;
            for (let i = 0; i < floor(toAdd/2); i++) {
                let barValue = random(0.1, 1);
                let newBar = new SortingBar(barValue);
                this.items.push(newBar);

                barValue = random(0.1, 1);
                newBar = new SortingBar(barValue);
                this.items.unshift(newBar);
            }

        //splice bars from end of array so length is equal to slider value
        } else if (this.items.length > slider.value()) {
            this.items.splice(slider.value(), this.items.length - slider.value());
        }
    }

    //center bars in bar collection on the screen
    resetBarPositions() {
        let minPercentage = 0.4;
        let maxPercentage = 0.8;
        let screenPercentage = map(this.items.length, slider.elt.min, slider.elt.max, minPercentage, maxPercentage);

        let sortCollectionWidth = displayWidth * screenPercentage;
        sortCollectionWidth -= this.barSpacing * this.items.length;
        this.barWidth = sortCollectionWidth / this.items.length;
        
        let midIdx = floor(this.items.length/2);
        let midBar = this.items[midIdx];
        midBar.xPos = midlineX;

        midBar.yPos = height/2;
        midBar.width = this.barWidth;

        for (let i = 0; i <= midIdx; i++) {
            //calculate leftBar position
            let leftBar = this.items[midIdx - i];
            leftBar.xPos = midlineX - i*(this.barWidth + this.barSpacing);
            leftBar.yPos = height/2;
            leftBar.width = this.barWidth;
            //calculate rightBar position
            let rightBar = this.items[midIdx + i];
            rightBar.xPos = midlineX + i*(this.barWidth + this.barSpacing);
            rightBar.yPos = height/2;
            rightBar.width = this.barWidth;
        }
    }

    show() {
        for (let bar of this.items) {
            bar.show();
        }
    }
    
    cloneArray(arr) {
        let clonedArray = [];
        for (let bar of arr) {
            let clonedBar = bar.clone();
            clonedArray.push(clonedBar);
        }
        return clonedArray;
    }

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
        
        for(let bar of this.items) {
            bar.color = color(251, 150, 138, 230);
        }
    }

    insertionSort() {

        let n = this.items.length;
        for (let i = 1; i < n; i++) {
            let current = this.items[i];
            let j = i-1; 
            while ((j > -1) && (current.value < this.items[j].value)) {
                
                this.items[j+1].animateSwap(this.items[j]);

                let temp = this.items[j];
                this.items[j] = this.items[j+1];
                this.items[j+1] = temp;

                j--;
            }
            this.items[j+1] = current;
        }

        for(let bar of this.items) {
            bar.color = color(251, 150, 138, 230);
        }
    }

    selectionSort() {
        let inputArr = this.items;
        let n = inputArr.length;
        
        for(let i = 0; i < n; i++) {
            let min = i;
            for(let j = i+1; j < n; j++){
                if(inputArr[j].value < inputArr[min].value) {
                    min=j; 
                }
            }
            if (min != i) {

                inputArr[min].animateSwap(inputArr[i]);

                let tmp = inputArr[i]; 
                inputArr[i] = inputArr[min];
                inputArr[min] = tmp;      
            }
        }
        for(let bar of this.items) {
            bar.color = color(251, 150, 138, 230);
        }
    
    }

}

