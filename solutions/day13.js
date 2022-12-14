import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day13input.txt');
const pairs = h.splitOnSpaces(data).map((pair) => h.strInput(pair));
// console.log(pairs);

// part 1
const indices = [];
const pattern = /(\[{1}(\d,*)*\]{1})|(\d)/g;

// compare piece by piece - first is left, second is right
// if both ints - left < right ? correct order; left > ? incorrect; equal continue
// if both lists - go into the lists and compare the ints; if still going and left list runs out first ? correct order; right runs out first ? incorrect; equal continue
// if one is a list and other is an int - turn the int into an array then compare as lists
// once a correct answer is found, add the pair number to indices


// will have to come back to this with more brain power - I tried to parse out the different array groups but can't quite get it to match exactly how I think it needs to. Is likely better to completely split by commas and parse bit by bit, handling the brackets as they come, but brain just isn't working enough right now to deal with parsing that way

// for (let i = 0; i < pairs.length; i++) {
//   let depth = 0;

//   // this works for most cases - however doesn't capture nested arrays 
//   const left = pairs[i][0].match(pattern);
//   const right = pairs[i][1].match(pattern);
//   console.log(left, right);

//   // for (let j = 0; j < left.length; j++) {
//   //   const leftVal = left[j];
//   //   const rightVal = right[j];
//   // }
// }