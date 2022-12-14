import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};
const data = await readData("./inputs/day11input.txt");
const monkeysData = data.split("\n\n");

function Monkey(monkey) {
  return {
    number: monkey[0],
    items: [...monkey[1]],
    worryOp: monkey[2],
    testVal: monkey[3],
    testTrue: monkey[4],
    testFalse: monkey[5],
    totalInspected: 0,
    calcOp(n) {
      const op = this.worryOp.split(" ");
      const mathType = op[1];
      const step2 = op[2] === "old" ? n : +op[2];
      switch (mathType) {
        case "+":
          return n + step2;
        case "-":
          return n - step2;
        case "*":
          return n * step2;
        case "/":
          return n / step2;
      }
    },
    calcTest(n) {
      return Number.isInteger(n / +this.testVal) ? true : false;
    },
  };
}

// build monkey objects
function buildMonkeyList() {
  const arr = [];
  for (let i = 0; i < monkeysData.length; i++) {
    const monkeyLines = monkeysData[i].split("\n");
    const mitems = monkeyLines[1]
      .split(": ")
      .pop()
      .split(", ")
      .map((item) => +item);
    const mop = monkeyLines[2].split("new = ").pop();
    const test = monkeyLines[3].split("Test: divisible by ").pop();
    const ttrue = Number(monkeyLines[4].split(" ").pop());
    const tfalse = Number(monkeyLines[5].split(" ").pop());
    const monkey = Monkey([i, mitems, mop, test, ttrue, tfalse]);
    arr.push(monkey);
  }
  return arr;
}

// part 1
let maxRounds = 20;
const monkeys1 = buildMonkeyList();

for (let i = 0; i < maxRounds; i++) {
  monkeys1.forEach((monkey) => {
    while (monkey.items.length > 0) {
      const item = monkey.items.shift();
      monkey.totalInspected++;
      const addWorry = monkey.calcOp(item);
      const lowerWorry = Math.floor(addWorry / 3);
      const testResult = monkey.calcTest(lowerWorry);
      testResult
        ? monkeys1[monkey.testTrue].items.push(lowerWorry)
        : monkeys1[monkey.testFalse].items.push(lowerWorry);
    }
  });
}

const monkeyActivity = monkeys1
  .map((monkey) => monkey.totalInspected)
  .sort((a, b) => b - a);
const monkeyBusiness = monkeyActivity[0] * monkeyActivity[1];
console.log(monkeyBusiness);

// part 2
// probably needs calculation of least common multiple, but can't figure out where to apply it or which numbers to use.
