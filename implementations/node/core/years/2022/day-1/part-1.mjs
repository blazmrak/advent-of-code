import { Mapper } from "../../../array/map.mjs";
import { sumArray } from "../../../array/reduce.mjs";
import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";

function parseElfBags(input) {
    return input.split('\n\n').map(elfBag => elfBag.split('\n').map(Mapper.toInt))
}

function getEachElfBagTotal(bags) {
    return bags.map(sumArray)
}

export function readElfBagTotals(input) {
    const bags = parseElfBags(input)
    return getEachElfBagTotal(bags)
}

export function execute(input) {
    const bags = readElfBagTotals(input)
    return Math.max(...bags)
}

if(iAmBeingExecuted(import.meta.url)) {
    console.log(`Top elf has ${execute(readInputString(2022, 1, 1))} calories.`)
}

