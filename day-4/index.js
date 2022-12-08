const { readFileSync, promises: fsPromises } = require("fs");
const allAssignmentPairs = readFileSync("day-4/input.txt", "utf-8")
  .split("\n")
  .filter((pair) => pair.length > 0);

function sumOfFullyContainedAssignmentPairs() {
  let fullyContainedAssignmentPairs = 0;
  allAssignmentPairs.map((assignmentPair) => {
    const pairBoundary = assignmentPair.match(/\d+/g);
    if (
      (Number(pairBoundary[2]) >= Number(pairBoundary[0]) &&
        Number(pairBoundary[3]) <= Number(pairBoundary[1])) ||
      (Number(pairBoundary[0]) >= Number(pairBoundary[2]) &&
        Number(pairBoundary[1]) <= Number(pairBoundary[3]))
    ) {
      fullyContainedAssignmentPairs += 1;
    }
  });
  console.log(fullyContainedAssignmentPairs);
}

function sumOfOverlappingAssignmentPairs() {
  let overlappingAssignmentPairs = 0;
  allAssignmentPairs.map((assignmentPair) => {
    const pairBoundary = assignmentPair.match(/\d+/g);
    if (
      (Number(pairBoundary[2]) >= Number(pairBoundary[0]) &&
        Number(pairBoundary[2]) <= Number(pairBoundary[1])) ||
      (Number(pairBoundary[3]) >= Number(pairBoundary[0]) &&
        Number(pairBoundary[2]) <= Number(pairBoundary[1])) ||
      (Number(pairBoundary[0]) >= Number(pairBoundary[2]) &&
        Number(pairBoundary[0]) <= Number(pairBoundary[3])) ||
      (Number(pairBoundary[1]) >= Number(pairBoundary[2]) &&
        Number(pairBoundary[1]) <= Number(pairBoundary[3]))
    ) {
      overlappingAssignmentPairs += 1;
    }
  });
  console.log(overlappingAssignmentPairs);
}

sumOfFullyContainedAssignmentPairs();
sumOfOverlappingAssignmentPairs();
