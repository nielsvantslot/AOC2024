export const run = (inputData) => {
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  const left = [];
  const right = [];

  // Your part-specific logic goes here
  for (let line of lines) {
    const [leftValue, rightValue] = line.split("   ");
    left.push(leftValue);
    right.push(rightValue);
  }

  left.sort();
  right.sort();

  if (left.length != right.length) throw new Error("list lengths are not the same");

  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    diff += Math.abs(left[i] - right[i]);
  }

  console.log("RESULT:", diff);
};
