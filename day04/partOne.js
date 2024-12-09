export const run = (inputData) => {
  console.log("Received input data:", inputData);
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  console.log("Input file has been split into lines:", lines);

  // Your part-specific logic goes here
};
