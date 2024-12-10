const XMAS = "XMAS";
const PROX_TOP = (y) => y < XMAS.length - 1;
const PROX_BOTTOM = (y, lines) => y > lines.length - XMAS.length;
const PROX_LEFT = (x) => x < XMAS.length - 1;
const PROX_RIGHT = (x, line) => x > line.length - XMAS.length;

export const run = (inputData) => {
  console.log(
`Received input data:
${inputData}`
);
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');

  let xmasCount = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] !== "X") continue;
      xmasCount += checkUp(lines, x, y);
      xmasCount += checkDown(lines, x, y);
      xmasCount += checkLeft(lines, x, y);
      xmasCount += checkRight(lines, x, y);
      xmasCount += checkUpRight(lines, x, y);
      xmasCount += checkDownRight(lines, x, y);
      xmasCount += checkUpLeft(lines, x, y);
      xmasCount += checkDownLeft(lines, x, y);
    }
  }

  console.log("RESULT: ", xmasCount);
};

function checkUp(lines, x, y) {
  if (PROX_TOP(y)) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y - i][x]) return 0;
  }
  return 1;
}

function checkDown(lines, x, y) {
  if (PROX_BOTTOM(y, lines)) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y + i][x]) return 0;
  }
  return 1;
}

function checkLeft(lines, x, y) {
  if (PROX_LEFT(x)) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y][x - i]) return 0;
  }
  return 1;
}

function checkRight(lines, x, y) {
  if (PROX_RIGHT(x, lines[y])) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y][x + i]) return 0;
  }
  return 1;
}

function checkUpRight(lines, x, y) {
  if (PROX_TOP(y)) return 0;
  if (PROX_RIGHT(x, lines[y])) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y - i][x + i]) return 0;
  }
  return 1;
}

function checkDownRight(lines, x, y) {
  if (PROX_BOTTOM(y, lines)) return 0;
  if (PROX_RIGHT(x, lines[y])) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y + i][x + i]) return 0;
  }
  return 1;
}

function checkUpLeft(lines, x, y) {
  if (PROX_TOP(y)) return 0;
  if (PROX_LEFT(x)) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y - i][x - i]) return 0;
  }
  return 1;
}

function checkDownLeft(lines, x, y) {
  if (PROX_BOTTOM(y, lines)) return 0;
  if (PROX_LEFT(x)) return 0;
  for (let i = 1; i < XMAS.length; i++) {
    if (XMAS[i] != lines[y + i][x - i]) return 0;
  }
  return 1;
}
