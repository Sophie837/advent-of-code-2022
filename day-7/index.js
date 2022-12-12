const { readFileSync, promises: fsPromises } = require("fs");
const terminalOutput = readFileSync("day-7/input.txt", "utf-8")
  .split("$ cd ")
  .filter((output) => output !== "");
const terminalOutputByCommand = terminalOutput.map((command) =>
  command.split("\n").filter((output) => output !== "")
);

const dirSizes = {};
let filePath = ["outerDir"];

function getFileSizePerDirectory(directory) {
  const files = directory.map((line) =>
    line.split(" ").filter((output) => output.match(/[0-9]/))
  );
  const fileSizes = files.reduce((a, b) => Number(a) + Number(b), 0);
  return fileSizes;
}

function getAccumulativeFileSizes() {
  terminalOutputByCommand.map((command) => {
    if (command[0] === "..") {
      filePath.splice(-1);
    } else if (command[0] === "/") {
      filePath.splice(1);
      dirSizes["outerDir"] = getFileSizePerDirectory(command);
    } else {
      const newDir = command[0];
      filePath = [...filePath, newDir];
      const newDirSize = getFileSizePerDirectory(command);
      for (let i = filePath.length; i > 0; i--) {
        const dirName = filePath.slice(0, i).join("-");
        dirSizes[dirName]
          ? (dirSizes[dirName] += newDirSize)
          : (dirSizes[dirName] = newDirSize);
      }
    }
  });
}

function getTotalDirectorySizeForSmallDirectories() {
  let totalSize = 0;
  for (const dir in dirSizes) {
    if (dirSizes[dir] <= 100000) {
      totalSize += dirSizes[dir];
    }
  }
  console.log("Total size of small directories: ", totalSize);
}

function getDirectoryToDelete() {
  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const usedSpace = dirSizes["outerDir"];
  const unusedSpace = totalSpace - usedSpace;
  const spaceToCreate = requiredSpace - unusedSpace;
  let potentialDirsToDelete = [];
  for (const dir in dirSizes) {
    if (dirSizes[dir] >= spaceToCreate) {
      potentialDirsToDelete = [...potentialDirsToDelete, dirSizes[dir]];
    }
  }
  console.log("Directory to delete: ", Math.min(...potentialDirsToDelete));
}

getAccumulativeFileSizes();
getTotalDirectorySizeForSmallDirectories();
getDirectoryToDelete();
