import { readElfBagTotals } from "./part-1.mjs";
import { sortAscending } from "../../../../node/array/sort.mjs";
import { sumArray } from "../../../../node/array/reduce.mjs";
import { readInputString } from "../../../../node/files/read-file.mjs";
import { iAmBeingExecuted } from "../../../../node/files/execution.mjs";

export function execute(input) {
    const summedBags = readElfBagTotals(input)
    const sortedElfs = sortAscending(summedBags)
    const topThree = sortedElfs.slice(0, 3)
    return sumArray(topThree)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(`Top three elfs have ${execute(readInputString(2022, 1, 1))} calories.`)
}

