const { readFileSync, promises: fsPromises } = require("fs");
const rucksackItems = readFileSync("day-3/input.txt", "utf-8").split("\n");

function prioritySumOfDuplicateItems() {
  const duplicateItems = rucksackItems.map((rucksack) => {
    const halfway = rucksack.length / 2;
    const compartment1 = rucksack.slice(0, halfway).split("");
    const compartment2 = rucksack.slice(halfway).split("");
    const duplicates = compartment1.filter((element) =>
      compartment2.includes(element)
    );
    return [...new Set(duplicates)];
  });

  const priorityOfItems = duplicateItems
    .flat()
    .map((char) =>
      char.toUpperCase() === char
        ? char.charCodeAt(0) - 38
        : char.charCodeAt(0) - 96
    )
    .reduce((a, b) => a + b, 0);

  console.log(priorityOfItems);
}

prioritySumOfDuplicateItems();
