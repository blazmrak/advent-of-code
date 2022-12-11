import { dirSizes } from "./common.mjs";

const sizeOfDisk = 70_000_000
const needed = 30_000_000

function smallestDirToMakeEnoughFreeSpace(dirs) {
    const free = sizeOfDisk - dirs['/']
    return Math.min(...Object.values(dirs).filter(value => free + value > needed))
}
export function execute(input) {
    return smallestDirToMakeEnoughFreeSpace(dirSizes(input))
}
