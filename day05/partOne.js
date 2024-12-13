export const run = (inputData) => {
  console.log("Received input data:", inputData);
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  console.log("Input file has been split into lines:", lines);

  const rules = [];
  let res = 0;

  // Your part-specific logic goes here
  for (let line of lines) {
    if(line.includes("|")) {
      rules.push(line.split("|"))
    }
    else {
      const lineArr = line.split(",");
      let valid = true;
      for (let rule of rules) {
        if(lineArr.includes(rule[0]) && lineArr.includes(rule[1])) {
          if(lineArr.indexOf(rule[0]) >= lineArr.indexOf(rule[1])) {
            valid = false;
            break;
          }
        }
      }
      if (valid) {
        res += Number(lineArr[Math.floor(lineArr.length / 2)]);
      }

    }
  }

  console.log("RESULT: ", res);
};
