export const run = (inputData) => {
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');

  // Your part-specific logic goes here
  let exec = true;
  const mulex = /((mul|do|don't)(\(([0-9]*,[0-9]*)\)|\(\)))/g;
  const dontRex = /(don't\(\))/g;
  const doRex = /(do\(\))/g;

  let total = 0;
  for (let line of lines) {
    const matches = [...line.match(mulex)];
    for (let func of matches) {
      if (func.match(dontRex)) {
        exec = false;
        continue;
      }
      if (func.match(doRex)) {
        exec = true;
        continue;
      }
      if (!exec) continue;
      total += eval(func);
    }
  }

  console.log("RESULT: ", total);
};

function mul(a,b) {
  return a * b;
}
