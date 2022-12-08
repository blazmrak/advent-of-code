import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { Mapper } from "../../../array/map.mjs";

export function execute(input) {
    const set = new Set()
    const grid = input.split('\n').map(row => row.split('').map(Mapper.toInt))
    let min = -1

    for (let i = 0; i < grid.length; i++) {
        min = -1
        for (let j = 0; j < grid[i].length; j++) {
            if (min < grid[i][j]) {
                min = grid[i][j]
                set.add(`${i}-${j}`)
            }
        }
    }

    for (let j = 0; j < grid[0].length; j++) {
        min = -1
        for (let i = 0; i < grid.length; i++) {
            if (min < grid[i][j]) {
                min = grid[i][j]
                set.add(`${i}-${j}`)
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        min = -1
        for (let j = grid[i].length - 1; j >= 0; j--) {
            if (min < grid[i][j]) {
                min = grid[i][j]
                set.add(`${i}-${j}`)
            }
        }
    }

    for (let j = 0; j < grid[grid.length - 1].length; j++) {
        min = -1
        for (let i = grid.length - 1; i >= 0; i--) {
            if (min < grid[i][j]) {
                min = grid[i][j]
                set.add(`${i}-${j}`)
            }
        }
    }

    return set.size
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 8, 1, 'real')))
}