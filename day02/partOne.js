export const run = (inputData) => {
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  console.log("Input file has been split into lines:", lines);

  // next number should always be bigger or smaller
  // numbers should differ by at least 1 max 3
  const operators = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
  }
  let valid = 0;

  for (let line of lines) {
    let operator;
    let linestate = true;
    line.split(" ").map(Number).reduce((prev, curr) => {
      const diff = Math.abs(prev - curr);

      if(!operator) operator = prev < curr ? "<" : ">";
      if (diff < 1 || diff > 3) linestate = false;
      if (!operators[operator](prev, curr)) linestate = false;

      return curr;
    })
    if (linestate) valid++;

    operator = undefined;
  }

  console.log("valid lines: ", valid);
};
