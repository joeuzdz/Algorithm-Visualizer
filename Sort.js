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
        // let randMinValue = height*0.01;
        // let randMaxValue = height*0.5;

        //if start of program, add one initial bar
        if (this.items.length == 0) {
            let barValue = random(0.1, 1);
            // let barValue = random(randMinValue, randMaxValue);
            let newBar = new SortingBar(barValue);
            this.items.push(newBar);
        }

        //add one bar to beginning and end of array until this.items.length == value
        if (this.items.length < numBarsSlider.value()) {
            let toAdd = numBarsSlider.value() - this.items.length;
            for (let i = 0; i < floor(toAdd/2); i++) {
                //add new bar to the end of array
                // let barValue = random(randMinValue, randMaxValue);
                let barValue = random(0.1, 1);
                let newBar = new SortingBar(barValue);
                this.items.push(newBar);
                //add new bar to the front of array
                // barValue = random(randMinValue, randMaxValue);
                barValue = random(0.1, 1);
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
        let maxPercentage = 0.8;
        let screenPercentage = map(this.items.length, numBarsSlider.elt.min, numBarsSlider.elt.max, minPercentage, maxPercentage);
        // screenPercentage = 1;
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
            // this.items[n].color = color('#990000');
            n--;
        } while (swap);
        
        for(let bar of this.items) {
            bar.color = color(251, 150, 138, 230);
        }
    }

    insertionSort() {

        let n = this.items.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = this.items[i];
            // The last element of our sorted subarray
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
            // Finding the smallest number in the subarray
            let min = i;
            for(let j = i+1; j < n; j++){
                if(inputArr[j].value < inputArr[min].value) {
                    min=j; 
                }
            }
            if (min != i) {

                inputArr[min].animateSwap(inputArr[i]);

                // Swapping the elements
                let tmp = inputArr[i]; 
                inputArr[i] = inputArr[min];
                inputArr[min] = tmp;      
            }
        }
        for(let bar of this.items) {
            bar.color = color(251, 150, 138, 230);
        }
    
    }

    //iterative
    //no visualization yet
    mergeSort () {
        //Create two arrays for sorting
        let sorted = [...this.items];
        let n = sorted.length;
        let buffer = new Array(n);
        
        for (let size = 1; size < n; size *= 2) {
            for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
                
                //Get the two sub arrays
                let left = leftStart;
                let right = min(left + size, n);
                let leftLimit = right;
                let rightLimit = min(right + size, n);
                
                //Merge the sub arrays
                merge(left, right, leftLimit, rightLimit, sorted, buffer);  
            }
            
            //Swap the sorted sub array and merge them
            let temp = sorted;
            sorted = buffer;
            buffer = temp;
        }
        
        this.items = sorted;
        for(let bar of this.items) {
            bar.color = color('#990000');
        }
      }

}

//iterative
function merge (left, right, leftLimit, rightLimit, sorted, buffer) {
    let i = left;
    
    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
        if (sorted[left].value <= sorted[right].value) {
            buffer[i++] = sorted[left++];
        } else {
            buffer[i++] = sorted[right++];
        }
    }
  
    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {
        buffer[i++] = sorted[left++];
    }
  
    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
        buffer[i++] = sorted[right++];
    }
}

