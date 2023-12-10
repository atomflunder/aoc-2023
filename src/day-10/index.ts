import { readFileSync } from "fs";

const file = readFileSync("./src/day-10/input.txt", "utf-8");

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

type Coordinate = {
    x: number;
    y: number;
};

function parseInput(input: string): Pipe[][] {
    return input.split("\r\n").map((row) => row.split("") as Pipe[]);
}

function getNextDirection(
    previous: Direction,
    pipe: Pipe
): Direction | undefined {
    switch (pipe) {
        case "|":
            switch (previous) {
                case "UP":
                case "DOWN":
                    return previous;
                case "LEFT":
                case "RIGHT":
                    return undefined;
            }
        case "-":
            switch (previous) {
                case "UP":
                case "DOWN":
                    return undefined;
                case "LEFT":
                case "RIGHT":
                    return previous;
            }
        case "L":
            switch (previous) {
                case "UP":
                case "RIGHT":
                    return undefined;
                case "LEFT":
                    return "UP";
                case "DOWN":
                    return "RIGHT";
            }
        case "J":
            switch (previous) {
                case "UP":
                case "LEFT":
                    return undefined;
                case "RIGHT":
                    return "UP";
                case "DOWN":
                    return "LEFT";
            }
        case "7":
            switch (previous) {
                case "DOWN":
                case "LEFT":
                    return undefined;
                case "UP":
                    return "LEFT";
                case "RIGHT":
                    return "DOWN";
            }
        case "F":
            switch (previous) {
                case "DOWN":
                case "RIGHT":
                    return undefined;
                case "UP":
                    return "RIGHT";
                case "LEFT":
                    return "DOWN";
            }
        case ".":
            return undefined;
        case "S":
            return previous;
    }
}

function moveStep(coordinate: Coordinate, direction: Direction): Coordinate {
    switch (direction) {
        case "UP":
            return { x: coordinate.x, y: coordinate.y - 1 };
        case "DOWN":
            return { x: coordinate.x, y: coordinate.y + 1 };
        case "LEFT":
            return { x: coordinate.x - 1, y: coordinate.y };
        case "RIGHT":
            return { x: coordinate.x + 1, y: coordinate.y };
    }
}

function getStartCoordinate(input: Pipe[][]): Coordinate {
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === "S") {
                return { x, y };
            }
        }
    }

    throw new Error("No start coordinate found");
}

function getMaxLoop(grid: Pipe[][]): Coordinate[] {
    const startCoordinate = getStartCoordinate(grid);

    let possibleDirections: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
    let loops: Coordinate[][] = [];

    for (const direction of possibleDirections) {
        let currentDirection: Direction | undefined = direction;
        let currentCoordinate = startCoordinate;

        let loopLength = 0;

        let currentPipe;

        let visitedCoordinates: Coordinate[] = [];

        while (true) {
            currentPipe = grid[currentCoordinate.y][currentCoordinate.x];

            currentDirection = getNextDirection(currentDirection, currentPipe);

            if (!currentDirection) {
                break;
            }

            currentCoordinate = moveStep(currentCoordinate, currentDirection);

            if (
                visitedCoordinates.some(
                    (c) =>
                        c.x === currentCoordinate.x &&
                        c.y === currentCoordinate.y
                )
            ) {
                break;
            }

            visitedCoordinates.push(currentCoordinate);
            loopLength++;
        }

        loops.push(visitedCoordinates);
    }

    const loop = loops.find(
        (l) => l.length === Math.max(...loops.map((l) => l.length))
    )!;

    return loop;
}

function partOne(input: string): void {
    const grid = parseInput(input);

    console.log(Math.floor(getMaxLoop(grid).length / 2));
}

function partTwo(input: string): void {
    const grid = parseInput(input);
    const loop = getMaxLoop(grid);

    let insideTiles = 0;

    for (let y = 0; y < grid.length; y++) {
        let hitPipes = 0;

        for (let x = 0; x < grid[y].length; x++) {
            const coordinate = { x, y };

            if (
                loop.some((c) => c.x === coordinate.x && c.y === coordinate.y)
            ) {
                const pipe = grid[y][x];

                if (pipe === "|" || pipe === "L" || pipe === "J") {
                    hitPipes++;
                }
            } else {
                if (hitPipes % 2 === 1) {
                    insideTiles++;
                }
            }
        }
    }

    console.log(insideTiles);
}

partOne(file);
partTwo(file);
