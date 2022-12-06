const { readFileSync, promises: fsPromises } = require("fs");
const inventory = readFileSync("day-1/input.txt", "utf-8").split("\n\n");

const totalCalloriesPerReindeer = inventory.map((reindeer) =>
  reindeer.split("\n").reduce((a, b) => Number(a) + Number(b), 0)
);
const topCalloryCount = Math.max(...totalCalloriesPerReindeer);
console.log(topCalloryCount);
const topThreeCalloryCount = totalCalloriesPerReindeer
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);
console.log(topThreeCalloryCount);
