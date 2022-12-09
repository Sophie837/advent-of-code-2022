const { readFileSync, promises: fsPromises } = require("fs");
const datastreamBuffer = readFileSync("day-6/input.txt", "utf-8").split("");

function findMarker(n) {
  for (let i = 0; i < datastreamBuffer.length; i++) {
    const fourCharacterSection = datastreamBuffer.slice(i, i + n);
    const numberOfUniqueCharacters = new Set(fourCharacterSection).size;
    if (numberOfUniqueCharacters === n) {
      return i + n;
    }
  }
}

const startOfPacketMarker = findMarker(4);
const startOfMessageMarker = findMarker(14);
console.log(startOfPacketMarker);
console.log(startOfMessageMarker);
