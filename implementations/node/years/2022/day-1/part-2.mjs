import { readElfBagTotals } from "./part-1.mjs";
import { sortAscending } from "../../../array/sort.mjs";
import { sumArray } from "../../../array/reduce.mjs";
import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";

export function execute(input) {
    const summedBags = readElfBagTotals(input)
    const sortedElfs = sortAscending(summedBags)
    const topThree = sortedElfs.slice(0, 3)
    return sumArray(topThree)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(`Top three elfs have ${execute(readInputString(2022, 1, 1))} calories.`)
}

