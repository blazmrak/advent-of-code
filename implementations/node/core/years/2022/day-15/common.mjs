import { Mapper } from "../../../array/map.mjs";
import { Sorter } from "../../../array/sort.mjs";
import { calcDistance } from "../../../math/distance.mjs";

export function parseInput(input) {
    return input.split('\n')
        .map(line => line.match(/(-?\d+)/g))
        .map(coordinates => coordinates.map(Mapper.toInt))
        .map(([xSensor, ySensor, xBeacon, yBeacon]) => {
            return {
                sensor: [xSensor, ySensor],
                beacon: [xBeacon, yBeacon],
                distance: Math.abs(xSensor - xBeacon) + Math.abs(ySensor - yBeacon)
            }
        })
}

export function collapseRanges(ranges) {
    return ranges
        .sort(([x1], [x2]) => Sorter.ascending(x1, x2))
        .reduce((acc, current) => {
            if (acc.length === 0) {
                acc.push(current)
            } else {
                const prev = acc[acc.length - 1]
                if (prev[0] <= current[0] && current[0] <= prev[1] || prev[0] <= current[1] && current[1] <= prev[1]) {
                    prev[0] = Math.min(prev[0], current[0])
                    prev[1] = Math.max(prev[1], current[1])
                } else {
                    acc.push(current)
                }
            }

            return acc
        }, [])
}

export function getRowRanges(sensors, yTarget) {
    const relevantSensors = sensors
        .filter(({sensor: [, y], distance}) => calcDistance(y, yTarget) < distance)

    const ranges = relevantSensors
        .map(({sensor: [x, y], distance}) => {
            const remainder = distance - calcDistance(y, yTarget)

            return [x - remainder, x + remainder]
        })

    const sensorsRange = collapseRanges(ranges)

    return { relevantSensors, sensorsRange }
}

