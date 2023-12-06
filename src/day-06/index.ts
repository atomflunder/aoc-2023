import { time } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./src/day-06/input.txt", "utf-8");

type Race = {
    time: number;
    distance: number;
};

function canWin(distance: number, speed: number, timeLeft: number): boolean {
    return distance < speed * timeLeft;
}

function getWaysToWin(race: Race): number {
    let ways = 0;

    for (let i = 0; i < race.time; i++) {
        ways += canWin(race.distance, i, race.time - i) ? 1 : 0;
    }

    return ways;
}

function parseInput(input: string, isPartTwo: boolean): Race[] {
    const [times, distances] = input.split("\n").map((l) => l.match(/\d+/g)!);

    if (isPartTwo) {
        return [
            {
                time: parseInt(times.join("")),
                distance: parseInt(distances.join("")),
            },
        ];
    }

    const races = [];

    for (let i = 0; i < times.length; i++) {
        races.push({
            time: parseInt(times[i]),
            distance: parseInt(distances[i]),
        });
    }

    return races;
}

function partOne(input: string): void {
    const races = parseInput(input, false);

    let sum: number[] = [];

    races.forEach((race) => {
        sum.push(getWaysToWin(race));
    });

    console.log(sum.reduce((a, b) => a * b, 1));
}

function partTwo(input: string): void {
    const race = parseInput(input, true)[0];

    console.log(getWaysToWin(race));
}

partOne(file);
partTwo(file);
