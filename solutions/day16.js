import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day16input.txt');



let timeLeft = 30;
const startValve = 'AA';

const valve = {
  name,
  flow,
  canReach,
  open,
}

// for a given value I'm on, want to check all it can reach - for each, how soon can I release more pressure? 
// compare results and do the one that gives me the most overall pressure release in the least time