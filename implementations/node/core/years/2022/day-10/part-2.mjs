import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { states } from "./common.mjs";

export function execute(input) {
    let state = states(input)
    const screen = [[], [], [], [], [], []]

    for (let i = 0; i < 240; i++) {
        const sprite = state[i].x
        const row = Math.floor(i / 40);
        const pos = i % 40

        if (sprite - 1 <= pos && pos <= sprite + 1) screen[row].push('#')
        else screen[row].push('.')
    }

    return screen.map(row => row.join('')).join('\n')
}


if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 10, 1, 'toy')))
}

