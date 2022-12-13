import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData("./inputs/day09input.txt");
const moves = data.split("\n");

// part 1
let hx = 0;
let hy = 0;
let tx = 0;
let ty = 0;

const tailVisits = new Set();

tailVisits.add(`${tx} ${ty}`);

for (let i = 0; i < moves.length; i++) {
  const split = moves[i].split(" ");
  const direction = split[0];
  const steps = +split[1];

  for (let j = 0; j < steps; j++) {
    // move h
    switch (direction) {
      case "U":
        hy++;
        break;
      case "D":
        hy--;
        break;
      case "L":
        hx--;
        break;
      case "R":
        hx++;
        break;
    }

    // sideways if x or y are the same
    if (hx === tx || hy === ty) {
      if (hx === tx && Math.abs(hy - ty) === 2) {
        direction === "U" ? ty++ : ty--;
      }
      if (hy === ty && Math.abs(hx - tx) === 2) {
        direction === "R" ? tx++ : tx--;
      }
    } else {
      // otherwise diagonal
      const xdiff = Math.abs(hx - tx);
      const ydiff = Math.abs(hy - ty);
      if (xdiff === 2 || ydiff === 2) {
        switch (direction) {
          case "U":
            ty = hy - 1;
            tx = hx;
            break;
          case "D":
            ty = hy + 1;
            tx = hx;
            break;
          case "L":
            ty = hy;
            tx = hx + 1;
            break;
          case "R":
            ty = hy;
            tx = hx - 1;
            break;
        }
      }
    }
    tailVisits.add(`${tx} ${ty}`);
  }
}

console.log(tailVisits);
console.log(tailVisits.size);

/**
 * tried to duplicate and adjust part 1 to work for part 2 and was checking the original first example
 * but I'm getting 2 values for the tail - the 0,0 I expect and also 9,2
 * so needs to be debugged and then tested on the larger example before this is any good
 */

// part 2 
// const xvals = [0,0,0,0,0,0,0,0,0,0];
// const yvals = [0,0,0,0,0,0,0,0,0,0];
// const tailVals = new Set();
// tailVals.add(`0 0`);

// function getNewLocation(hx, hy, tx, ty, direction) {
//   // sideways if x or y are the same
//   if (hx === tx || hy === ty) {
//     if (hx === tx && Math.abs(hy - ty) === 2) {
//       direction === "U" ? ty++ : ty--;
//     }
//     if (hy === ty && Math.abs(hx - tx) === 2) {
//       direction === "R" ? tx++ : tx--;
//     }
//   } else {
//     // otherwise diagonal
//     const xdiff = Math.abs(hx - tx);
//     const ydiff = Math.abs(hy - ty);
//     if (xdiff === 2 || ydiff === 2) {
//       switch (direction) {
//         case "U":
//           ty = hy - 1;
//           tx = hx;
//           break;
//         case "D":
//           ty = hy + 1;
//           tx = hx;
//           break;
//         case "L":
//           ty = hy;
//           tx = hx + 1;
//           break;
//         case "R":
//           ty = hy;
//           tx = hx - 1;
//           break;
//       }
//     }
//   }
//   return [tx, ty];
// }

// for (let i = 0; i < moves.length; i++) {
//   const split = moves[i].split(" ");
//   const direction = split[0];
//   const steps = +split[1];

//   for (let j = 0; j < steps; j++) {
//     // move h
//     switch (direction) {
//       case "U":
//         yvals[0] = yvals[0] + 1;
//         break;
//       case "D":
//         yvals[0] = yvals[0] - 1;
//         break;
//       case "L":
//         xvals[0] = xvals[0] - 1;
//         break;
//       case "R":
//         xvals[0] = xvals[0] + 1;
//         break;
//     }

//     for (let a = 0; a < xvals.length - 1; a++) {
//       const updates = getNewLocation(xvals[a], yvals[a], xvals[a + 1], yvals[a + 1], direction);
//       xvals[a + 1] = updates[0];
//       yvals[a + 1] = updates[1];
//     }
//   tailVals.add(`${xvals[9]} ${yvals[9]}`);
//   }
// }

// console.log(tailVals)