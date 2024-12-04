const fs = require("node:fs");
const filePath = "./day4/input.txt";
let arr;

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

function partTwo(arr) {
  let counts = 0;

  // start on second row and quit before last becuase
  // there are no corners on the first and last row
  for (let i = 1; i < arr.length - 1; i++) {
    const row = arr[i];

    // same is true for columns
    for (let k = 1; k < row.length - 1; k++) {
      // Check for 'A' in the center of a possible cross
      if (row[k] !== "A") continue;

      // Extract the corners
      const tl = arr[i - 1][k - 1]; //top-left
      const tr = arr[i - 1][k + 1]; //top-right
      const bl = arr[i + 1][k - 1]; //bottom-left
      const br = arr[i + 1][k + 1]; //bottom-right

      // Skip if the corners contains invalid characters (another 'A' or an 'X')
      if ([tl, tr, bl, br].includes("A") || [tl, tr, bl, br].includes("X"))
        continue;

      // Validate diagonal pairs
      const validMap = { MS: true, SM: true };
      const isValidDiagonal1 = validMap[tl + br];
      const isValidDiagonal2 = validMap[tr + bl];

      // increment count if both pairs are valid
      if (isValidDiagonal1 && isValidDiagonal2) counts += 1;
    }
  }
  return counts;
}

try {
  arr = readFileToGrid(filePath);
  console.log("the number of x-mas patters are: " + partTwo(arr));
} catch (err) {
  console.error("Error: " + err);
}
