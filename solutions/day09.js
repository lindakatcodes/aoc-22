import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData("./inputs/day09input.txt");
const moves = data.split("\n");

// just need to keep track of x and y numbers; set to store the visit coords, so the final count will be the unique values
// h and t have to touch - either up/down/left/right or diagonal; tail has to be within 2 spots of h; t moves up/down/left/right if the positions touch - if diagonal, move is diagonal towards the h (so ends up a main direction)

// x is l/r, y is u/d - x always first

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

// console.log(tailVisits);
console.log(tailVisits.size);
