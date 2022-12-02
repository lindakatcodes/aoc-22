import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day02input.txt');
const rounds = h.strInput(data);

const moveScore = {
  'Rock': 1,
  'Paper': 2,
  'Scissors': 3
}

let total = 0;

function getOutcome(move1, move2) {
  let outcome = 0;
  // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
  // win = 6, draw = 3, lose = 0
  switch (move1) {
    case 'Rock': 
      if (move2 === 'Paper') {
        outcome = 6;
      } else if (move2 === 'Rock') {
        outcome = 3;
      }
      break;
      case 'Paper': 
      if (move2 === 'Scissors') {
        outcome = 6;
      } else if (move2 === 'Paper') {
        outcome = 3;
      }
      break;
      case 'Scissors': 
      if (move2 === 'Rock') {
        outcome = 6;
      } else if (move2 === 'Scissors') {
        outcome = 3;
      }
      break;
  }
  return outcome;
}

// part 1
for (let i = 0; i < rounds.length; i++) {
  const moves = rounds[i].split(' ').map((move) => {
    if (move === 'A' || move === 'X') {
      return 'Rock';
    } else if (move === 'B' || move === 'Y') {
      return 'Paper';
    } else {
      return 'Scissors';
    }
  });

  const outcome = getOutcome(moves[0], moves[1]);
  const roundScore = outcome + moveScore[moves[1]];
  total += roundScore;
}

console.log(total);

// part 2
total = 0;

for (let i = 0; i < rounds.length; i++) {
  const moves = rounds[i].split(' ').map((move) => {
    switch(move) {
      case 'A':
        return 'Rock';
      case 'B':
        return 'Paper';
      case 'C':
        return 'Scissors';
      case 'X':
        return 'lose';
      case 'Y':
        return 'draw';
      case 'Z':
        return 'win';
    }
  });

  let played = '';
  // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
  switch(moves[0]) {
    case 'Rock':
      if (moves[1] === 'win') played = 'Paper';
      if (moves[1] === 'draw') played = 'Rock';
      if (moves[1] === 'lose') played = 'Scissors';
      break;
    case 'Paper':
      if (moves[1] === 'win') played = 'Scissors';
      if (moves[1] === 'draw') played = 'Paper';
      if (moves[1] === 'lose') played = 'Rock';
      break;
    case 'Scissors':
      if (moves[1] === 'win') played = 'Rock';
      if (moves[1] === 'draw') played = 'Scissors';
      if (moves[1] === 'lose') played = 'Paper';
      break;
  }

  const outcome = getOutcome(moves[0], played);
  const roundScore = outcome + moveScore[played];
  total += roundScore;
}

console.log(total);