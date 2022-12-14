const { dir } = require("console");
const { readFileSync, promises: fsPromises } = require("fs");
const instructions = readFileSync("day-9/input.txt", "utf-8").split("\n");

let H = [0, 0];
let T = [0, 0];
let visitedCoords = {
  "0-0": 1,
};
let visitedCoordsCount = 1;

instructions.forEach((instruction) => {
  const [direction, count] = instruction.split(" ");
  for (let i = 0; i < count; i++) {
    switch (direction) {
      case "R":
        H[0]++;
        break;
      case "L":
        H[0]--;
        break;
      case "U":
        H[1]++;
        break;
      case "D":
        H[1]--;
        break;
    }
    updateT();
    addTCoord();
  }
});

function updateT() {
  const [xDiff, yDiff] = [H[0] - T[0], H[1] - T[1]];
  // check required movement on x + y axis
  if (xDiff === 0 || yDiff === 0) {
    if (xDiff > 1) {
      T[0]++;
    }
    if (xDiff < -1) {
      T[0]--;
    }
    if (yDiff > 1) {
      T[1]++;
    }
    if (yDiff < -1) {
      T[1]--;
    }
    // check required movement on diagionals
  } else {
    if ((xDiff === 1 || xDiff === -1) && (yDiff === 1 || yDiff === -1)) {
      return;
    } else if (xDiff / yDiff > 0) {
      if (xDiff > 0) {
        T[0]++ && T[1]++;
      } else {
        T[0]-- && T[1]--;
      }
    } else {
      if (xDiff > 0) {
        T[0]++ && T[1]--;
      } else {
        T[0]-- && T[1]++;
      }
    }
  }
}

function addTCoord() {
  const coord = T.join("-");
  visitedCoords[coord]
    ? (visitedCoords[coord] += 1)
    : (visitedCoords[coord] = 1 && visitedCoordsCount++);
}

console.log("Visited coords count: ", visitedCoordsCount);
