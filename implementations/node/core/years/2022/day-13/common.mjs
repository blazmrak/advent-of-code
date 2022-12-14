function parseArray(array) {
    if (array === '[]') {
        return []
    } else if (array.startsWith('[')) {
        let res = []
        let start = 0
        let depth = 0
        array = array.substring(1)
        array = array.substring(0, array.length - 1)
        for (let i = 0; i < array.length; i++) {
            if (array[i] === '[') {
                depth++
            } else if (array[i] === ']') {
                depth--
            } else if (array[i] === ',' && depth === 0) {
                res.push(parseArray(array.substring(start, i)))
                start = i + 1
            }
        }
        if (start < array.length) {
            res.push(parseArray(array.substring(start)))
        }

        return res
    } else {
        return parseInt(array, 10)
    }
}

export function parseInput(input) {
    const pairs = input.split('\n\n')
        .map(lines => lines.split('\n'))

    return pairs.map(pair => pair.map(parseArray))
}

export function evaluatePair([left, right]) {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left > right) {
            return -1
        } else if (left < right) {
            return 1
        } else {
            return 0
        }
    } else if (typeof left === 'object' && typeof right === 'object') {
        for (let i = 0; i < left.length; i++) {
            if (i >= right.length) {
                return -1;
            }

            const res = evaluatePair([left[i], right[i]])
            if (res !== 0) {
                return res
            }
        }

        if(left.length < right.length) {
            return 1
        } else {
            return 0
        }
    } else if (typeof left === 'number' && typeof right === 'object') {
        return evaluatePair([[left], right])
    } else if (typeof left === 'object' && typeof right === 'number') {
        return evaluatePair([left, [right]])
    } else {
        throw 'wtf'
    }
}
