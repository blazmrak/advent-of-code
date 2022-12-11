import { Mapper } from "../../../array/map.mjs";
import { Reducer } from "../../../array/reduce.mjs";
import { Sorter } from "../../../array/sort.mjs";

function makeFunctionForOp(op, amount, normalize) {
    switch (op) {
        case '*':
            if (amount === 'old') {
                return (old) => old * old
            } else {
                const intAmount = parseInt(amount, 10)
                return (old) => (old * intAmount) % normalize
            }
        case '+':
            if (amount === 'old') {
                return (old) => old + old
            } else {
                const intAmount = parseInt(amount, 10)
                return (old) => (old + intAmount) % normalize
            }
    }
}

function createNewWorryFunction(line, smallestCommonDenominator, mapOperation) {
    const [_old, op, right] = line.substring(17).split(' ');
    return mapOperation(makeFunctionForOp(op, right, smallestCommonDenominator))
}

function parseStartingItems(input) {
    return input.substring(15).split(', ').map(Mapper.toInt)
}

function parseDecision(lines, divisibleBy) {
    const onTrue = parseInt(lines[0].substring(25), 0)
    const onFalse = parseInt(lines[1].substring(26), 0)
    return (worry) => worry % divisibleBy === 0 ? onTrue : onFalse
}

function parseDivisibleBy(line) {
    return parseInt(line.substring(18), 10)
}

export function parseInput(input, mapOperation = (operation) => (worry) => Math.floor(operation(worry) / 3)) {
    const monkeys = input.split('\n\n')
        .map(monkey => monkey.split('\n'))
        .map(lines => lines.map(line => line.trim()).slice(1))
        .map(lines => ({
            operationLine: lines[1],
            decisionLines: lines.slice(3),
            monkey: {
                items: parseStartingItems(lines[0]),
                divisibleBy: parseDivisibleBy(lines[2]),
            }
        }))
        .map(({ operationLine, decisionLines, monkey }) => {
            monkey.decideNextMonkey = parseDecision(decisionLines, monkey.divisibleBy)
            return {
                operationLine,
                monkey
            }
        })

    const smallestCommonDenominator = monkeys.map(m => m.monkey.divisibleBy).reduce(Reducer.multiply)

    return monkeys.map(({ monkey, operationLine }) => {
        monkey.calculateNewWorry = createNewWorryFunction(operationLine, smallestCommonDenominator, mapOperation)
        return monkey
    })
}

export function playRounds(monkeys, nRounds) {
    const counter = new Array(monkeys.length).fill(0)

    for(let round = 0; round < nRounds; round++) {
        for(let m = 0; m < monkeys.length; m++) {
            const monkey = monkeys[m];

            while(monkey.items.length > 0) {
                counter[m]++

                const item = monkey.items.shift()
                const newCost = monkey.calculateNewWorry(item)
                const nextMonkey = monkey.decideNextMonkey(newCost)
                monkeys[nextMonkey].items.push(newCost)
            }
        }
    }

    return counter.sort(Sorter.ascending).slice(0, 2).reduce(Reducer.multiply)
}