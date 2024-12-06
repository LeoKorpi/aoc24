const fs = require("node:fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

const parseInput = (rawInput) => {
  return rawInput.split(/\r?\n/).map((r) => r.split(""));
};

const directions = [
  [-1, 0], // up
  [0, 1], // down
  [1, 0], // left
  [0, -1], //right
];

function findStartPosition(map) {
  for (let i = 0; i < map.length; i++) {
    const col = map[i].indexOf("^");
    if (col !== -1) return [i, col]; // Return the position as soon as we find '^'
  }
}

function simulateGuardMovement(map, guardStartPos) {
  console.log("simulating movements...");
  let guardPos = [...guardStartPos];
  let directionIndex = 0;

  const rows = map.length;
  const cols = map[0].length;
  // Count the starting position as a visited space
  visitedPositions.add(guardPos.toString());

  while (true) {
    const [dx, dy] = directions[directionIndex];
    const [x, y] = guardPos;
    const nextPos = [x + dx, y + dy];

    if (
      nextPos[0] < 0 ||
      nextPos[0] >= rows ||
      nextPos[1] < 0 ||
      nextPos[1] >= cols
    ) {
      break;
    }

    if (map[nextPos[0]][nextPos[1]] !== "#") {
      visitedPositions.add(nextPos.toString());
      guardPos = nextPos;
    } else {
      directionIndex = (directionIndex + 1) % directions.length;
    }
  }

  return visitedPositions.size;
}

const visitedPositions = new Set();
const data = parseInput(input);
const guardStartPos = findStartPosition(data);
console.time("sim runtime");
console.log(
  "Distinct spaces visited: " + simulateGuardMovement(data, guardStartPos)
);
console.timeEnd("sim runtime");
