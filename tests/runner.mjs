import { readDays, readParts, readTypes, readYears } from "./read.mjs";
import axios, { AxiosError } from "axios";
import fs from "fs";

function readFile(path) {
    try {
        return fs.readFileSync(path).toString()
    } catch {
        return null
    }
}

async function request(year, day, part, input, params) {
    return (await axios.post(`/years/${year}/days/${day}/parts/${part}`, { input, params }, { baseURL: 'http://localhost:3000' })).data.result
}

function evaluate({ type, year, dayIndex, partIndex, result, expected, showSolution = true }) {
    if (expected !== result?.toString()) {
        console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] failed. ${showSolution ? `Expected ${expected} but got ${result}.` : ''}`)
    } else {
        console.log(`_ <${type}> ${year}/day-${dayIndex}[${partIndex}] passed.`)
    }
}

export async function testLocal({ type, year, dayIndex, partIndex, input, params, expected, showSolution = true }) {
    try {
        const result = await (await import(`../implementations/node/core/years/${year}/day-${dayIndex}/part-${partIndex}.mjs`)).execute(input, params)

        evaluate({ year, dayIndex, type, partIndex, expected, result, params, showSolution })
    } catch (e) {
        console.log(e)
        console.error(`X <${type}> ${year}/day-${dayIndex}[${partIndex}] died.`)
    }
}

export async function testApi({ type, year, dayIndex, partIndex, input, params, expected, showSolution = true }) {
    try {
        const result = await request(year, dayIndex, partIndex, input, params)

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
    const input = readFile(inputPath)

    const paramsPath = `problems/${year}/day-${dayIndex}/${type}/params-${partIndex}.json`
    const params = JSON.parse(readFile(paramsPath)) ?? {}

    const resultPath = `problems/${year}/day-${dayIndex}/${type}/part-${partIndex}.txt`
    const expected = readFile(resultPath)


    return { input, expected, params }
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
                    const { input, expected, params } = await readInputAndExpectedV2({ year, dayIndex, partIndex, type })
                    await tester({ type, year, dayIndex, params, partIndex, input, expected })
                }
            }
        }
    }
}
