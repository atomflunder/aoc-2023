import { readFileSync } from "fs";

const file = readFileSync("./src/day-03/input.txt", "utf-8");

class Coodinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isAdjacent(other: Coodinates): boolean {
        return (
            Math.abs(this.x - other.x) <= 1 && Math.abs(this.y - other.y) <= 1
        );
    }

    getAdjacentNumbers(numbers: Number[]): Number[] {
        const adjacentNumbers = [];

        numloop: for (let i = 0; i < numbers.length; i++) {
            const currentNumber = numbers[i];

            for (let j = 0; j < currentNumber.coordinates.length; j++) {
                const currentNumberCoordinate = currentNumber.coordinates[j];

                if (this.isAdjacent(currentNumberCoordinate)) {
                    adjacentNumbers.push(currentNumber);
                    continue numloop;
                }
            }
        }

        return adjacentNumbers;
    }
}

type Number = {
    value: number;
    coordinates: Coodinates[];
};

function isNumber(input: string): boolean {
    return !Number.isNaN(Number(input));
}

function isSymbol(input: string): boolean {
    return !(input === "." || isNumber(input));
}

function getPartCoordinates(input: string): Coodinates[] {
    const lines = input.split("\n");
    const coordinates: Coodinates[] = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] !== "." && !isNumber(lines[i][j])) {
                coordinates.push(new Coodinates(j, i));
            }
        }
    }

    return coordinates;
}

function getNumbers(input: string): Number[] {
    const lines = input.split("\n");
    const numbers: Number[] = [];

    for (let i = 0; i < lines.length; i++) {
        let currentNum = "";
        let currentCoordinates: Coodinates[] = [];

        for (let j = 0; j < lines[i].length; j++) {
            const n = lines[i][j];

            if (isNumber(n)) {
                currentNum += n;
                currentCoordinates.push(new Coodinates(j, i));
            } else if (n === "." || isSymbol(n)) {
                if (currentNum.length > 0) {
                    numbers.push({
                        value: Number(currentNum),
                        coordinates: currentCoordinates,
                    });
                }
                currentNum = "";
                currentCoordinates = [];
            }
        }

        if (currentNum.length > 0 && Number(currentNum) !== 0) {
            numbers.push({
                value: Number(currentNum),
                coordinates: currentCoordinates,
            });
        }
    }

    return numbers;
}

function partOne(input: string): void {
    const coordinates = getPartCoordinates(input);
    const numbers = getNumbers(input);

    const numbersAdjacentToPart = [];

    for (let i = 0; i < numbers.length; i++) {
        const currentNumber = numbers[i];

        numloop: for (let j = 0; j < coordinates.length; j++) {
            const currentCoordinate = coordinates[j];

            for (let k = 0; k < currentNumber.coordinates.length; k++) {
                const currentNumberCoordinate = currentNumber.coordinates[k];

                if (currentNumberCoordinate.isAdjacent(currentCoordinate)) {
                    numbersAdjacentToPart.push(currentNumber);
                    continue numloop;
                }
            }
        }
    }

    const sum = numbersAdjacentToPart.reduce((acc, curr) => {
        return acc + curr.value;
    }, 0);

    console.log(sum);
}

function getGearCoordinates(input: string): Coodinates[] {
    const lines = input.split("\n");
    const coordinates: Coodinates[] = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === "*") {
                coordinates.push(new Coodinates(j, i));
            }
        }
    }

    return coordinates;
}

function partTwo(input: string): void {
    const gears = getGearCoordinates(input);
    const numbers = getNumbers(input);

    let sum = 0;

    for (let i = 0; i < gears.length; i++) {
        const currentGear = gears[i];
        const adjacentNumbers = currentGear.getAdjacentNumbers(numbers);

        if (adjacentNumbers.length === 2) {
            sum += adjacentNumbers[0].value * adjacentNumbers[1].value;
        }
    }

    console.log(sum);
}

partOne(file);
partTwo(file);
