const { readFileSync, promises: fsPromises } = require("fs");
const supplyStackInfo = readFileSync("day-5/example-input.txt", "utf-8").split(
  "\n"
);
console.log(supplyStackInfo);

const separator = supplyStackInfo.indexOf("");
const supplyStackInstructions = supplyStackInfo.slice(separator + 1);

//Diagram
const supplyStackDiagram = supplyStackInfo.slice(0, separator);
const diagram = supplyStackDiagram.map((row) => row.match(/\w+/g).flat());
console.log("Diagram: ", supplyStackDiagram);
const reversedDiagram = supplyStackDiagram.reverse();
console.log("Reversed diagram: ", reversedDiagram);
const numberOfColumns = reversedDiagram.splice(0, 1)[0].match(/\d+/g);
// console.log("Column number: ", numberOfColumns);
const columns = {};
numberOfColumns.map((num) => (columns[num] = []));
// console.log(columns);
console.log("Reversed diagram after splice: ", reversedDiagram);
reversedDiagram.map((row) => {
  let columnNumber = 1;
  for (let i = 0; i < row.length; i += 4) {
    let crate = row.slice(i, i + 3);
    if (crate !== "   ") {
      columns[columnNumber] = [...columns[columnNumber], crate];
    }
    columnNumber += 1;
  }
});
console.log(columns);

// Instructions
console.log("Instructions: ", supplyStackInstructions);
const instructionNumbers = supplyStackInstructions.map((instruction) =>
  instruction.match(/\d+/g)
);
console.log(instructionNumbers);
instructionNumbers.map((instruction) => {
  const originColumn = instruction[1];
  const destinationColumn = instruction[2];
  const quantity = instruction[0];
  for (let i = 0; i < quantity; i++) {
    console.log("quantity: ", quantity, i);
    const crateToMove = columns[originColumn].splice(-1);
    console.log("crate to move: ", ...crateToMove);
    columns[destinationColumn] = [
      ...columns[destinationColumn],
      ...crateToMove,
    ];
  }
});
console.log(columns);

let topCrates = [];
Object.keys(columns).forEach((key) => {
  const topCrate = columns[key].slice(-1);
  console.log(topCrate);
  topCrates = [...topCrates, ...topCrate];
});
// console.log("Top crates: ", topCrates);
const topCratesCombined = topCrates.map((crate) => crate.match(/\w/g)).join("");
console.log("Top crates: ", topCratesCombined);
// console.log("Top crates: ", topCrates.join(""));
// console.log("Top crates: ", topCrates.join("").match(/\w/g));
