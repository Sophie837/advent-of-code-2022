const { readFileSync, promises: fsPromises } = require("fs");
const supplyStackInfo = readFileSync("day-5/input.txt", "utf-8").split("\n");

const separator = supplyStackInfo.indexOf("");
const supplyStackDiagram = supplyStackInfo.slice(0, separator);
const supplyStackInstructions = supplyStackInfo.slice(separator + 1);
const cargoCrateDiagram = {};

function createCargoCrateDiagram() {
  const reversedDiagram = supplyStackDiagram.reverse();
  // Add crate column numbers to cargo crate diagram
  reversedDiagram
    .splice(0, 1)[0]
    .match(/\d+/g)
    .map((num) => (cargoCrateDiagram[num] = []));
  // Add marked crates to the correct column number in cargo crate diagram
  reversedDiagram.map((row) => {
    let stackNumber = 1;
    for (let i = 0; i < row.length; i += 4) {
      let crate = row.slice(i, i + 3);
      if (crate !== "   ") {
        cargoCrateDiagram[stackNumber] = [
          ...cargoCrateDiagram[stackNumber],
          crate,
        ];
      }
      stackNumber += 1;
    }
  });
}

function operateCraneInstructions() {
  const instructionNumbers = supplyStackInstructions.map((instruction) =>
    instruction.match(/\d+/g)
  );
  instructionNumbers.map((instruction) => {
    const originStack = instruction[1];
    const destinationStack = instruction[2];
    const quantity = instruction[0];
    for (let i = 0; i < quantity; i++) {
      const crateToMove = cargoCrateDiagram[originStack].splice(-1);
      cargoCrateDiagram[destinationStack] = [
        ...cargoCrateDiagram[destinationStack],
        ...crateToMove,
      ];
    }
  });
}

function identifyTopCrates() {
  let topCrates = [];
  Object.keys(cargoCrateDiagram).forEach((stack) => {
    const topCrate = cargoCrateDiagram[stack].slice(-1);
    topCrates = [...topCrates, ...topCrate];
  });
  const topCratesCombined = topCrates
    .map((crate) => crate.match(/\w/g))
    .join("");
  console.log(topCratesCombined);
}

createCargoCrateDiagram();
operateCraneInstructions();
identifyTopCrates();
