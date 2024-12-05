import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const AOC_SESSION_COOKIE = process.env.AOC_SESSION_COOKIE;
const BASE_URL = 'https://adventofcode.com/2024/day';
const STARTER_CODE_PATH = path.join(process.cwd(), 'template.js');

/**
 * Initialize Advent of Code project for a specific day
 * @param {number} day - The day of the challenge
 */
async function initProject(day) {
  if (!day || day < 1 || day > 25) {
    console.error('Invalid day. Please specify a day between 1 and 25.');
    return;
  }

  const dayFolder = path.join(process.cwd(), `day${day.toString().padStart(2, '0')}`);

  // Create folder for the day
  if (!fs.existsSync(dayFolder)) {
    fs.mkdirSync(dayFolder, { recursive: true });
  } else {
    console.log(`Folder for day ${day} already exists.`);
    return;
  }

  // Fetch assignment, input, and example data from Advent of Code
  const assignment = await fetchAssignment(day);
  const input = await fetchInput(day);
  const examples = await fetchExamples(day);

  if (assignment) {
    // Write README.md
    fs.writeFileSync(path.join(dayFolder, 'README.md'), assignment);
    console.log(`README for day ${day} saved.`);
  }

  if (input) {
    fs.writeFileSync(path.join(dayFolder, 'input.txt'), input);
    console.log(`Input for day ${day} saved.`);
  }

  const fileNameTemplate = examples.length > 1 ? 'input.sample{index}.txt' : 'input.sample.txt';

  examples.forEach((example, index) => {
    const fileName = examples.length > 1 ? fileNameTemplate.replace('{index}', index + 1) : fileNameTemplate;
    const filePath = path.join(dayFolder, fileName);

    fs.writeFileSync(filePath, example);
    console.log(`Example ${index + 1} for day ${day} saved as ${fileName}.`);
  });

  // Copy starter code
  const partOne = path.join(dayFolder, 'partOne.js');
  const partTwo = path.join(dayFolder, 'partTwo.js');
  if (fs.existsSync(STARTER_CODE_PATH)) {
    fs.copyFileSync(STARTER_CODE_PATH, partOne);
    fs.copyFileSync(STARTER_CODE_PATH, partTwo);
    console.log(`Starter code copied to ${dayFolder}`);
  }

  console.log(`Project for day ${day} initialized in ${dayFolder}`);
}

/**
 * Fetch the assignment description for a specific day from Advent of Code
 * @param {number} day - The day of the challenge
 * @returns {Promise<string|null>} - The assignment description or null if failed
 */
async function fetchAssignment(day) {
  try {
    const response = await fetch(`${BASE_URL}/${day}`, {
      headers: {
        Cookie: `session=${AOC_SESSION_COOKIE}`,
      },
    });

    if (response.ok) {
      const html = await response.text();

      const match = html.match(/<article.*?>([\s\S]*?)<\/article>/);
      if (match) {
        const assignment = match[1]
          .replace(/<[^>]+>/g, '') // Strip HTML tags
          .replace(/\n\s+/g, '\n') // Normalize newlines
          .trim();
        return `# Advent of Code 2024 - Day ${day}\n\n${assignment}`;
      }
      console.error('Failed to extract assignment content.');
      return null;
    } else {
      console.error(`Failed to fetch assignment for day ${day}: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching assignment for day ${day}:`, error);
    return null;
  }
}

/**
 * Fetch the input for a specific day from Advent of Code
 * @param {number} day - The day of the challenge
 * @returns {Promise<string|null>} - The input data or null if failed
 */
async function fetchInput(day) {
  try {
    const response = await fetch(`${BASE_URL}/${day}/input`, {
      headers: {
        Cookie: `session=${AOC_SESSION_COOKIE}`,
      },
    });

    if (response.ok) {
      return await response.text();
    } else {
      console.error(`Failed to fetch input for day ${day}: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching input for day ${day}:`, error);
    return null;
  }
}

/**
 * Fetch example inputs for a specific day from Advent of Code
 * @param {number} day - The day of the challenge
 * @returns {Promise<string[]>} - An array of example inputs
 */
async function fetchExamples(day) {
  try {
    const response = await fetch(`${BASE_URL}/${day}`, {
      headers: {
        Cookie: `session=${AOC_SESSION_COOKIE}`,
      },
    });

    if (response.ok) {
      const html = await response.text();

      const codeBlocks = html.match(/<code>([\s\S]*?)<\/code>/g) || [];
      return codeBlocks
        .map(code => code.replace(/<\/?code>/g, '').trim())
        .filter(content => content.length > 10 || content.includes('\n'));
    } else {
      console.error(`Failed to fetch examples for day ${day}: ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching examples for day ${day}:`, error);
    return [];
  }
}

// Example usage
const day = parseInt(process.argv[2], 10);
if (!isNaN(day)) {
  initProject(day);
} else {
  console.error('Please provide a valid day number as an argument.');
}
