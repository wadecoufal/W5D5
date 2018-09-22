const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor() {
    this.tower = [[3,2,1],[],[]];
  }
  run() {
    // instantiate game
    // run play turn until game is over
  }
  
  promptMove(callback) {
    // prompt user for move
    // validate the move
    // call amke move if move valid
  
    reader.question("Choose two towers ([from,to]): ", (answer) => {
      let inputs = answer.split(",");
      console.log(this, "!!!!!!!!!");
      let fromTower = parseInt(inputs[0]) - 1;
      let toTower = parseInt(inputs[1]) - 1;
      if (this.isValidMove(fromTower, toTower)) {
        console.log(this, "??????00");
        console.log(fromTower, "FROM TOWER");
        console.log(toTower, "TO TOWER");
        callback(fromTower, toTower);
        // callback.call(that, fromTower, toTower);
        // callback(fromTower, toTower);
        // let method = callback.bind(that);
      } else {
        console.log("Invalid move");
      }
    });
  }
  
  makeMove(fromTower, toTower) {
    console.log(this, "XXXXX");
    console.log(fromTower);
    console.log(toTower);
    // take a from tower to tower
    // pop first el from 1tower move to 2tower
    this.tower[toTower].push(this.tower[fromTower].pop());
    console.log(this);
  }
  
  isValidMove(fromTower, toTower) {
    // take a from tower to tower
    // return 
    if (fromTower < 0 || fromTower > 2 || toTower < 0 || toTower > 2) {
      return false;
    }
    if (this.tower[fromTower].length === 0) {
    
      return false;
    }
    if (this.tower[toTower].length === 0) {
      
      return true;
    }
    
    let disc1 = this.tower[fromTower].slice().pop();
    let disc2 = this.tower[toTower].slice().pop();
    
    if (disc1 < disc2) {
      return true;
    } else {
      return false;
    }
  }

}

let g = new Game();
g.promptMove(g.makeMove);