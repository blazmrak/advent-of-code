import { getRowRanges, parseInput } from "./common.mjs";

export function execute(input, { yTarget }) {
    const sensors = parseInput(input)

    const { relevantSensors, sensorsRange } = getRowRanges(sensors, yTarget)

    const total = sensorsRange.reduce((acc, [left, right]) => acc + right - left + 1, 0)

    const beaconsOnRow = relevantSensors
        .map(sensor => sensor.beacon)
        .filter(([, y]) => y === yTarget)
        .reduce((acc, current) => {
            if (!acc.some(([x, y]) => current[0] === x && current[1] === y)) {
                acc.push(current)
            }

            return acc
        }, [])
        .length


    return total - beaconsOnRow
}