const { readFileSync, promises: fsPromises } = require("fs");
const forestMap = readFileSync("day-8/input.txt", "utf-8").split("\n");
const verticalTrees = {};
const scenicScores = {};

for (let i = 0; i < forestMap[0].length; i++) {
  const yTrees = forestMap.map((row) => row[i]);
  verticalTrees[i] = yTrees;
}

function getNumberOfVisibleTreesLeftOrAbove(axis, sliceIndex, height) {
  const treeSlice = axis.slice(0, sliceIndex).reverse();
  const blockingTreeIndex = treeSlice.findIndex((tree) => tree >= height);
  const numberOfVisibleTrees =
    blockingTreeIndex === -1 ? treeSlice.length : blockingTreeIndex + 1;
  return [blockingTreeIndex, numberOfVisibleTrees];
}

function getNumberOfVisibleTreesRightOrBelow(axis, sliceIndex, height) {
  const treeSlice = axis.slice(sliceIndex + 1);
  const blockingTreeIndex = treeSlice.findIndex((tree) => tree >= height);
  const numberOfVisibleTrees =
    blockingTreeIndex === -1 ? treeSlice.length : blockingTreeIndex + 1;
  return [blockingTreeIndex, numberOfVisibleTrees];
}

function getVisibleAndScenicScores() {
  let hiddenTrees = 0;
  let visibleTrees = 0;
  forestMap.forEach((row, yIndex) => {
    const xTrees = row.split("");
    for (let xIndex = 0; xIndex < xTrees.length; xIndex++) {
      const yTrees = verticalTrees[xIndex];
      const [blockingTreeIndexLeft, viewingDistanceLeft] =
        getNumberOfVisibleTreesLeftOrAbove(xTrees, xIndex, row[xIndex]);
      const [blockingTreeIndexRight, viewingDistanceRight] =
        getNumberOfVisibleTreesRightOrBelow(xTrees, xIndex, row[xIndex]);
      const [blockingTreeIndexAbove, viewingDistanceAbove] =
        getNumberOfVisibleTreesLeftOrAbove(yTrees, yIndex, row[xIndex]);
      const [blockingTreeIndexBelow, viewingDistanceBelow] =
        getNumberOfVisibleTreesRightOrBelow(yTrees, yIndex, row[xIndex]);

      blockingTreeIndexLeft === -1 ||
      blockingTreeIndexRight === -1 ||
      blockingTreeIndexAbove === -1 ||
      blockingTreeIndexBelow === -1
        ? (visibleTrees += 1)
        : (hiddenTrees += 1);

      const scenicScore =
        viewingDistanceLeft *
        viewingDistanceRight *
        viewingDistanceAbove *
        viewingDistanceBelow;

      scenicScores[`${yIndex}-${xIndex}`] = scenicScore;
    }
  });
  console.log("Visible trees: ", visibleTrees);
}

function getHighestScore(object) {
  getVisibleAndScenicScores();
  let highestScore = 0;
  for (const key in object) {
    if (object[key] > highestScore) {
      highestScore = object[key];
    }
  }
  console.log("Highest score: ", highestScore);
}

getVisibleAndScenicScores();
getHighestScore(scenicScores);
