import { Mapper } from "../implementations/node/core/array/map.mjs";
import fs from "fs";
import { Sorter } from "../implementations/node/core/array/sort.mjs";

function readOrDefault(def, path, mapper = Mapper.identity, isDir = true) {
    return def != null
        ? [def]
        : fs.readdirSync(path, { withFileTypes: true })
            .filter(dir => isDir ? dir.isDirectory() : dir.isFile())
            .map(dir => dir.name)
            .map(mapper)
            .sort(Sorter.ascending)
}

export function readYears(year) {
    return readOrDefault(year, 'problems', Mapper.toInt)
}

export function readDays(year, day) {
    return readOrDefault(day, `problems/${year}`, (name) => parseInt(name.split('-')[1]))
}

export function readTypes(year, dayIndex, type) {
    return readOrDefault(type, `problems/${year}/day-${dayIndex}`)
        .filter(name => type == null ? true : name.startsWith(type))
}

export function readParts(year, dayIndex, type, part) {
    const partDefault = part && `part-${part}`
    return readOrDefault(partDefault, `problems/${year}/day-${dayIndex}/${type}`, Mapper.identity, false)
        .filter(name => name.startsWith('part'))
        .map(name => name.split('-')[1][0])
}
