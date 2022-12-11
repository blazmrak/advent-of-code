import { Reducer } from "../../../array/reduce.mjs";
import { dirSizes } from "./common.mjs";

function sumSmallerThan(size, dirs) {
    return Object.values(dirs).filter((value) => value < size).reduce(Reducer.sum)
}

export function execute(input) {
    return sumSmallerThan(100_000, dirSizes(input))
}
