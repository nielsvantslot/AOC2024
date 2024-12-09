const operators = {
  ">": (a, b) => a > b,
  "<": (a, b) => a < b,
}

export const run = (inputData) => {
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  console.log("Input file has been split into lines:", lines);

  let valid = 0;

  for (let line of lines) {
    const lineArr = line.split(" ").map(Number);
    if (validate(lineArr) || dampen(lineArr)) {
      valid++;
    }
  }

  console.log("valid lines: ", valid);
};

function dampen(lineArr) {
  for (let i = 0; i <= lineArr.length; i++) {
    const newArr = lineArr.slice(0, i).concat(lineArr.slice(i+1));
    if(validate(newArr)) {
      return true;
    }
  }
  return false;
}

function validate(lineArr) {
  let operator;
  let linestate = true;
  lineArr.reduce((prev, curr) => {
    const diff = Math.abs(prev - curr);

    if(!operator) operator = prev < curr ? "<" : ">";
    if (diff < 1 || diff > 3) linestate = false;
    if (!operators[operator](prev, curr)) linestate = false;

    return curr;
  })
  return linestate;
}
