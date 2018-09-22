const readline = require('readline');

class Clock {
  
  constructor () {
    let date = new Date();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
    this.printTime();
    window.setInterval(this._tick.bind(this), 1000);
  }
  
  printTime () {
    console.log(this.hour + ":" + this.minute + ":" + this.second);
  }
  
  _tick () {
    this.second++;
    if (this.second === 60) {
      this.second = 0;
      this.minute++;
      if (this.minute === 60) {
        this.minute = 0;
        this.hour++;
        if (this.hour === 24) {
          this.hour = 0;
        }
      }
    }
    this.printTime();
  }  
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {

  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
    return;
  } else {
    reader.question("Choose a number: ", function (answer) {
      let new_sum = sum + parseInt(answer);
      console.log(`New Sum: ${new_sum}!`);
      addNumbers(new_sum, numsLeft-1, completionCallback);
    });
  }
  
}  

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
      reader.close();
    }
  }
  outerBubbleSortLoop(true);
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}? (yes/no)`, function (answer) {
    if (answer === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length-1) {
    askIfGreaterThan(arr[i], arr[i+1], function (isGreaterThan) {
      if (isGreaterThan) {
        let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      } else {
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      }
    });
  } else if (i === (arr.length-1)) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

console.log(absurdBubbleSort([4,1,2,5, 0, 9], (arr) => console.log(arr)));



function myBind(context) {
  
  return () => {
    this.apply(context);
  };
}

Function.prototype.myBind = myBind;

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"