import { Reducer } from "../../../array/reduce.mjs";

export function dirSizes(input) {
    const dirs = {
        '/': 0
    }
    let dir = ''
    for (const line of input.split('\n')) {
        if (line.startsWith('$')) {
            const [_, command, value] = line.split(' ')
            if (command === 'cd') {
                if (value === '..') {
                    dir = dir.substring(0, dir.lastIndexOf('/'))
                } else if (value === '/') {
                    dir = '/'
                } else {
                    if (dir === '/')
                        dir += value
                    else
                        dir += '/' + value
                }
            }
        } else if (!line.startsWith('dir')) {
            const [size_str] = line.split(' ')
            const size = parseInt(size_str, 10)
            if (dir === '/') {
                dirs['/'] += size
            } else {
                const path = dir.split('/')
                path.shift()
                let temp = ''
                for (const p of path) {
                    temp += p + '/'
                    dirs[temp] ??= 0
                    dirs[temp] += size
                }
            }
        }
    }

    dirs['/'] = totalSize(dirs)

    return dirs
}

function totalSize(dirs) {
    return Object.entries(dirs).filter(([key]) => /^(\w+)\/$/.test(key)).map(([_, value]) => value).reduce(Reducer.sum) + dirs['/']
}
