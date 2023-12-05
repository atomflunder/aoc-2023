import { readFileSync } from "fs";

const file = readFileSync("./src/day-05/input.txt", "utf-8");

class AlmanacMap {
    sourceStart: number;
    destinationStart: number;
    length: number;

    constructor(dest = NaN, source = NaN, len = NaN) {
        if (isNaN(source) || isNaN(dest) || isNaN(len)) {
            throw "Empty Almanac Map";
        }

        this.sourceStart = source;
        this.destinationStart = dest;
        this.length = len;
    }

    map(n: number) {
        if (n < this.sourceStart || n > this.sourceStart + this.length)
            return null;
        return this.destinationStart + n - this.sourceStart;
    }
}

type SeedMapData = {
    seeds: number[];
    steps: Record<Exclude<keyof typeof mapDic, "seeds">, AlmanacMap[]>;
};

const mapDic = {
    i2s: "seed-to-soil",
    s2f: "soil-to-fertilizer",
    f2w: "fertilizer-to-water",
    w2l: "water-to-light",
    l2t: "light-to-temperature",
    t2h: "temperature-to-humidity",
    h2r: "humidity-to-location",
};

function getSeedMap(lines: string): SeedMapData {
    const rxSeeds = /seeds:\s+((?:\d+\s+)+)\r\n/i.exec(lines)!;

    const seeds = rxSeeds[1].split(" ").map((r) => parseInt(r));
    const retAlmanacs: SeedMapData = {
        seeds,
        steps: {
            i2s: [],
            s2f: [],
            f2w: [],
            w2l: [],
            l2t: [],
            t2h: [],
            h2r: [],
        },
    };

    for (const k in mapDic) {
        const key = k as keyof typeof mapDic;
        const str = mapDic[key];

        const rx = new RegExp(
            `${str} map:[\\s\\n]+((?:\\d+(?:\\s|$)+)+)(?:\\r\\n){0,2}`,
            "ig"
        );
        const ex = rx.exec(lines);
        if (!ex) {
            console.error("null", rx, ex);
            continue;
        }
        const mapLines = ex[1].trim().split("\r\n");

        for (const mapLine of mapLines) {
            const nums = mapLine.split(" ").map((r) => parseInt(r.trim()));
            retAlmanacs.steps[key].push(new AlmanacMap(...nums));
        }
    }
    return retAlmanacs;
}

function partOne(input: string): void {
    const data = getSeedMap(input);

    const seedLocations = data.seeds.map((m) => {
        const executeStep = (
            almanac: keyof SeedMapData["steps"],
            num: number
        ): number => {
            return (
                data.steps[almanac].reduce<number | null>(
                    (p, n) => (p ? p : n.map(num)),
                    null
                ) || num
            );
        };

        let ret = m;

        for (const almanac in data.steps) {
            const key = almanac as keyof SeedMapData["steps"];
            const rt = executeStep(key, ret);
            ret = rt;
        }

        return ret;
    });

    console.log(Math.min(...seedLocations));
}

function partTwo(input: string): void {
    const data = getSeedMap(input);

    function executeAStep(
        step: keyof SeedMapData["steps"],
        num: number
    ): number {
        for (const almanac of data.steps[step]) {
            const mappedNum = almanac.map(num);
            if (mappedNum) return mappedNum;
        }
        return num;
    }

    function executeAllStepsForANumber(number: number) {
        let ret = number;
        for (const step in data.steps) {
            const key = step as keyof SeedMapData["steps"];
            const rt = executeAStep(key, ret);
            ret = rt;
        }
        return ret;
    }

    // This takes around 10 minutes
    let lowest: number = Infinity;

    for (let i = 0; i < data.seeds.length; i += 2) {
        const place = data.seeds[i];
        const seednum = data.seeds[i + 1];

        for (let seed = place; seed < place + seednum; seed++) {
            const loc = executeAllStepsForANumber(seed);
            if (loc < lowest) lowest = loc;
        }
    }

    console.log(lowest);
}

partOne(file);
partTwo(file);
