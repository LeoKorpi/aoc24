const fs = require("node:fs");
const word = "XMAS";
const filePath = "./day4/input.txt";

function readFileToGrid(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = [];
  const lineLength = 140;

  // split up each row into elements and the push to the array, creating a 2D-array
  for (let i = 0; i < content.length; i += lineLength + 1) {
    lines.push(content.slice(i, i + lineLength).split(""));
  }

  return lines;
}

// Counts the number of occurrences of the sent word in the 2D-array
function countWordOccurrences(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    { x: 0, y: 1 }, // Right
    { x: 0, y: -1 }, // Left
    { x: 1, y: 0 }, // Down
    { x: -1, y: 0 }, // Up
    { x: 1, y: 1 }, // Down-Right
    { x: 1, y: -1 }, // Down-Left
    { x: -1, y: 1 }, // Up-Right
    { x: -1, y: -1 }, // Up-Left
  ];

  let count = 0;

  // check for the word in every direction, returns true if found
  function isWordAt(x, y, direction, word) {
    for (let i = 0; i < word.length; i++) {
      const newX = x + i * direction.x;
      const newY = y + i * direction.y;
      if (
        newX < 0 ||
        newY < 0 ||
        newX >= rows ||
        newY >= cols ||
        grid[newX][newY] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  // Check every row, column and direction for the word
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const direction of directions) {
        if (isWordAt(row, col, direction, word)) {
          count++;
        }
      }
    }
  }

  return count;
}

try {
  const grid = readFileToGrid(filePath);
  const count = countWordOccurrences(grid, word);
  console.log(`The word ${word} appears ${count} times.`);
} catch (err) {
  console.error("Error: " + err);
}
