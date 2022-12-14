const { readFileSync, promises: fsPromises } = require("fs");
const forestMap = readFileSync("day-8/input.txt", "utf-8").split("\n");
const horizontalTrees = {};

for (let i = 0; i < forestMap[0].length; i++) {
  const yTrees = forestMap.map((row) => row[i]);
  horizontalTrees[i] = yTrees;
}

function getIndexOfTallerTreesLeftOrAbove(axis, sliceIndex, height) {
  const treeSlice = axis.slice(0, sliceIndex).reverse();
  const blockingTreeIndex = treeSlice.findIndex((tree) => tree >= height);
  return blockingTreeIndex;
}

function getIndexOfTallerTreesRightOrBelow(axis, sliceIndex, height) {
  const treeSlice = axis.slice(sliceIndex + 1);
  const blockingTreeIndex = treeSlice.findIndex((tree) => tree >= height);
  return blockingTreeIndex;
}

function getNumberOfVisibleTreesLeftOrAbove(axis, sliceIndex, height) {
  const blockingTreeIndex = getIndexOfTallerTreesLeftOrAbove(
    axis,
    sliceIndex,
    height
  );
  const numberOfVisibleTrees =
    blockingTreeIndex === -1 ? sliceIndex : blockingTreeIndex + 1;
  return numberOfVisibleTrees;
}
function getNumberOfVisibleTreesRightOrBelow(axis, sliceIndex, height) {
  const blockingTreeIndex = getIndexOfTallerTreesRightOrBelow(
    axis,
    sliceIndex,
    height
  );
  const numberOfVisibleTrees =
    blockingTreeIndex === -1
      ? axis.length - sliceIndex - 1
      : blockingTreeIndex + 1;
  return numberOfVisibleTrees;
}

function getNumberOfVisibleTrees() {
  let hiddenTrees = 0;
  let visibleTrees = 0;
  forestMap.forEach((row, yIndex) => {
    const xTrees = row.split("");
    for (let xIndex = 0; xIndex < xTrees.length; xIndex++) {
      const yTrees = horizontalTrees[xIndex];
      // Left
      getIndexOfTallerTreesLeftOrAbove(xTrees, xIndex, row[xIndex]) === -1
        ? (visibleTrees += 1)
        : // Right
        getIndexOfTallerTreesRightOrBelow(xTrees, xIndex, row[xIndex]) === -1
        ? (visibleTrees += 1)
        : // Above
        getIndexOfTallerTreesLeftOrAbove(yTrees, yIndex, row[xIndex]) === -1
        ? (visibleTrees += 1)
        : // Below
        getIndexOfTallerTreesRightOrBelow(yTrees, yIndex, row[xIndex]) === -1
        ? (visibleTrees += 1)
        : (hiddenTrees += 1);
    }
  });
  console.log("Visible: ", visibleTrees);
}

const scenicScores = {};
function getScenicScores() {
  forestMap.forEach((row, yIndex) => {
    const xTrees = row.split("");
    for (let xIndex = 0; xIndex < xTrees.length; xIndex++) {
      const viewingDistanceLeft = getNumberOfVisibleTreesLeftOrAbove(
        xTrees,
        xIndex,
        row[xIndex]
      );
      const viewingDistanceRight = getNumberOfVisibleTreesRightOrBelow(
        xTrees,
        xIndex,
        row[xIndex]
      );
      const yTrees = horizontalTrees[xIndex];
      const viewingDistanceAbove = getNumberOfVisibleTreesLeftOrAbove(
        yTrees,
        yIndex,
        row[xIndex]
      );
      const viewingDistanceBelow = getNumberOfVisibleTreesRightOrBelow(
        yTrees,
        yIndex,
        row[xIndex]
      );
      const scenicScore =
        viewingDistanceLeft *
        viewingDistanceRight *
        viewingDistanceAbove *
        viewingDistanceBelow;
      scenicScores[`${yIndex}-${xIndex}`] = scenicScore;
    }
  });
}

function getHighestScore(object) {
  getScenicScores();
  let highestScore = 0;
  for (const key in object) {
    if (object[key] > highestScore) {
      highestScore = object[key];
    }
  }
  console.log("Highest score: ", highestScore);
}

getNumberOfVisibleTrees();
getHighestScore(scenicScores);
