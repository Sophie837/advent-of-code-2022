const { readFileSync, promises: fsPromises } = require("fs");
const forestMap = readFileSync("day-8/input.txt", "utf-8").split("\n");
const horizontalTrees = {};
const allTrees = forestMap[0].length * forestMap.length;
let hiddenTrees = 0;

function getNumberOfTallerTreesLeftOrAbove(axis, sliceIndex, height) {
  return axis.slice(0, sliceIndex).filter((tree) => tree >= height).length;
}

function getNumberOfTallerTreesRightOrBelow(axis, sliceIndex, height) {
  return axis.slice(sliceIndex + 1).filter((tree) => tree >= height).length;
}

function getHorizontalTrees(xIndex) {
  if (horizontalTrees[xIndex]) {
    return horizontalTrees[xIndex];
  } else {
    const yTrees = forestMap.map((row) => row[xIndex]);
    horizontalTrees[xIndex] = yTrees;
    return yTrees;
  }
}

function getNumberOfHiddenTrees() {
  forestMap.forEach((row, yIndex) => {
    const xTrees = row.split("");
    for (let xIndex = 0; xIndex < xTrees.length; xIndex++) {
      const tallerTreesToLeft =
        getNumberOfTallerTreesLeftOrAbove(xTrees, xIndex, row[xIndex]) > 0
          ? true
          : false;
      const tallerTreesToRight =
        getNumberOfTallerTreesRightOrBelow(xTrees, xIndex, row[xIndex]) > 0
          ? true
          : false;
      if (tallerTreesToLeft && tallerTreesToRight) {
        const yTrees = getHorizontalTrees(xIndex);
        const tallerTreesAbove =
          getNumberOfTallerTreesLeftOrAbove(yTrees, yIndex, row[xIndex]) > 0
            ? true
            : false;
        const tallerTreesBelow =
          getNumberOfTallerTreesRightOrBelow(yTrees, yIndex, row[xIndex]) > 0
            ? true
            : false;
        if (tallerTreesAbove && tallerTreesBelow) {
          hiddenTrees += 1;
        }
      }
    }
  });
  console.log("Hidden: ", hiddenTrees);
}

function getNumberOfVisibleTrees() {
  getNumberOfHiddenTrees();
  console.log("Visible: ", allTrees - hiddenTrees);
}

getNumberOfVisibleTrees();
