export const run = (inputData) => {
  console.log(inputData);
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');

  // Your part-specific logic goes here
  const numbers = [];
  const freqMap = new Map();
  let simScore = 0;

  for (let line of lines) {
    const [num, freqNum] = line.split("   ");
    numbers.push(num);
    freqMap.set(freqNum, (freqMap.get(freqNum) ?? 0) + 1);
  }

  for (let number of numbers) {
    simScore += number * (freqMap.get(number) ?? 0);
  }

  console.log("RES: ", simScore);
};
