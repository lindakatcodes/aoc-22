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
let passCount = 0;
let addVal = 0;
let nextSignalCheck = 20;
const strengths = [];

const addCount = program.filter((step) => step.includes('addx'));
const noopCount = program.filter((step) => step.includes('noop'));
const totalCycles = (addCount.length * 2) + noopCount.length;

for (let i = 0; i < totalCycles; i++) {
  cycle++;
  if (cycle === nextSignalCheck) {
    const signal = cycle * X;
    strengths.push([nextSignalCheck, signal]);
    nextSignalCheck += 40;
  }
  const step = program[stepCount];
  if (step.includes('addx')) {
    if (!cycleHold) {
      // first pass
      cycleHold = true;
      addVal = 0;
    } else {
      // second pass
      cycleHold = false;
      stepCount++;
      addVal = Number(step.split(' ').pop());
    }
  } else {
    stepCount++;
    addVal = 0;
  }
  X += addVal;
}

const signalSums = strengths.reduce((acc, sig) => acc + sig[1], 0);
console.log(signalSums);