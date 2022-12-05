// import * as h from '../utils/helpers.ts';
import { readFileSync } from "node:fs";

const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};
const splitOnSpaces = (data) => data.split("\n\n");
const strInput = (data) => data.split("\n");

const data = await readData('./inputs/day05input.txt');
const splitData = splitOnSpaces(data);

const crateData = strInput(splitData[0]);
const numCrates = crateData.pop().split('').reduce((acc, val) => {
  if (val !== ' ') {
    acc.push(+val);
  }
  return acc;
}, []);

const originalStacks = {};

numCrates.forEach((stack) => {
  originalStacks[stack] = [];
})

crateData.forEach((row) => {
  const splitRow = row.split(/\s{1,4}/);
  splitRow.map((crate, index) => {
    if (crate === '') return;
    const crateName = crate.slice(1, 2);
    originalStacks[index + 1].push(crateName)
  })
})

const steps = strInput(splitData[1]).map((step) => {
  return step.split(' ');
});

// part 1
// const stacks = {...originalStacks};

// for (let i = 0; i < steps.length; i++) {
//   const move = steps[i];
//   const qty = move[1];
//   const from = move[3];
//   const to = move[5];
  
//   for (let j = 0; j < qty; j++) {
//     const toMove = stacks[from].shift();
//     stacks[to].unshift(toMove);
//   }
// }

// const topCrates = Object.values(stacks).map((stack) => stack[0]).join('');
// console.log(topCrates)

// part 2
const updatedStacks = {...originalStacks};

for (let i = 0; i < steps.length; i++) {
  const move = steps[i];
  const qty = move[1];
  const from = move[3];
  const to = move[5];
  let toMove = [];
  for (let j = 0; j < qty; j++) {
    toMove.push(updatedStacks[from].shift())
  }
  updatedStacks[to].unshift(...toMove);
}

const newTopCrates = Object.values(updatedStacks).map((stack) => stack[0]).join('');
console.log(newTopCrates)