import { testLocal, runTests } from "./runner.mjs";

function isNumber(value) {
    if (typeof value === 'number') return true
    else if (typeof value !== 'string') return false
    else return !isNaN(parseInt(value, 10))
}

const { args, opts: { A: all, L: local } } = process.argv
    .filter(arg => !arg.startsWith('C:') && !arg.startsWith('D:'))
    .reduce((acc, arg) => {
        if (arg.startsWith('-')) {
            acc.opts[arg.substring(1)] = true
        } else {
            acc.args.push(arg)
        }

        return acc
    }, { args: [], opts: {} })

const selectors = ['year', 'day', 'part', 'type']

const config = args
    .map((arg, i) => {
        const isType = !isNumber(arg)
        return {
            index: i,
            isType,
            arg: !isType ? parseInt(arg, 10) : arg,
        }
    })
    .map(({ arg, index, isType }) => {
        return {
            selector: isType ? 'type' : selectors[index],
            arg
        }
    })
    .reduce((acc, { selector, arg }) => {
        acc[selector] = arg
        return acc
    }, {
        year: 2022,
        type: 'real'
    })

if (config.part && !config.day) {
    console.error('Day must be defined if part is defined')
    process.exit(1);
}

if (all) {
    config.type = undefined
}

if (local) {
    runTests(config, testLocal)
} else {
    runTests(config)
}

