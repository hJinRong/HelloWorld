const globalData = {}

export function set(key, val) {
    globalData[key] = val
    return 1
}

export function get(key) {
    return globalData[key]
}