import { readFileSync } from "node:fs";
const readData = async function (filePath) {
  return readFileSync(filePath).toString();
};

const data = await readData('./inputs/day07input.txt');
const instructions = data.split("\n");

const TOTALSIZE = 70000000;
const FREESPACE = 30000000;
const MAXSIZE = 100000;
const directories = [];

function makeFolder(name, parent) {
  return {
    name,
    parent,
    size: 0,
    folderContents: []
  }
}

// using this to determine if I've already interacted with this folder name
const instWithMarker = instructions.map((line) => [line, false]);

const rootFolder = makeFolder('/', null);
instWithMarker[0][1] = true;
instWithMarker[1][1] = true;

const rootContents = [];
for (let j = 2; j < instructions.length; j++) {
  if (instructions[j].includes('$')) {
    break;
  }
  rootContents.push(instructions[j]);
}

const rootChildFiles = rootContents.filter((type) => !type.includes('dir')).map((val) => val.split(' '));
const rootChildFolders = rootContents.filter((type) => type.includes('dir')).map((val) => val.split(' ').pop());

if (rootChildFiles.length > 0) {
  rootChildFiles.map((file) => {
    const adjFile = [+file[0], file[1]];
    rootFolder.folderContents.push(adjFile);
  })
}

if (rootChildFolders.length > 0) {
  rootChildFolders.map((folder) => {
    const newFolder = makeFolder(folder, '/');
    rootFolder.folderContents.push(newFolder);
    processFolder(newFolder, 2);
  })
}

// takes in a directory and it's parent listing index; fills the folder contents, and processes any children folders
function processFolder(dir, parentLs) {
  const cmd = `$ cd ${dir.name}`;
  const dirLs = instructions.findIndex((line, idx) => line === cmd && instWithMarker[idx][1] === false, parentLs) + 1;
  instWithMarker[dirLs - 1][1] = true;

  const dirContents = [];
  for (let j = dirLs + 1; j < instructions.length; j++) {
    if (instructions[j].includes('$')) {
      break;
    }
    dirContents.push(instructions[j]);
  }

  const childFiles = dirContents.filter((type) => !type.includes('dir')).map((val) => val.split(' '));
  const childFolders = dirContents.filter((type) => type.includes('dir')).map((val) => val.split(' ').pop());

  if (childFiles.length > 0) {
    childFiles.map((file) => {
      const adjFile = [+file[0], file[1]];
      dir.folderContents.push(adjFile);
    })
  }

  if (childFolders.length > 0) {
    childFolders.map((folder) => {
      const newFolder = makeFolder(folder, dir.name);
      dir.folderContents.push(newFolder);
      processFolder(newFolder, dirLs);
    })
  }
}

// counts the full size of a given directory
function calcSize(dir) {
  let size = 0;
  for (let i = 0; i < dir.folderContents.length; i++) {
    const item = dir.folderContents[i];
    if (!item.name) {
      // file type
      size += item[0];
    } else {
      // dir type
      const itemSize = calcSize(item);
      size += itemSize;
    }
  }
  dir.size = size;
  directories.push([dir.name, size])
  return size;
}

// calling it once on the root recursively lets it be called on all the inner folders
calcSize(rootFolder);

// part 1
const belowMax = directories.filter((dir) => dir[1] <= MAXSIZE);
const belowMaxSum = belowMax.reduce((acc, dir) => {
  return acc + dir[1];
}, 0)
console.log(belowMaxSum)

// part 2
const available = TOTALSIZE - rootFolder.size;
const sizeNeeded = FREESPACE - available;
const potentials = directories.filter((dir) => dir[1] > sizeNeeded);
potentials.sort((a, b) => a[1] - b[1]);
console.log(potentials[0]);