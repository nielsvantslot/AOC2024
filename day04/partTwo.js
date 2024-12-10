const MAS = [['M', 'S'], ['S', 'M']];
const OUT_OF_BOUNDS = (x, y, lines) => y - 1 < 0 || x - 1 < 0 || y + 2 > lines.length || x + 2 > lines[y].length;
const CROSS_MATCHES = (values) => JSON.stringify(MAS[0]) === JSON.stringify(values) || JSON.stringify(MAS[1]) === JSON.stringify(values)

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
      if (lines[y][x] !== "A") continue;
      xmasCount += checkMas(lines, x, y);
    }
  }

  console.log("RESULT: ", xmasCount);
};

function checkMas(lines, x, y) {
  if (OUT_OF_BOUNDS(x, y, lines)) return 0;
  const crossOne = [lines[y - 1][x - 1], lines[y + 1][x + 1]];
  const crossTwo = [lines[y + 1][x - 1], lines[y - 1][x + 1]];
  if (CROSS_MATCHES(crossOne) && CROSS_MATCHES(crossTwo)) return 1;
  else return 0;
}
