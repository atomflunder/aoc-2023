import { readFileSync } from "fs";

const file = readFileSync("./src/day-09/input.txt", "utf-8");

function parseInput(input: string): number[][] {
    const lines = input.split("\r\n");

    const numbers: number[][] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        numbers.push(line.split(" ").map((n) => parseInt(n)));
    }

    return numbers;
}

function getDifferences(numbers: number[]): number[] {
    const differences: number[] = [];

    for (let i = 0; i < numbers.length - 1; i++) {
        const number = numbers[i];
        const nextNumber = numbers[i + 1];

        differences.push(nextNumber - number);
    }

    return differences;
}

function getNextNumber(numbers: number[][], isPartTwo: boolean): number {
    if (isPartTwo) {
        return numbers
            .reverse()
            .map((n) => n[0])
            .reduce((a, b) => b - a);
    }

    return numbers.map((n) => n[n.length - 1]).reduce((a, b) => a + b);
}

function partOne(input: string): void {
    const inputs = parseInput(input);
    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
        const numbers = inputs[i];

        let isDone = false;
        let allNumbers: number[][] = [numbers];
        let currentNums = numbers;

        while (!isDone) {
            const differences = getDifferences(currentNums);

            if (differences.every((d) => d === 0)) {
                isDone = true;
            }

            currentNums = differences;
            allNumbers.push(differences);
        }

        sum += getNextNumber(allNumbers, false);
    }

    console.log(sum);
}

function partTwo(input: string): void {
    const inputs = parseInput(input);
    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
        const numbers = inputs[i];

        let isDone = false;
        let allNumbers: number[][] = [numbers];
        let currentNums = numbers;

        while (!isDone) {
            const differences = getDifferences(currentNums);

            if (differences.every((d) => d === 0)) {
                isDone = true;
            }

            currentNums = differences;
            allNumbers.push(differences);
        }

        sum += getNextNumber(allNumbers, true);
    }

    console.log(sum);
}

partOne(file);
partTwo(file);
