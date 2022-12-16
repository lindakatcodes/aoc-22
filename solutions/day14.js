import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day14input.txt');

const rockPaths = h.strInput(data).map((path) => path.split(' -> ').map((pair) => pair.split(',')));

// collect all the x and y values to figure out the size of our cave
const allX = [];
const allY = [];

rockPaths.forEach((row) => {
  row.forEach((pair) => {
    allX.push(+pair[0]);
    allY.push(+pair[1]);
  });
})
allX.sort((a, b) => a - b);
allY.sort((a, b) => a - b);

// find all the rock paths we need to fill so we can plot the points
const allRockPoints = new Set();
for (let i = 0; i < rockPaths.length; i++) {
  const path = rockPaths[i];
  for (let a = 0; a < path.length - 1; a++) {
    const start = path[a].map((val) => +val);
    const end = path[a + 1].map((val) => +val);
   
    if (start[0] === end[0]) {
      // X is the same, build out Y
      const yvals = [];
      if (start[1] < end[1]) {
        for (let j = start[1]; j <= end[1]; j++) {
          yvals.push(j);
        }
      } else {
        for (let j = start[1]; j >= end[1]; j--) {
          yvals.push(j);
        }
      }
      yvals.forEach((val) => allRockPoints.add(`${start[0]}, ${val}`));
    } else {
      // Y is the same, build out X
      const xvals = [];
      if (start[0] < end[0]) {
        for (let j = start[0]; j <= end[0]; j++) {
          xvals.push(j);
        }
      } else {
        for (let j = start[0]; j >= end[0]; j--) {
          xvals.push(j);
        }
      }
      xvals.forEach((val) => allRockPoints.add(`${val}, ${start[1]}`));
    }
  }
}

// mark the ends of the cave and draw the cave's original map
const lowX = allX[0];
const highX = allX[allX.length - 1];
const highY = allY[allY.length - 1];
const cave = [];
const sandStartX = 500 - lowX;

for (let y = 0; y <= highY; y++) {
  const row = [];
  for (let x = lowX; x <= highX; x++) {
    const isRock = allRockPoints.has(`${x}, ${y}`);
    // mark the sand starting point when we hit it; otherwise proceed as regular
    if (x === 500 && y === 0) {
      row.push('+');
    } else {
      isRock ? row.push('#') : row.push('.');
    }
  }
  cave.push(row);
}

// need to know the outermost rock on the left and the right to know when to stop
let leftmostY = 0;
let rightmostY = 0;
cave.forEach((row, index) => {
  if (row[0] === '#') {
    leftmostY = index;
  }
  if (row[row.length - 1] === '#') {
    rightmostY = index;
  }
})
const leftmost = [leftmostY, 0];
const rightmost = [rightmostY, cave[0].length - 1];

// part 1
let sandCounter = 0;
let endReached = false;

function nextPosition(pos) {
  let noMove = false;
  let newPos = [];
  // check down
  if (+pos[0] + 1 > cave.length - 1) {
    endReached = true;
    return pos;
  }
  const down = cave[+pos[0] + 1][+pos[1]];
  if (down === '.') {
    newPos = [+pos[0] + 1, +pos[1]];
  } else {
    // check left
    if (+pos[0] + 1 > cave.length - 1 || +pos[1] - 1 < 0) {
      endReached = true;
      return pos;
    }
    const left = cave[+pos[0] + 1][+pos[1] - 1];
    if (left === '.') {
      newPos = [+pos[0] + 1, +pos[1] - 1];
    } else {
      // check right
      if (+pos[0] + 1 > cave.length - 1 || +pos[1] + 1 > cave[0].length - 1) {
        endReached = true;
        return pos;
      }
      const right = cave[+pos[0] + 1][+pos[1] + 1];
      if (right === '.') {
        newPos = [+pos[0] + 1, +pos[1] + 1];
      } else {
        noMove = true;
      }
    }
  }
  if (noMove) {
    return pos;
  } else {
    return newPos;
  }
}

function checkBounds(pos) {
  const leftOut = pos[0] === leftmost[0] - 1 && pos[1] === leftmost[1];
  const rightOut = pos[0] === rightmost[0] - 1 && pos[1] === rightmost[1];
  if (leftOut || rightOut) {
    return true;
  }
  return false;
}

function placeSand() {
  let position = [0, sandStartX];
  let finalSpotFound = false;

  while (!finalSpotFound) {
    const next = nextPosition(position);
    const outofBounds = checkBounds(next);
    if (outofBounds) {
      endReached = true;
      break;
    }
    if (next[0] === position[0] && next[1] === position[1]) {
      finalSpotFound = true;
      cave[position[0]][position[1]] = 'o';
    } else {
      position = next;
    }
  }
}

while (!endReached) {
  placeSand();
  if (!endReached) {
    sandCounter++;
  }
}

console.log(sandCounter);

// const visualMap = cave.map((row) => row.join(''))
// console.log(visualMap)