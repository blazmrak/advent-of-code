import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { Reducer } from "../../../array/reduce.mjs";
import { dirSizes } from "./common.mjs";

function sumSmallerThan(size, dirs) {
    return Object.values(dirs).filter((value) => value < size).reduce(Reducer.sum)
}

export function execute(input) {
    return sumSmallerThan(100_000, dirSizes(input))
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 7, 1, 'toy')))
}