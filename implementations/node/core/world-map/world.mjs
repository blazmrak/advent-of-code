export class World {
    constructor(array) {
        this.array = array
    }

    static fromString(str, splitRow, splitColumn) {
        return this.from2dArray(str.split(splitRow).map(row => row.split(splitColumn)))
    }

    static from2dArray(array) {
        return new World(array)
    }

    static withDimensions(x, y, fill) {
        return new World(new Array(y).fill(0).map(() => new Array(x).fill(fill)))
    }

    get dimensions() {
        return [this.array[0].length, this.array.length]
    }

    pushRowOf(fill) {
        this.array.push(new Array(this.array[0].length).fill(fill))
        return this
    }

    getCoordinateOf(value) {
        for(let y = 0; y < this.array.length; y++) {
            for(let x = 0; x < this.array[y].length; x++) {
                if(this.array[y][x] === value) {
                    return [x, y]
                }
            }
        }

        return null
    }

    map(callback) {
        for(let y = 0; y < this.array.length; y++) {
            for(let x = 0; x < this.array[y].length; x++) {
                this.array[y][x] = callback(this.array[y][x])
            }
        }
        return this
    }

    get([x, y]) {
        return this.array[y][x]
    }

    set([x, y], value) {
        this.array[y][x] = value
    }

    toString(joinRow = '') {
        return this.array.map(row => row.join(joinRow)).join('\n')
    }

    isInsideWidth(x) {
        return x >= 0 && x < this.array[0].length
    }

    isInsideHeight(y) {
        return y >= 0 && y < this.array.length
    }

    isInside(pos) {
        return this.isInsideHeight(pos[1]) && this.isInsideWidth(pos[0])
    }

    get raw() {
        return this.array
    }
}