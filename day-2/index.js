const { readFileSync, promises: fsPromises } = require("fs");
const strategy = readFileSync("day-2/input.txt", "utf-8").split("\n");

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
console.log(totalPoints);
