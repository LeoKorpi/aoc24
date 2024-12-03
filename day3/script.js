const fs = require("node:fs");
let data = "";

// import data from local file
try {
  data = fs.readFileSync("./day3/input.txt", "utf-8");
} catch (err) {
  console.log("Error:" + err);
}

// adds spaces before "m" and after ")" to separate "mul(x,y) in string"
function addSpaces(input) {
  let result = input.replace(/(?=m)/g, " ");
  result = result.replace(/\)/g, ") ");
  return result.trim();
}

// adds extracts all items that matches "mul(x,y)" where x & y are integers
function extractValidItems(input) {
  const regex = /^mul\(\d+,\s?\d+\)$/;
  const items = input.split(" ");
  const validItems = items.filter((item) => regex.test(item.trim()));
  return validItems;
}

function mul(a, b) {
  return a * b;
}

// utilizing reduce to invoke mul as callback function. some string-operation and wrapping before passing as arguments
function invokeMulStrings(arr) {
  return arr.reduce((total, item) => {
    const [a, b] = item.slice(4, -1).split(",").map(Number);
    return total + mul(a, b);
  }, 0);
}

const dataWithSpaces = addSpaces(data);
const validData = extractValidItems(dataWithSpaces);
const total = invokeMulStrings(validData);
console.log(total);
