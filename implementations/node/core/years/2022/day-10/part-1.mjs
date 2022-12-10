import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { Reducer } from "../../../array/reduce.mjs";
import { states } from "./common.mjs";

export function execute(input) {
    let state = states(input)

    let values = []
    for (let i = 19; i < state.length; i += 40) {
        values.push([i + 1, state[i]])
    }

    return values.map(([i, value]) => i * value.x).reduce(Reducer.sum);
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 10, 1, 'real')))
}