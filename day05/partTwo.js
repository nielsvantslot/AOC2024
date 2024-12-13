export const run = (inputData) => {
  console.log("Received input data:", inputData);
  const lines = inputData
    .split('\n')
    .filter(line => line.trim() !== '');
  console.log("Input file has been split into lines:", lines);

  const rules = new Map();
  let res = 0;

  // Your part-specific logic goes here
  for (let line of lines) {
    if(line.includes("|")) {
      const rule = line.split("|");

      if(!rules.has(rule[0])) {
        rules.set(rule[0], []);
      }
      rules.get(rule[0]).push(rule[1]);
    }
    else {
      const lineArr = line.split(",");
      const checkList = line.split(",");
      let lineInValid = false;

      for (let i = lineArr.length - 1; i >= 0; i--) {
        if (!rules.has(checkList[i])) continue;
        const checkChar = checkList[i];

        for (let ruleChar of rules.get(checkChar)) {
          const leftRulePos = lineArr.indexOf(checkChar);
          const rightRulePos = lineArr.indexOf(ruleChar);
          if (rightRulePos < 0) continue;
          if (leftRulePos < rightRulePos) continue;
          lineInValid = true;
          lineArr.splice(leftRulePos, 1);
          lineArr.splice(rightRulePos, 0, checkChar);
        }
      }
      if (lineInValid) res += Number(lineArr[Math.floor(lineArr.length / 2)]);
    }
  }
  console.log("RESULT: ", res);
};
