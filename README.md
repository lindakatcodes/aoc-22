# Advent of Code 2022

Things were getting messy with my previous collection, so making a new repo just for this year.

## How to Run

This project uses Rust to create the setup files for each day. A file for the day's puzzle is created, and potentially an input file as well.

```node
npm run setup <day> [<input>]
```

Parameter types:
day - number; puzzle day you're on
input - boolean; if an input file is needed

## Folder setups

I've created some helpers for various common tasks. These are all located in the `utils` folder.

My goal is to have the helpers be TS based so they provide better intellisense when I import and use them in the solution files.

I'm writing the solutions in vanilla JS and debugging them using the Node debugger in VSCode.
