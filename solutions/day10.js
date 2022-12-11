import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData("./inputs/day10input.txt");
const program = data.split("\n");

let X = 1;
let cycle = 0;
let stepCount = 0;
let cycleHold = false;
let addVal = 0;
let nextSignalCheck = 20;
const strengths = [];

const addCount = program.filter((step) => step.includes('addx'));
const noopCount = program.filter((step) => step.includes('noop'));
const totalCycles = (addCount.length * 2) + noopCount.length;

for (let i = 0; i < totalCycles; i++) {
  console.log('start ', addVal, X);
  if (cycle === nextSignalCheck) {
    const signal = cycle * X;
    strengths.push([nextSignalCheck, signal]);
    nextSignalCheck += 40;
    console.log(cycle, X)
    console.log(signal)
  }
  const step = program[stepCount];
  if (step.includes('addx')) {
    if (cycleHold) {
      // 2nd cycle
      cycleHold = false;
      addVal = Number(step.split(' ').pop());
      stepCount++;
    } else {
      // 1st cycle
      cycleHold = true;
      addVal = 0;
    }
  } else {
    stepCount++;
    addVal = 0;
  }
  
  cycle++;
  X += addVal;
  console.log('end ', addVal, X);

  // console.log('x is ', X, ' cycle is ', cycle, ' step ', stepCount)
}