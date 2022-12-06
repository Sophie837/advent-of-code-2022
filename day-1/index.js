const { readFileSync, promises: fsPromises } = require("fs");
const inventory = readFileSync("day-1/a/input.txt", "utf-8").split("\n\n");

const totalCalloriesPerReindeer = inventory.map((reindeer) =>
  reindeer.split("\n").reduce((a, b) => Number(a) + Number(b), 0)
);
const greatestCalloryCount = Math.max(...totalCalloriesPerReindeer);
console.log(greatestCalloryCount);
