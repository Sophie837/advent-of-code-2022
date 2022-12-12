const { readFileSync, promises: fsPromises } = require("fs");
const forestMap = readFileSync("day-8/input.txt", "utf-8").split("\n");
const width = forestMap[0].length;
const height = forestMap.length;
const allTrees = width * height;
let hiddenTrees = 0;

forestMap.forEach((row, yIndex) => {
  const xTrees = row.split("");
  for (let xIndex = 0; xIndex < xTrees.length; xIndex++) {
    const tallerTreesToLeft =
      xTrees.slice(0, xIndex).filter((tree) => tree >= row[xIndex]).length > 0
        ? true
        : false;
    const tallerTreesToRight =
      xTrees.slice(xIndex + 1).filter((tree) => tree >= row[xIndex]).length > 0
        ? true
        : false;
    if (tallerTreesToLeft && tallerTreesToRight) {
      let yTrees = [];
      for (let j = 0; j < forestMap.length; j++) {
        yTrees = [...yTrees, forestMap[j][xIndex]];
      }
      const tallerTreesAbove =
        yTrees.slice(0, yIndex).filter((tree) => tree >= row[xIndex]).length > 0
          ? true
          : false;
      const tallerTreesBelow =
        yTrees.slice(yIndex + 1).filter((tree) => tree >= row[xIndex]).length >
        0
          ? true
          : false;
      if (tallerTreesAbove && tallerTreesBelow) {
        hiddenTrees += 1;
      }
    }
  }
});

console.log("Hidden: ", hiddenTrees);
const visibleTrees = allTrees - hiddenTrees;
console.log("Visible: ", visibleTrees);
