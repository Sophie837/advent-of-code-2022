const { readFileSync, promises: fsPromises } = require("fs");
const rucksackItems = readFileSync("day-3/input.txt", "utf-8").split("\n");
// console.log(rucksackItems);

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

function prioritySumOfIdentificationBadges() {
  let identificationBadges = [];
  for (let i = 0; i < rucksackItems.length; i += 3) {
    let groupRucksacks = rucksackItems.slice(i, i + 3);
    // console.log(groupRucksacks);
    const groupRucksackItems = groupRucksacks.map((rucksack) =>
      rucksack.split("")
    );
    // console.log(groupRucksackItems);
    const duplicateItem = groupRucksackItems[0].filter(
      (element) =>
        groupRucksackItems[1].includes(element) &&
        groupRucksackItems[2].includes(element)
    );
    const identificationBadge = [...new Set(duplicateItem)];
    identificationBadges = [...identificationBadges, ...identificationBadge];
  }
  //   console.log(identificationBadges);

  const priorityOfBadges = identificationBadges
    .map((char) =>
      char.toUpperCase() === char
        ? char.charCodeAt(0) - 38
        : char.charCodeAt(0) - 96
    )
    .reduce((a, b) => a + b, 0);

  console.log(priorityOfBadges);
}

prioritySumOfDuplicateItems();
prioritySumOfIdentificationBadges();
