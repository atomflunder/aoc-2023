import { readFileSync } from "fs";

const file = readFileSync("./src/day-08/input.txt", "utf-8");

type Element = {
    value: string;
    left: string;
    right: string;
};

type Direction = "L" | "R";

type PuzzleInput = {
    elements: Element[];
    directions: Direction[];
};

function parseInput(input: string): PuzzleInput {
    const lines = input.split("\r\n");

    const elements: Element[] = [];
    const directions: Direction[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (i === 0) {
            // @ts-ignore
            directions.push(...line.split(""));
            continue;
        }

        if (i === 1) {
            continue;
        }

        const [value, others] = line.split(" = (");
        let [left, right] = others.split(", ");
        right = right.replace(")", "");

        elements.push({
            value,
            left,
            right,
        });
    }

    return {
        elements,
        directions,
    };
}

function getNextElement(
    direction: Direction,
    element: Element,
    allElements: Element[]
): Element {
    if (direction === "L") {
        return allElements.find((el) => el.value === element.left)!;
    }

    return allElements.find((el) => el.value === element.right)!;
}

function partOne(input: string): void {
    const puzzleInput = parseInput(input);

    let directionIndex = 0;
    let currentElement = puzzleInput.elements.find((e) => e.value === "AAA")!;

    while (currentElement.value !== "ZZZ") {
        const direction =
            puzzleInput.directions[
                directionIndex % puzzleInput.directions.length
            ];
        currentElement = getNextElement(
            direction,
            currentElement,
            puzzleInput.elements
        );

        directionIndex++;
    }

    console.log(directionIndex);
}

function partTwo(input: string): void {
    const puzzleInput = parseInput(input);

    let currentElements = puzzleInput.elements.filter((e) =>
        e.value.endsWith("A")
    )!;
    let directionIndices = Array(currentElements.length).fill(0);

    for (let i = 0; i < currentElements.length; i++) {
        while (!currentElements[i].value.endsWith("Z")) {
            const direction =
                puzzleInput.directions[
                    directionIndices[i] % puzzleInput.directions.length
                ];
            currentElements[i] = getNextElement(
                direction,
                currentElements[i],
                puzzleInput.elements
            );

            directionIndices[i]++;
        }
    }

    // https://stackoverflow.com/questions/47047682/least-common-multiple-of-an-array-values-using-euclidean-algorithm
    function gcd(a: number, b: number): number {
        return a ? gcd(b % a, a) : b;
    }
    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    console.log(directionIndices.reduce(lcm));
}

partOne(file);
partTwo(file);
