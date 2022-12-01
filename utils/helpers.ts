// Read and return the input file
export const readData = async function (filePath: string) {
  return await fetch(filePath).then((response) => response.text());
};

// Splits the input into an array of strings based on new lines
export const strInput = (data: string): string[] => data.split("\n");

// Splits the input into an array of strings based on spaces
export const splitOnSpaces = (data: string): string[] => data.split("\n\n");

// Splits a single string input into an array of numbers, splitting on new lines
export const numInput = (data: string): number[] =>
  data.split("\n").map(Number);

// Creates an empty array of a given length
export function lenArray(num: number) {
  return Array.from(Array(num).keys());
}

// Removes all items from an array
export const clearArr = (arr: any) => arr.splice(0, arr.length);

// Returns an object with the items as keys and the number of appearances as values
export const counts = (arr: any) =>
  arr.reduce(function (allItems: any, item: any) {
    if (item in allItems) {
      allItems[item]++;
    } else {
      allItems[item] = 1;
    }
    return allItems;
  }, {});

// Returns the mean value of an array
export function mean(array: number[]): number {
  const sum: number = array.reduce((prev, curr) => prev + curr);
  return Math.floor(sum / array.length);
}

// Return the median value of an array
export function median(array: number[]): number {
  const sorted: number[] = array.sort((a, b) => a - b);
  if (array.length % 2 === 0) {
    return Math.floor(
      sorted[array.length / 2 - 1] + sorted[array.length / 2] / 2
    );
  } else {
    return Math.floor(sorted[array.length - 1 / 2]);
  }
}

// Get the triangular number sequence - the number of dots in a triangular pattern. Like a factorial, but for addition
export function triangleSequence(num: number): number {
  return (num * (num + 1)) / 2;
}

// Returns a factorial value for a given number
export function factorial(n: number): number {
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1);
}

// def heuristic(a, b):
//    # Manhattan distance on a square grid
//    return abs(a.x - b.x) + abs(a.y - b.y)

// frontier = PriorityQueue()
// frontier.put(start, 0)
// came_from = dict()
// came_from[start] = None

// while not frontier.empty():
//    current = frontier.get()

//    if current == goal:
//       break

//    for next in graph.neighbors(current):
//       if next not in came_from:
//          priority = heuristic(goal, next)
//          frontier.put(next, priority)
//          came_from[next] = current
