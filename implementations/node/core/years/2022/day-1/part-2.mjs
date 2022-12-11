import { readElfBagTotals } from "./part-1.mjs";
import { sortAscending } from "../../../array/sort.mjs";
import { sumArray } from "../../../array/reduce.mjs";

export function execute(input) {
    const summedBags = readElfBagTotals(input)
    const sortedElfs = sortAscending(summedBags)
    const topThree = sortedElfs.slice(0, 3)
    return sumArray(topThree)
}
