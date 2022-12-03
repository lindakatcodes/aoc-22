// import * as h from '../utils/helpers.ts';
import { readFileSync } from "node:fs";

const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const strInput = (data) => data.split("\n");

const data = await readData('./inputs/day03input.txt'); 
const allSacks = strInput(data);

// part 1
const items = [];

function findItem(sack) {
  const sackSize = sack.length / 2;
  const front = sack.slice(0, sackSize).split('');
  const back = sack.slice(sackSize).split('');
  let item = '';

  for (let i = 0; i < front.length; i++) {
    // search back for each letter - if it exists, that's the match and we can exit out
    const match = back.includes(front[i]);
    if (match) {
      // when the item is found, add to top level array
      item = front[i];
      break;
    }
  }
  return item;
}

allSacks.forEach((sack) => {
  const rebel = findItem(sack);
  items.push(rebel);
})

const priorities = items.map((item) => {
  let index = 0;
  
  const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  if (lower.includes(item)) {
    index = lower.indexOf(item) + 1;
  } else {
    index = upper.indexOf(item) + 27;
  }
  return index;
})
const sum = priorities.reduce((total, value) => total + value, 0)
// part 1 answer
console.log(sum)

// part 2
const items2 = [];

function findTrioItem(sack1, sack2, sack3) {
  let item = '';
  const firstSplit = sack1.split('');
  
  for (let i = 0; i < firstSplit.length; i++) {
    const letter = firstSplit[i];
    const match = sack2.includes(letter) && sack3.includes(letter);
    if (match) {
      item = letter;
      break;
    }
  }
  return item;
}

for (let i = 0; i < allSacks.length; i++) {
  const elves = [allSacks[i], allSacks[i+1], allSacks[i+2]];
  const elfBadge = findTrioItem(elves[0], elves[1], elves[2]);
  items2.push(elfBadge);
  i += 2;
}

const priorities2 = items2.map((item) => {
  let index = 0;
  
  const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  if (lower.includes(item)) {
    index = lower.indexOf(item) + 1;
  } else {
    index = upper.indexOf(item) + 27;
  }
  return index;
})

const sum2 = priorities2.reduce((total, value) => total + value, 0)
console.log(sum2)
