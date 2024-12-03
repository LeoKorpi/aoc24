const fs = require("node:fs");
let data = "";

// import data from local file
try {
  data = fs.readFileSync("./day3/input.txt", "utf-8");
} catch (err) {
  console.log("Error:" + err);
}

/**
 * Updated instructions: when "don't()" is detected in the array,
 * "mul(x,y)" should be skipped until "do()" is detected.
 */
function processInstructions(input) {
  // checks for "do()", "don't()" and "mul(x,y)" where x & y are integers
  const regex = /(mul\(\d+,\s?\d+\)|do\(\)|don't\(\))/g;
  const matches = input.match(regex);

  let isEnabled = true; // enabled by default
  let total = 0;

  matches.forEach((item) => {
    if (item === "do()") {
      isEnabled = true;
    } else if (item === "don't()") {
      isEnabled = false;
    } else if (isEnabled && item.startsWith("mul")) {
      const [a, b] = item.slice(4, -1).split(",").map(Number);
      total += mul(a, b);
    }
  });
  return total;
}

function mul(a, b) {
  return a * b;
}

const results = processInstructions(data);
console.log(results);
