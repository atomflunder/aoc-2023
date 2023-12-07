import { readFileSync } from "fs";

const file = readFileSync("./src/day-07/input.txt", "utf-8");

const cardValuesPartOne = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
};

const cardValuesPartTwo = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    J: 1,
};

const cardCombinations = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPairs: 3,
    pair: 2,
    highCard: 1,
};

type Hand = {
    cards: string;
    value: number;
    cardValue?: number;
};

type CardCount = [string, number][];

function parseInput(input: string): Hand[] {
    const hands = [];

    const lines = input.split("\n");

    for (const line of lines) {
        const [cards, value] = line.split(" ");

        hands.push({ cards, value: parseInt(value) } as Hand);
    }

    return hands;
}

function countCards(hand: string, isPartTwo: boolean): CardCount {
    let cards: CardCount = [];

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        if (cards.some((c) => c[0] === card)) {
            cards.find((c) => c[0] === card)![1]++;
        } else {
            cards.push([card, 1]);
        }
    }

    cards = cards.sort((a, b) => b[1] - a[1]);

    if (isPartTwo) {
        if (cards.length === 1) {
            return cards;
        }

        if (cards[0][0] !== "J") {
            const jokers = cards.filter((c) => c[0] === "J");

            if (jokers.length > 0) {
                cards[0][1] += jokers[0][1];
            }
        } else {
            cards[1][1] += cards[0][1];
        }

        cards = cards.filter((c) => c[0] !== "J");

        cards = cards.sort((a, b) => b[1] - a[1]);
    }

    return cards;
}

function getCardValue(cards: number[]): number {
    if (cards[0] === 5) {
        return cardCombinations.fiveOfAKind;
    } else if (cards[0] === 4) {
        return cardCombinations.fourOfAKind;
    } else if (cards[0] === 3 && cards[1] === 2) {
        return cardCombinations.fullHouse;
    } else if (cards[0] === 3) {
        return cardCombinations.threeOfAKind;
    } else if (cards[0] === 2 && cards[1] === 2) {
        return cardCombinations.twoPairs;
    } else if (cards[0] === 2) {
        return cardCombinations.pair;
    } else {
        return cardCombinations.highCard;
    }
}

function sortHands(hands: Hand[], isPartTwo: boolean): Hand[] {
    const cardValues = isPartTwo ? cardValuesPartTwo : cardValuesPartOne;

    return hands.sort((a, b) => {
        if (a.cardValue === b.cardValue) {
            for (let i = 0; i < a.cards.length; i++) {
                const letterA = a.cards[i] as keyof typeof cardValues;
                const letterB = b.cards[i] as keyof typeof cardValues;

                if (cardValues[letterA] === cardValues[letterB]) {
                    continue;
                }

                return cardValues[letterB] - cardValues[letterA];
            }
        }

        return b.cardValue! - a.cardValue!;
    });
}

function partOne(input: string): void {
    let hands = parseInput(input);

    for (const hand of hands) {
        const cards = countCards(hand.cards, false).map((c) => c[1]);

        hand.cardValue = getCardValue(cards);
    }

    hands = sortHands(hands, false);

    let multiplier = hands.length;

    let total = 0;

    for (const hand of hands) {
        total += hand.value * multiplier;
        multiplier--;
    }

    console.log(total);
}

function partTwo(input: string): void {
    let hands = parseInput(input);

    for (const hand of hands) {
        const cards = countCards(hand.cards, true).map((c) => c[1]);

        hand.cardValue = getCardValue(cards);
    }

    hands = sortHands(hands, true);

    let multiplier = hands.length;

    let total = 0;

    for (const hand of hands) {
        total += hand.value * multiplier;
        multiplier--;
    }

    console.log(total);
}

partOne(file);
partTwo(file);
