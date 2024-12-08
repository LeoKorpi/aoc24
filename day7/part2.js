const fs = require("fs");
const path = require("path");

// Helper function to calculate the concatenations
function concatenate(left, right) {
  /**
   * formula: left || right = left * 10^digits(right) + right
   * eg. 12 || 345 = 12 * 10^3 + 345 = 12345
   * */
  const digits = Math.floor(Math.log10(right)) + 1;
  return left * Math.pow(10, digits) + right;
}

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

  // Explore '+' path
  if (decisionTreeSearch(target, numbers, index + 1, currentResult + nextNum)) {
    return true;
  }

  // Explore '*' path
  if (decisionTreeSearch(target, numbers, index + 1, currentResult * nextNum)) {
    return true;
  }

  // Explore '||' (concatenation) path
  const concatenated = concatenate(currentResult, nextNum);
  if (decisionTreeSearch(target, numbers, index + 1, concatenated)) {
    return true;
  }

  return false;
}

// Process the file line by line
function processFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8").replace(/\r\n?/g, "\n");
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
