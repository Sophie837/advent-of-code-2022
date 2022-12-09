const { readFileSync, promises: fsPromises } = require("fs");
const datastreamBuffer = readFileSync("day-6/input.txt", "utf-8").split("");

for (let i = 0; i < datastreamBuffer.length; i++) {
  const fourCharacterSection = datastreamBuffer.slice(i, i + 4);
  const numberOfUniqueCharacters = new Set(fourCharacterSection).size;
  if (numberOfUniqueCharacters === 4) {
    return i + 4;
  }
}
