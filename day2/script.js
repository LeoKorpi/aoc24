const fs = require("node:fs");
let data = "";
let sequences = [];

// import data from local file
try {
  data = fs.readFileSync("./day2/input.txt", "utf-8");
  // split the data into array of strings, convert each line to array of numbers, store sequences in jagged array
  sequences = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(" ").map(Number));
} catch (err) {
  console.log("Error:" + err);
}

/**
 * A sequence is considered valid if:
 * 1. all of the elements are in either ascending or descending order
 * 2. the difference between an element and the element that follows is larger than 0 but no more than 3
 */

// checks which sequences are valid
function checkSequences(sequences) {
  return sequences.map((sequence) => ({
    sequence,
    isValid: isValidSequence(sequence),
  }));
}

// validates a sequence by first checking the difference between two elements and then checking that its direction stays the same
function isValidSequence(sequence) {
  if (sequence.length < 2) return true;
  let direction = null;

  for (let i = 1; i < sequence.length; i++) {
    const diff = sequence[i] - sequence[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    const currentDirection = Math.sign(diff);
    if (direction === null) direction = currentDirection;
    else if (direction !== currentDirection) return false;
  }
  return true;
}

/**
 * For part 2, the task allows for tolerating that one of the elements in the sequence can be faulty.
 * So for "1, 3, 2, 4, 5", if the third elements was removed the sequence would be considered valid
 * this would however not be true for "2, 4, 4, 3, 5"
 */

// checks for valid sequences with tolerance
function checkSequencesWithTolerance(sequences) {
  return sequences.map((sequence) => ({
    sequence,
    isValid: isValidWithTolerance(sequence),
  }));
}

// removes one element in each sequence to test if the sequence would still be valid
function isValidWithTolerance(sequence) {
  if (isValidSequence(sequence)) return true;

  for (let i = 0; i < sequence.length; i++) {
    const modifiedSequence = sequence.slice(0, i).concat(sequence.slice(i + 1));
    if (isValidSequence(modifiedSequence)) return true;
  }
  return false;
}

// checks how many of the reports are valid
let noOfSafeReports = 0;
//const results = checkSequences(sequences);
const results = checkSequencesWithTolerance(sequences);

for (let i = 0; i < results.length; i++) {
  if (results[i].isValid) noOfSafeReports++;
}

console.log(noOfSafeReports);
