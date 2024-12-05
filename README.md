# Advent Of Code 2024

## Description

This project is meant to be used as a template to quickly pull and run the advent of code challenges. using some smart code you can quickly set up and run the various challenges avdvent of code offers including a README.md, input data and templates which easily access the input data.

## Installation

To use this project, ensure that you have the necessary dependencies installed.

1. Clone the repository:
    ```
    git clone git@github.com:nielsvantslot/AOC2024.git
    cd AOC2024
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Copy the `.env.sample` to `.env`:
    ```
    cp .env.sample .env
    ```
4. Set your Advent of Code session cookie in the `.env` file:
    - Go to [Advent of Code](https://adventofcode.com/) and log in.
    - Open your browser's developer tools and find the `session` cookie.
    - Copy the cookie value and set it in the `.env` file like so:
      ```
      AOC_SESSION_COOKIE=<your_session_cookie_here>
      ```

## Usage

### initializing a new project

To set up a new day you can simplu run the `npm run pull` command with the day you want to pull, this will create a new folder including the the input data, assumptions of example data, 2 templates and a readme including the entire assignment.

Example:
```
npm run pull 1
```

### Runnning the code

To run the project, you will need to pass the day and part as an argument when executing the `npm run` command. The argument format is `<day>/<part>`, where:
- `day` refers to the day number (e.g., `1`, `2`, etc.)
- `part` refers to the part number (e.g., `1`, `2`)

Example:
```
npm run dev 1/1
```

This command will run `partOne.js` for `day1`, using `input.txt` if in production, or `input.sample.txt` if in development.

### Environment

You can set the environment variable `NODE_ENV` to either `production` or `development` to choose which input file to use:
- In `production`: `input.txt`
- In `development`: `input.sample.txt`

## Folder Structure

- `dayXX/`: A folder containing the day's corresponding scripts (e.g., `partOne.js`, `partTwo.js`).
- `input.txt`: The input file used for the final solution.
- `input.sample.txt`: The sample input file used to test the code.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
