const { readFileSync, promises: fsPromises } = require("fs");
const strategy = readFileSync("day-2/input.txt", "utf-8").split("\n");

function strategy1() {
  let outcomePoints = 0;
  let shapePoints = 0;

  strategy.map((pair) => {
    switch (pair) {
      case "A X":
      case "B Y":
      case "C Z":
        outcomePoints += 3;
        break;
      case "A Y":
      case "B Z":
      case "C X":
        outcomePoints += 6;
        break;
    }

    switch (pair.split(" ")[1]) {
      case "X":
        shapePoints += 1;
        break;
      case "Y":
        shapePoints += 2;
        break;
      case "Z":
        shapePoints += 3;
        break;
    }
  });

  const totalPoints = outcomePoints + shapePoints;
  return totalPoints;
}

function strategy2() {
  let outcomePoints = 0;
  let shapePoints = 0;

  strategy.map((pair) => {
    switch (pair.split(" ")[1]) {
      case "Y":
        outcomePoints += 3;
        break;
      case "Z":
        outcomePoints += 6;
        break;
    }

    switch (pair) {
      case "B X":
      case "C Z":
      case "A Y":
        shapePoints += 1;
        break;
      case "B Y":
      case "A Z":
      case "C X":
        shapePoints += 2;
        break;
      case "A X":
      case "B Z":
      case "C Y":
        shapePoints += 3;
        break;
    }
  });

  const totalPoints = outcomePoints + shapePoints;
  return totalPoints;
}

console.log(strategy1());
console.log(strategy2());
