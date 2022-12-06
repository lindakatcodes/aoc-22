import { readFileSync } from "node:fs";

const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData('./inputs/day06input.txt');

const stream = data.split('');

let currentPacketTest = [];
let firstPacketDist = 0;
let startLength = 3;

function checkIfUnique(valArr) {
  const checked = [];
  let unique = false;
  const queue = [...valArr];

  for (let i = 0; i < valArr.length; i++) {
    const toCheck = queue.shift();
    if (queue.includes(toCheck)) {
      unique = false;
      break;
    } else {
      checked.push(toCheck);
    }
  }
  if (checked.length === startLength + 1) {
    unique = true;
  } else {
    unique = false;
  }
  return unique;
}

// part 1
for (let i = 0; i < stream.length; i++) {
  const signal = stream[i];
  if (currentPacketTest.length < startLength) {
    currentPacketTest.push(signal);
  } else {
    currentPacketTest.push(signal);
    const unique = checkIfUnique(currentPacketTest);

    if (unique) {
      // solution found
      firstPacketDist = i + 1;
      break;
    } else {
      currentPacketTest.shift();
    }
  }
}

 console.log(firstPacketDist)

// part 2
startLength = 13;
currentPacketTest = [];
firstPacketDist = 0;

for (let i = 0; i < stream.length; i++) {
  const signal = stream[i];
  
  if (currentPacketTest.length < startLength) {
    currentPacketTest.push(signal);
  } else {
    currentPacketTest.push(signal);
    
    const unique = checkIfUnique(currentPacketTest);

    if (unique) {
      // solution found
      firstPacketDist = i + 1;
      break;
    } else {
      currentPacketTest.shift();
    }
  }
}

console.log(firstPacketDist)
