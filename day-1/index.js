const { readFileSync, promises: fsPromises } = require("fs");
const inventory = readFileSync("day-1/input.txt", "utf-8").split("\n\n");

const totalCaloriesPerReindeer = inventory.map((reindeer) =>
  reindeer.split("\n").reduce((a, b) => Number(a) + Number(b), 0)
);
const topCalorieCount = Math.max(...totalCaloriesPerReindeer);
console.log(topCalorieCount);
const topThreeCalorieCount = totalCaloriesPerReindeer
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);
console.log(topThreeCalorieCount);
