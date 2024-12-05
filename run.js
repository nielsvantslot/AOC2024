import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the argument passed from npm run (e.g., '1/2')
const args = process.argv.slice(2);
const dayPart = args[0]; // The argument like '1/2'

// Validate and split the argument into day and part
const [dayNumber, partKey] = dayPart ? dayPart.split('/') : [];

const parts = {
  "1": "partOne",
  "2": "partTwo"
};

const part = parts[partKey];

if (!dayNumber || !part || !['partOne', 'partTwo'].includes(part)) {
  console.error('Usage: npm run <env> <day/part>');
  console.error('Example: npm run dev 1/2 (for day 1, part 2)');
  process.exit(1);
}

// Check the environment (production or development)
const isProduction = process.env.NODE_ENV === 'production';
const inputFile = isProduction ? 'input.txt' : 'input.sample.txt';

// Determine the day folder (e.g., day01, day02)
const dayFolder = path.join(__dirname, `day${dayNumber.toString().padStart(2, '0')}`);

// Ensure the day folder exists
if (!fs.existsSync(dayFolder)) {
  console.error(`Day${dayNumber} folder does not exist!`);
  process.exit(1);
}

// Log which input file is being used
console.log(`Using input file: ${inputFile}`);

// Read the selected input file
fs.readFile(path.join(dayFolder, inputFile), 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${inputFile}:`, err);
    return;
  }

  // Dynamically run the specified part (partOne.js or partTwo.js)
  runScript(part, data); // Pass file content to the script
});

// Dynamically run the specified part (partOne.js or partTwo.js)
const runScript = (partName, fileData) => {
  const scriptPath = path.join(dayFolder, `${partName}.js`);
  if (fs.existsSync(scriptPath)) {
    console.log(`Running ${partName} for day ${dayNumber}...`);
    import(scriptPath).then((module) => {
      // Pass the file content as an argument to the script's logic
      module.run(fileData);
    });
  } else {
    console.error(`${partName}.js does not exist in ${dayFolder}`);
  }
};
