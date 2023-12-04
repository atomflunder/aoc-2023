import { readFileSync } from "fs";

const file = readFileSync("./src/day-04/input.txt", "utf-8");

function getWinningNumbers(input: string): number[] {
    const winningNumbers: number[] = [];
    const tickets: number[] = [];

    const [wins, ticks] = input.split(" | ");

    const [_gameIndex, winningNums] = wins.split(": ");

    winningNumbers.push(
        ...winningNums
            .split(" ")
            .map(Number)
            .filter((n) => n !== 0)
    );
    tickets.push(
        ...ticks
            .split(" ")
            .map(Number)
            .filter((n) => n !== 0)
    );

    return tickets.filter((n) => winningNumbers.includes(n));
}

function partOne(input: string): void {
    const lines = input.split("\n");

    let sum = 0;

    for (const line of lines) {
        const wins = getWinningNumbers(line);

        sum += wins.length ? Math.pow(2, wins.length - 1) : 0;
    }

    console.log(sum);
}

function partTwo(input: string): void {
    const lines = input.split("\n");

    let extraCopies = Array(lines.length).fill(1);

    for (let i = 0; i < lines.length; i++) {
        const copies = extraCopies[i];
        const wins = getWinningNumbers(lines[i]).length;

        cardloop: for (let j = 1; j < wins + 1; j++) {
            if (j + i >= lines.length) {
                break cardloop;
            }

            extraCopies[i + j] += copies;
        }
    }

    console.log(extraCopies.reduce((a, b) => a + b, 0));
}

partOne(file);
partTwo(file);
