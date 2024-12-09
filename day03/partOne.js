export const run = (inputData) => {
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');

  // Your part-specific logic goes here
  const mulex = /(mul\([0-9]*,[0-9]*\))/g;
  let total = 0;
  for (let line of lines) {
    const matches = [...line.match(mulex)];
    for (let func of matches) {
      total += eval(func);
    }
  }

  console.log("RESULT: ", total);
};

function mul(a,b) {
  return a * b;
}
