function navigate(dir, destination) {
    if (destination === '..') {
        return dir.substring(0, dir.lastIndexOf('/'))
    } else if (destination === '/') {
        return '/'
    } else {
        if (dir === '/')
            return dir + destination
        else
            return dir + '/' + destination
    }
}

class DirSizeTracker {
    dir = ''
    dirs = {
        '/': 0
    }

    navigate(value) {
        this.dir = navigate(this.dir, value)
    }

    trackFile(size) {
        const path = this.dir.split('/')
        let temp = ''
        for (const p of path) {
            temp += p + '/'
            this.dirs[temp] ??= 0
            this.dirs[temp] += size
        }
    }
}

export function dirSizes(input) {
    const tracker = new DirSizeTracker()

    for (const line of input.split('\n')) {
        if (line.startsWith('$ cd')) {
            tracker.navigate(line.split(' ')[2])
        } else if (!line.startsWith('$') && !line.startsWith('dir')) {
            const [size_str] = line.split(' ')
            const size = parseInt(size_str, 10)

            tracker.trackFile(size)
        }
    }

    return tracker.dirs
}
