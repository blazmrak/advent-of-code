export const Mapper = {
    toInt(string) {
        return parseInt(string, 10)
    },
    toBigInt(string) {
        return BigInt(parseInt(string, 10))
    },
    peek(val) {
        console.log(val)
        return val
    },
    identity(e) {
        return e
    }
}