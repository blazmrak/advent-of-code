import fs from 'fs'

export function readInputString(year, day, part, type = 'real') {
    return fs.readFileSync(`problems/${year}/day-${day}/${type}/input.txt`).toString()
}