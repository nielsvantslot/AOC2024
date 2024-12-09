import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const AOC_SESSION_COOKIE = process.env.AOC_SESSION_COOKIE;
const BASE_URL = 'https://adventofcode.com/2024/day';
const STARTER_CODE_PATH = path.join(process.cwd(), 'template.js');
const DAY_FOLDER_TEMPLATE = (day) => path.join(process.cwd(), `day${day.toString().padStart(2, '0')}`);

async function initProject(day) {
  if (!isValidDay(day)) return;

  const dayFolder = DAY_FOLDER_TEMPLATE(day);

  if (fs.existsSync(dayFolder)) {
    console.log(`Folder for day ${day} already exists.`);
    await handlePartTwo(day, dayFolder);
  } else {
    fs.mkdirSync(dayFolder, { recursive: true });
    await handlePartOne(day, dayFolder);
  }

  console.log(`Project for day ${day} initialized in ${dayFolder}`);
}

function isValidDay(day) {
  if (day < 1 || day > 25) {
    console.error('Invalid day. Please specify a day between 1 and 25.');
    return false;
  }
  return true;
}

async function handlePartOne(day, dayFolder) {
  const part = 1;
  const [assignment, input, examples] = await Promise.all([
    fetchAssignment(day, part),
    fetchInput(day),
    fetchExamples(day, part),
  ]);

  const content = `# Advent of Code - Day ${day}/${part}\n\n${assignment}`;
  if (assignment) saveFile(path.join(dayFolder, 'README.md'), content, `README for Part ${part}`);
  if (input) saveFile(path.join(dayFolder, 'input.txt'), input, `Input for Part ${part}`);

  saveExamples(examples, dayFolder, part);

  const partOneFile = path.join(dayFolder, 'partOne.js');
  if (fs.existsSync(STARTER_CODE_PATH)) {
    fs.copyFileSync(STARTER_CODE_PATH, partOneFile);
    console.log(`Starter code copied for Part ${part}.`);
  }
}

async function handlePartTwo(day, dayFolder) {
  const part = 2;
  const partOneExists = fs.existsSync(path.join(dayFolder, 'partOne.js'));
  const partTwoExists = fs.existsSync(path.join(dayFolder, 'partTwo.js'));
  if (!partOneExists) return;
  if (partTwoExists) return;

  const [assignmentPart2, examplesPart2] = await Promise.all([
    fetchAssignment(day, part),
    fetchExamples(day, part),
  ]);

  if (!assignmentPart2 || !examplesPart2) return console.log("It seems part two is not yet available");

  const content = `\n\n\n# Day ${day}/${part}\n\n${assignmentPart2}`;
  if (assignmentPart2) appendFile(path.join(dayFolder, 'README.md'), content, `README for Part ${part}`);
  saveExamples(examplesPart2, dayFolder, part);

  const partTwoFile = path.join(dayFolder, 'partTwo.js');
  if (fs.existsSync(STARTER_CODE_PATH)) {
    fs.copyFileSync(STARTER_CODE_PATH, partTwoFile);
    console.log(`Starter code copied for Part ${part}.`);
  }
}

function saveFile(filePath, content, label) {
  fs.writeFileSync(filePath, content);
  console.log(`${label} saved.`);
}

function appendFile(filePath, content, label) {
  fs.appendFileSync(filePath, content);
  console.log(`${label} saved.`);
}

function saveExamples(examples, dayFolder, part) {
  if (examples.length === 0) return;

  const fileNameTemplate = examples.length > 1 ? 'input.sample{index}.txt' : 'input.sample.txt';
  examples.forEach((example, index) => {
    const fileName = examples.length > 1 ? fileNameTemplate.replace('{index}', index + 1) : fileNameTemplate;
    const filePath = path.join(dayFolder, fileName);
    fs.writeFileSync(filePath, example);
    console.log(`Part ${part} example ${index + 1} saved as ${fileName}.`);
  });
}

async function fetchAssignment(day, part) {
  return fetchPageContent(day, part, (html) => {
    const match = html.match(/<article.*?>([\s\S]*?)<\/article>/g);
    if (!match) return null;
    if (!match[part - 1]) return null;

    return match[part - 1]
      .replace(/<[^>]+>/g, '')
      .replace(/\n\s+/g, '\n')
      .replace(/--- (Day \d+: [\w\s]+|Part Two) ---/g, '')
      .trim();
  });
}

async function fetchInput(day) {
  return fetchPageContent(day, 1, (html) => html);
}

async function fetchExamples(day, part) {
  return fetchPageContent(day, part, (html) => {
    const match = html.match(/<article.*?>([\s\S]*?)<\/article>/);
    const codeBlocks = match[part - 1].match(/<code>([\s\S]*?)<\/code>/g) || [];
    return codeBlocks
      .map((code) => code.replace(/<\/?code>/g, '').trim())
      .filter((content) => content.length > 10 || content.includes('\n'));
  });
}

async function fetchPageContent(day, part, parseContent) {
  try {
    const response = await fetch(`${BASE_URL}/${day}`, {
      headers: { Cookie: `session=${AOC_SESSION_COOKIE}` },
    });

    if (!response.ok) throw new Error(response.statusText);

    const html = await response.text();
    return parseContent(html);
  } catch (error) {
    console.error(`Error fetching content for day ${day}, part ${part}:`, error);
    return null;
  }
}

// Example usage
const day = parseInt(process.argv[2], 10);
if (!isNaN(day)) {
  initProject(day);
} else {
  console.error('Please provide a valid day number as an argument.');
}
