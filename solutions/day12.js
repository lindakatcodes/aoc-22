import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};
const data = await readData('./inputs/day12input.txt');
const map = data.split('\n').map((row) => row.split('').map((val) => val.charCodeAt(0)));
let start = [];
let goal = [];
const cameFrom = new Map();


function getValidNeighbors(coordY, coordX) {
  const currVal = map[coordY][coordX];
  const up = coordY - 1 >= 0 ? map[coordY - 1][coordX] : undefined;
  const down = coordY + 1 < map.length ? map[coordY + 1][coordX] : undefined;
  const left = coordX - 1 >= 0 ? map[coordY][coordX - 1] : undefined;
  const right = coordX + 1 < map[0].length ? map[coordY][coordX + 1] : undefined;
  const moves = [];
  
  if (up && up <= currVal + 1) moves.push([coordY - 1, coordX]);
  if (down && down <= currVal + 1) moves.push([coordY + 1, coordX]);
  if (left && left <= currVal + 1) moves.push([coordY, coordX - 1]);
  if (right && right <= currVal + 1) moves.push([coordY, coordX + 1]);
  return moves;
}

// S is 83, E is 69
for (let i = 0; i < map.length; i++) {
  const row = map[i];
  if (row.includes(83)) {
    const startIndex = row.indexOf(83);
    start = [i, startIndex];
    row[startIndex] = 97;
  }
  if (row.includes(69)) {
    const goalIndex = row.indexOf(69);
    goal = [i, goalIndex];
    row[goalIndex] = 122;
  }
  if (start.length > 0 && goal.length > 0) {
    break;
  }
}

function findPath(start, cameFrom) {
  cameFrom.set(`${start[0]},${start[1]}`, null);
  const queue = [start];

  while (queue.length) {
    const current = queue.shift();

    if (current[0] === goal[0] && current[1] === goal[1]) {
      break;
    }

    const currentPotentials = getValidNeighbors(current[0], current[1]);

    for (let i = 0; i < currentPotentials.length; i++) {
      const potentialVal = [currentPotentials[i][0], currentPotentials[i][1]];
      const potentialStr = `${potentialVal[0]},${potentialVal[1]}`;
      if (!cameFrom.has(potentialStr)) {
        queue.push(potentialVal);
        cameFrom.set(potentialStr, current);
      }
    }
  }
}

function getFinalPath(start, cameFrom) {
  let path = [];
  let currentPoint = goal;

  while (currentPoint !== start) {
    path.push(currentPoint);
    currentPoint = cameFrom.get(`${currentPoint[0]},${currentPoint[1]}`);
  }
  return path;
}

// part 1
findPath(start, cameFrom);
const part1Path = getFinalPath(start, cameFrom);
console.log(part1Path.length);

// part 2
const allStartPoints = [];
map.forEach((row, rowIndex) => {
  row.forEach((val, valIndex) => {
    if (val === 97) {
      allStartPoints.push([rowIndex, valIndex])
    }
  })
})

const allPathLengths = [];

for (let i = 0; i < allStartPoints.length; i++) {
  const newCameFrom = new Map();
  findPath(allStartPoints[i], newCameFrom);

  if (newCameFrom.has(`${goal[0]},${goal[1]}`)) {
    const newPath = getFinalPath(allStartPoints[i], newCameFrom);
    allPathLengths.push(newPath.length);
  }
}
allPathLengths.sort((a, b) => a - b);
console.log(allPathLengths[0]);