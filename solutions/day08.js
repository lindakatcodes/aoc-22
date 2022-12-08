import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData('./inputs/day08input.txt');
const trees = data.split("\n").map((row) => row.split('').map((tree) => +tree))

function isTreeVisible(value, cIdx, rIdx) {
  const left = trees[rIdx].slice(0, cIdx).every((val) => val < value);
  const right = trees[rIdx].slice(cIdx + 1).every((val) => val < value);
  const bottom = trees.map((row, idx) => {
    if (idx > rIdx) {
      return row[cIdx];
    }
  }).filter((val) => val !== undefined).every((val) => val < value);
  const top = trees.map((row, idx) => {
    if (idx < rIdx) {
      return row[cIdx];
    }
  }).filter((val) => val !== undefined).every((val) => val < value);
  // if any are true, return true / else return false
  if (left || right || bottom || top) return true;
  else return false;
}

// part 1
// all external are visible
let visibleTrees = (trees[0].length * 2) + (trees.length - 2) * 2;
let innerTrees = 0;
// each internal, only visible in a direction if all other numbers are lower than it
let cIndex = 1;
let rIndex = 1;
for (let i = 1; i < trees.length - 1; i++) {
  const row = trees[i];
  for (let j = 1; j < row.length - 1; j++) {
    const isVisible = isTreeVisible(row[j], cIndex, rIndex);
    if (isVisible) {
      innerTrees++;
    }
    cIndex++;
  }
  cIndex = 1;
  rIndex++;
}

visibleTrees += innerTrees;
console.log(visibleTrees);

// part 2
function countTrees(value, arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < value) {
      count++;
    } else if (arr[i] >= value) {
      count++;
      break;
    }
  }
  return count;
}
function getVisScore(value, cIdx, rIdx) {
  const left = trees[rIdx].slice(0, cIdx).filter((val) => val !== undefined);
  const right = trees[rIdx].slice(cIdx + 1).filter((val) => val !== undefined);
  const bottom = trees.map((row, idx) => {
    if (idx > rIdx) {
      return row[cIdx];
    }
  }).filter((val) => val !== undefined);
  const top = trees.map((row, idx) => {
    if (idx < rIdx) {
      return row[cIdx];
    }
  }).filter((val) => val !== undefined);
  // for each direction, count how many trees are visible (up to a number that's equal or bigger than value)
  const leftVis = countTrees(value, left.reverse());
  const rightVis = countTrees(value, right);
  const bottomVis = countTrees(value, bottom);
  const topVis = countTrees(value, top.reverse());
  // multiply all 4 values together and return it
  const scenicScore = leftVis * rightVis * bottomVis * topVis;
  return scenicScore;
}

let bestScore = 0;

cIndex = 0;
rIndex = 0;
for (let i = 0; i < trees.length; i++) {
  const row = trees[i];
  for (let j = 0; j < row.length; j++) {
    const visScore = getVisScore(row[j], cIndex, rIndex);
    if (visScore > bestScore) {
      bestScore = visScore;
    }
    cIndex++;
  }
  cIndex = 0;
  rIndex++;
}

console.log(bestScore);
