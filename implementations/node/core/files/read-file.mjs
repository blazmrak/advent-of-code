import fs from 'fs'

export function readInputString(year, day, part, type = 'real') {
    return fs.readFileSync(`problems/${year}/day-${day}/part-${part}/${type}/input.txt`).toString()
}