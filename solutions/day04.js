import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day04input.txt');
const pairs = h.strInput(data).map((pair) => pair.split(','));

let overlaps = 0;

function buildArray(pair) {
  const seq = [];
  for (let i = +pair[0]; i <= +pair[1]; i++) {
    seq.push(+i);
  }
  return seq;
}

for (let i = 0; i < pairs.length; i++) {
  const elf1 = pairs[i][0].split('-').map((val) => +val);
  const elf2 = pairs[i][1].split('-').map((val) => +val);
  
  const match1 = elf1[0] >= elf2[0] && elf1[1] <= elf2[1];
  const match2 = elf2[0] >= elf1[0] && elf2[1] <= elf1[1];

  if (match1 || match2) {
    overlaps++;
  }
}

// part 1
console.log(overlaps);

let fullOverlaps = 0;

for (let i = 0; i < pairs.length; i++) {
  const elf1 = buildArray(pairs[i][0].split('-'));
  const elf2 = buildArray(pairs[i][1].split('-'));

  const fullArea = new Set(elf1);
  elf2.forEach((val) => fullArea.add(val));

  if (fullArea.size !== (elf1.length + elf2.length)) {
    fullOverlaps++;
  }
}

// part 2
console.log(fullOverlaps);