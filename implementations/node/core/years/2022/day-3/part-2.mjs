import { sumCommonItems } from './common.mjs'

function groupIntoThrees(input) {
    const split = input.split('\n')
    return new Array(split.length/3).fill(0).map(() => split.splice(0, 3))
}

export function execute(input) {
    return sumCommonItems(groupIntoThrees(input))
}
