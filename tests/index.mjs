import axios from "axios";
import fs from "fs";

async function request(year, day, part, input) {
    return (await axios.post(`/years/${year}/days/${day}/parts/${part}`, { input }, { baseURL: 'http://localhost:3000' })).data.result
}

async function evaluate({ year, dayIndex, partIndex, input, expected, showSolution = false }) {
    const result = await request(year, dayIndex, partIndex, input)

    if (expected !== result.toString()) {
        console.error(`X ${year}/day-${dayIndex}[${partIndex}] failed. ${showSolution ? `Expected ${expected} but got ${result}.` : ''}`)
    } else {
        console.log(`_ ${year}/day-${dayIndex}[${partIndex}] passed.`)
    }
}

async function readInputAndExpected({ year, dayIndex, partIndex, type }) {
    const path = `problems/${year}/day-${dayIndex}/part-${partIndex}/${type}`
    const input = fs.readFileSync(`${path}/input.txt`).toString()
    const expected = fs.readFileSync(`${path}/result.txt`).toString()
    return { input, expected }
}

const year = 2022
const days = fs.readdirSync(`problems/${year}`, { withFileTypes: true }).filter(d => d.isDirectory())
for (const day of days) {
    const dayIndex = day.name.split('-')[1]

    const parts = fs.readdirSync(`problems/${year}/day-${dayIndex}`, { withFileTypes: true }).filter(d => d.isDirectory())
    for (const part of parts) {
        const partIndex = part.name.split('-')[1]

        const { input, expected } = await readInputAndExpected({ year, dayIndex, partIndex, type: 'real' })
        await evaluate({ year, dayIndex, partIndex, input, expected })
    }
}