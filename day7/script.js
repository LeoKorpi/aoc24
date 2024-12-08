const fs = require("fs");
const path = require("path");

// Recursive function to check validity for a line
function decisionTreeSearch(target, numbers, index = 0, currentResult = 0) {
  // Base case: All numbers are processed and the tree has reached the target sum
  if (index === numbers.length) {
    return currentResult === target;
  }

  const nextNum = numbers[index];

  // Pruning: Stop exploring if currentResult exceeds the target
  if (currentResult > target) {
    return false;
  }

  // Explore both '+' and '*' paths
  return (
    decisionTreeSearch(target, numbers, index + 1, currentResult + nextNum) || // '+' path
    decisionTreeSearch(target, numbers, index + 1, currentResult * nextNum) // '*' path
  );
}

// Process the file
function processFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8").replace(/\r\n?/g, "\n");
  //Split to process line by line
  const lines = data.split("\n").filter((line) => line.trim() !== "");

  let totalSum = 0;

  const results = lines.map((line) => {
    const [target, rest] = line.split(":");
    const targetNumber = parseInt(target.trim(), 10);
    const numbers = rest
      .trim()
      .split(/[ ,]+/) // Split by spaces or commas
      .map((num) => parseInt(num.trim(), 10));

    // Perform decision tree search for this line
    const isValid = decisionTreeSearch(targetNumber, numbers);
    if (isValid) totalSum += targetNumber;

    return { line, isValid };
  });

  // Output valid lines and total sum
  const validLines = results
    .filter((result) => result.isValid)
    .map((result) => result.line);
  console.log(
    `Valid Lines (${validLines.length}/${lines.length}):`,
    validLines
  );
  console.log(`Sum of Target Numbers for Valid Lines: ${totalSum}`);
}

processFile(path.resolve(__dirname, "input.txt"));
