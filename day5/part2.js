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

function reorderSequence(sequence, rules) {
  const graph = {}; // create a directed graph for topological sorting
  const inDegree = {}; // tracks the number of prerequisites for each number

  // initialize graph and inDegree for all numbers in sequence
  sequence.forEach((num) => {
    graph[num] = [];
    inDegree[num] = 0;
  });

  // build the graph based on the rules
  rules.forEach((rule) => {
    const { x, y } = rule;
    if (sequence.includes(x) && sequence.includes(y)) {
      graph[x].push(y);
      inDegree[y] += 1;
    }
  });

  // perform tological sorting (Kahn's algo)
  const sortedSequence = [];
  const queue = [];

  // starting with nodes with no incoming edges (inDegree of 0)
  for (const num in inDegree) {
    if (inDegree[num] === 0) {
      queue.push(num);
    }
  }

  // process the graph
  while (queue.length > 0) {
    const node = queue.shift();
    sortedSequence.push(node);

    // decrease the inDegree for neighbors, if inDegree becomes 0 add to queue
    graph[node].forEach((neighbor) => {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  // if the sorted sequence doesn't contain all the numbers, there was a cycle (error)
  if (sortedSequence.length !== sequence.length) {
    console.error("Error: Unable to sort sequence due to a cycle");
    return sequence; // return the sequence as fallback
  }

  return sortedSequence;
}

// Calculate the middlevalue through (n-1)/2
function calculateMiddleValue(sequence) {
  const middleIndex = Math.floor((sequence.length - 1) / 2);
  return sequence[middleIndex];
}

let totalMiddleValue = 0;

/**
 * Check all sequences for validation
 * If a sequence is invalid it is reordered before finally
 * summing up the middlevalue of each reordered sequence
 * */
updates.forEach((sequence) => {
  const isValid = validateSequence(sequence, rules);
  if (!isValid) {
    const reorderedSequence = reorderSequence(sequence, rules);
    totalMiddleValue += calculateMiddleValue(reorderedSequence);
  }
});

console.log(
  `Total middlevalue of all reordered sequences: ${totalMiddleValue}`
);
