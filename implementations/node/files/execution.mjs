import { fileURLToPath } from "url";

export function iAmBeingExecuted(url) {
    return process.argv[1] === fileURLToPath(url)
}