import fs from 'fs'

export function readInputString(year, day, part, type = 'real') {
    return fs.readFileSync(`${year}/problems/day-${day}/test/part${part}/${type}/input.txt`).toString()
}