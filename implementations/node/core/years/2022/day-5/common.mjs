import { Mapper } from "../../../array/map.mjs";

function parseColumns(crates) {
    const rows = crates.split('\n').reverse()
    const columnNumber = parseInt(rows.shift().at(-1), 10)
    const columns = []

    for (let i = 0; i < columnNumber; i++) {
        let column = rows.map(row => {
            let rowElement = row[1 + i + i * 3];
            if (!rowElement || rowElement === ' ') return undefined;
            else return rowElement;
        })
            .filter(item => item)
        if (column) columns.push(column)
    }

    return columns
}

function parseInstructions(instructions) {
    return instructions.split('\n')
        .map(instruction =>
            /move (\d+) from (\d+) to (\d+)/.exec(instruction)
                .splice(1, 3)
                .map(Mapper.toInt)
        )
}


export function executeInstructions(columns, instructions, callback) {
    instructions
        .map(([nCrates, from, to]) => [nCrates, from - 1, to - 1])
        .forEach((instruction) => {
            callback(columns, instruction)
        })

    return columns.map(column => column.at(-1)).join('')
}

export function parseInput(input) {
    const [crates, instructions] = input.split('\n\n')
    const columns = parseColumns(crates)
    const parsedInstructions = parseInstructions(instructions)

    return [columns, parsedInstructions]
}
