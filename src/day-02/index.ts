import { readFileSync } from "fs";

const file = readFileSync("./src/day-02/input.txt", "utf-8");

function partOne(input: string): void {
    const lines = input.split("\n");

    const maxNums = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const allGames: string[] = [];
    const inpossibleGames: string[] = [];

    for (const line of lines) {
        const [gameIndex, rawGames] = line.split(": ");

        const games = rawGames.split("; ");

        allGames.push(gameIndex);

        gameloop: for (const game of games) {
            const singleInput = game.split(", ");

            for (let single of singleInput) {
                single = single.trim();

                const [num, color] = single.split(" ");

                if (color === "red" || color === "green" || color === "blue") {
                    if (parseInt(num) > maxNums[color]) {
                        inpossibleGames.push(gameIndex);
                        continue gameloop;
                    }
                }
            }
        }
    }

    const possibleGames = allGames.filter(
        (game) => !inpossibleGames.includes(game)
    );

    const indices = possibleGames.map((game) => {
        const [g, i] = game.split(" ");
        return parseInt(i);
    });

    console.log(indices.reduce((a, b) => a + b, 0));
}

function partTwo(input: string): void {
    const lines = input.split("\n");

    let sum = 0;

    for (const line of lines) {
        const [_index, rawGames] = line.split(": ");

        const games = rawGames.split("; ");

        const most = {
            red: 0,
            green: 0,
            blue: 0,
        };

        for (const game of games) {
            const singleInput = game.split(", ");

            for (let single of singleInput) {
                single = single.trim();

                const [num, color] = single.split(" ");

                if (color === "red" || color === "green" || color === "blue") {
                    if (most[color] < parseInt(num)) {
                        most[color] = parseInt(num);
                    }
                }
            }
        }

        sum += most.red * most.green * most.blue;
    }

    console.log(sum);
}

partOne(file);
partTwo(file);
