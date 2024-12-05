const fs = require("node:fs");
const filePath = `${__dirname}/input.txt`;
let data = [];

try {
  data = fs.readFileSync(filePath, "utf-8");
} catch (err) {
  return console.error("Error: " + err);
}

const pageOrderingRules = [];
const updates = [];
const lines = data.split("\n");
let currentSequence = [];

// Loop through each line in the file and either push it to rules or updates
lines.forEach((line) => {
  if (line.includes("|")) pageOrderingRules.push(line);
  else if (line.includes(","))
    currentSequence.push(line.split(",").map(Number));
  // Map the contents of the array to numbers
  else if (line === "" && currentSequence.length > 0) {
    updates.push(...currentSequence); // spread current sequence to updates
    currentSequence = []; // Reset the array
  }
});

// Convert the rules to objects instead of strings
const rules = pageOrderingRules.map((rule) => {
  const [x, y] = rule.split("|").map(Number);
  return { x, y };
});

// Validates a sequence by checking it against the parameter rules
function validateSequence(sequence, rules) {
  // for each rule, check the index of x & y
  for (const rule of rules) {
    const indexX = sequence.indexOf(rule.x);
    const indexY = sequence.indexOf(rule.y);

    // if x & y are both not present and index of x is greater than y, the sequence is not valid
    if (indexX !== -1 && indexY !== -1 && indexX > indexY) return false;
  }
  return true;
}

// Calculate the middlevalue through (n-1)/2
function calculateMiddleValue(sequence) {
  const middleIndex = Math.floor((sequence.length - 1) / 2);
  return sequence[middleIndex];
}

let totalMiddleValue = 0;

// Check all sequences to sum up the middlevalue of each valid sequence
updates.forEach((sequence) => {
  const isValid = validateSequence(sequence, rules);
  if (isValid) totalMiddleValue += calculateMiddleValue(sequence);
});

console.log(`Total middlevalue of all valid sequences: ${totalMiddleValue}`);
