import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData('./inputs/day07input.txt');
const instructions = data.split("\n");

const folders = [];
const MAXSIZE = 100000;

const listIndexes = [];

function makeFolder(name, parent) {
  return {
    name,
    size: 0,
    parent,
    complete: false
  }
}

instructions.forEach((line, index) => {
    if (line.includes('$ ls')) {
      listIndexes.push(index);
    }
  })

  const rootFolder = makeFolder('/', '');
  folders.push(rootFolder)

  listIndexes.forEach((index) => {
    // name of current folder
    const dirToList = instructions[index - 1].split(' ').pop();
    // get the files in this folder
    const contents = [];
    for (let j = index + 1; j < instructions.length; j++) {
      if (instructions[j].includes('$')) {
        break;
      }
      contents.push(instructions[j]);
    }
    // see if any directories exist - if so, make a folder for them with the parent value
    const childFolders = contents.filter((type) => type.includes('dir')).map((val) => val.split(' ').pop());
    if (childFolders.length > 0) {
      childFolders.map((folder) => {
        const newFolder = makeFolder(folder, dirToList);
        folders.push(newFolder);
      })
    }
  })

console.log(folders)














// function makeDir() {
//   return {
//     name: '',
//     parent: '',
//     size: 0,
//     fileIndexes: [],
//     dirIndexes: [],
//     // instIndex: 0
//   }
// }

// const directories = [];
// const listIndexes = [];
// const MAXSIZE = 100000;

// instructions.forEach((line, index) => {
//   if (line.includes('$ ls')) {
//     listIndexes.push(index);
//   }
// })

// listIndexes.forEach((index) => {
//   const dir = instructions[index - 1].split(' ').pop();
//   const tempDir = new makeDir();
//   tempDir.name = dir;
//   // tempDir.instIndex = instructions.indexOf(`dir ${dir}`);
//   // if (tempDir.instIndex === -1) {
//   //   tempDir.instIndex = 0;
//   // }

//   const contents = [];
//   for (let j = index + 1; j < instructions.length; j++) {
//     if (instructions[j].includes('$')) {
//       break;
//     }
//     contents.push([instructions[j], j]);
//   }

//   contents.forEach((piece) => {
//     if (piece[0].includes('dir')) {
//       tempDir.dirIndexes.push(piece[1]);
//     } else {
//       tempDir.fileIndexes.push(piece[1]);
//       tempDir.size += Number(piece[0].split(' ').shift());
//     }
//   })

//   directories.push(tempDir);
// })

// function calcFullSize(dir) {
//   console.log('dir: ', dir)
//   let total = dir.size;
//   const childDirs = dir.dirIndexes;
//   // childDirs
//   for (let i = 0; i < childDirs.length; i++) {
//     console.log(childDirs[i])
//     const next = directories.find((item) => instructions[childDirs[i]].includes(item.name) && item.parent === dir.name);
//     console.log('next: ', next)
//     if (next.dirIndexes.length !== 0) {
//       total += calcFullSize(next);
//     } else {
//       total += next.size;
//     }
//   }
//   return total;
// }

// function findParent(dir) {
//   const items = dir.dirIndexes.map((index) => instructions[index]);
//   console.log(items)
//   const parent = directories.find((item) => item.dirIndexes.includes(dir.instIndex));
//   // console.log(parent);
//   if (!parent) {
//     return ''
//   }
//   return parent.name;
// }


// directories.forEach((dir) => dir.parent = findParent(dir))
// // console.log(directories)

// directories.forEach((dir) => dir.size = calcFullSize(dir));

// console.log(directories)

// let sumAboveMax = 0;

// directories.forEach((dir) => {
//   if (dir.size < MAXSIZE) {
//     sumAboveMax += dir.size;
//   }
// })

// console.log(sumAboveMax)
