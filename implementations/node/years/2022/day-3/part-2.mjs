import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { sumCommonItems } from './common.mjs'

function groupIntoThrees(input) {
    const split = input.split('\n')
    return new Array(split.length/3).fill(0).map(() => split.splice(0, 3))
}

export function execute(input) {
    return sumCommonItems(groupIntoThrees(input))
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 3, 2, 'toy')))
}