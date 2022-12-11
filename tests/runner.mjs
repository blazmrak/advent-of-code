import { readDays, readParts, readTypes, readYears } from "./read.mjs";
import axios, { AxiosError } from "axios";
import fs from "fs";

async function request(year, day, part, input) {
    return (await axios.post(`/years/${year}/days/${day}/parts/${part}`, { input }, { baseURL: 'http://localhost:3000' })).data.result
}

function evaluate({ type, year, dayIndex, partIndex, result, expected, showSolution = true }) {
    if (expected !== result.toString()) {
        console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] failed. ${showSolution ? `Expected ${expected} but got ${result}.` : ''}`)
    } else {
        console.log(`_ <${type}> ${year}/day-${dayIndex}[${partIndex}] passed.`)
    }
}

export async function testLocal({ type, year, dayIndex, partIndex, input, expected, showSolution = true }) {
    try {
        const result = await (await import(`../implementations/node/core/years/${year}/day-${dayIndex}/part-${partIndex}.mjs`)).execute(input)

        evaluate({ year, dayIndex, type, partIndex, expected, result, showSolution })
    } catch (e) {
        console.log(e)
        console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] died.`)
    }
}

export async function testApi({ type, year, dayIndex, partIndex, input, expected, showSolution = true }) {
    try {
        const result = await request(year, dayIndex, partIndex, input)

        evaluate({ year, dayIndex, type, partIndex, expected, result, showSolution })
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.response?.status === 501) console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] not implemented.`)
            else console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] died on server.`)
        } else {
            console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] died.`)
        }
    }
}

async function readInputAndExpectedV2({ year, dayIndex, partIndex, type }) {
    const inputPath = `problems/${year}/day-${dayIndex}/${type}/input.txt`
    const input = fs.readFileSync(inputPath).toString()

    const resultPath = `problems/${year}/day-${dayIndex}/${type}/part-${partIndex}.txt`
    const expected = fs.readFileSync(resultPath).toString()

    return { input, expected }
}

export async function runTests({ year, day, part, type }, tester = testApi) {
    const years = readYears(year)
    for (const year of years) {
        const days = readDays(year, day)
        for (const dayIndex of days) {
            const types = readTypes(year, dayIndex, type)
            for (const type of types) {
                const parts = readParts(year, dayIndex, type, part)
                for (const partIndex of parts) {
                    const { input, expected } = await readInputAndExpectedV2({ year, dayIndex, partIndex, type })
                    await tester({ type, year, dayIndex, partIndex, input, expected })
                }
            }
        }
    }
}
