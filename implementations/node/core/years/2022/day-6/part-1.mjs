import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { startOfSignal } from "./common.mjs";


export function execute(input) {
    return startOfSignal(input, 4)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 6, 1, 'real')))
}