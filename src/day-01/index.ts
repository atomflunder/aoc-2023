import { readFileSync } from "fs";

const file = readFileSync("./src/day-01/input.txt", "utf-8");

const NUMBERS = "1234567890";

function parseLine(line: string): number {
    let currentNum = "";

    normal: for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (NUMBERS.includes(char)) {
            currentNum += char;
            break normal;
        }
    }

    reverse: for (let i = line.length - 1; i >= 0; i--) {
        const char = line[i];

        if (NUMBERS.includes(char)) {
            currentNum += char;
            break reverse;
        }
    }

    return parseInt(currentNum);
}

function partOne(input: string): void {
    let sum = 0;

    for (const line of input.split("\n")) {
        const currentNum = parseLine(line);
        if (isNaN(currentNum)) {
            continue;
        }
        sum = sum + currentNum;
    }

    console.log("Part 1: " + sum);
}

function partTwo(input: string): void {
    let sum = 0;

    const lines = input.split("\n");

    const numsMine: number[] = [];

    for (let x = 0; x < lines.length; x++) {
        let line = lines[x];

        line = line.replace(/one/g, "o1ne");
        line = line.replace(/two/g, "t2wo");
        line = line.replace(/three/g, "th3ree");
        line = line.replace(/four/g, "fo4ur");
        line = line.replace(/five/g, "fi5ve");
        line = line.replace(/six/g, "s6ix");
        line = line.replace(/seven/g, "se7ven");
        line = line.replace(/eight/g, "ei8ght");
        line = line.replace(/nine/g, "ni9ne");

        const currentNum = parseLine(line);

        if (isNaN(currentNum)) {
            continue;
        }

        numsMine.push(currentNum);

        sum = sum + currentNum;
    }

    console.log("Part 2: " + sum);
}

partOne(file);
partTwo(file);
