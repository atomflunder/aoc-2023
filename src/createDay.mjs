import { writeFileSync, mkdirSync } from "fs";

const day = process.argv[2];

if (!day) {
    console.error("Please provide a day");
    process.exit(1);
}

mkdirSync(`./src/${day}`);

writeFileSync(`./src/${day}/input.txt`, "Replace this with your input");
writeFileSync(
    `./src/${day}/index.ts`,
    `import { readFileSync } from "fs";

const file = readFileSync("./src/${day}/input.txt", "utf-8");

function partOne(input: string): void {}

function partTwo(input: string): void {}

partOne(file);
partTwo(file);
`
);
