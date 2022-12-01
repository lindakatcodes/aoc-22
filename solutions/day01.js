const fs = require('fs');

const data = fs.readFileSync('../inputs/day01input.txt').toString();
const meals = data.split("\n\n").map((set) => set.split('\n').map((meal) => Number(meal)));

let maxCals = 0;
const mealCounts = [];

for (let i = 0; i < meals.length; i++) {
  let total = 0;
  const elf = meals[i];
  elf.forEach((meal) => total += meal);
  mealCounts.push(total);
  if (total > maxCals) {
    maxCals = total;
  }
}

console.log(maxCals);

function compareFn(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const sorted = mealCounts.sort(compareFn).reverse();
const topThree = sorted.slice(0, 3);
const part2 = topThree[0] + topThree[1] + topThree[2];
console.log(part2);