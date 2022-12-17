import { getRowRanges, parseInput } from "./common.mjs";

export function execute(input, { range }) {
    const sensors = parseInput(input)

    for (let i = 0; i <= range; i++) {
        const { sensorsRange } = getRowRanges(sensors, i)
        if (sensorsRange.length > 1) {
            return 4_000_000 * (sensorsRange[0][1] + 1) + i
        }
    }

    return 0
}