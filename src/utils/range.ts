export function rangeTo(until: number, startAt1: boolean = false) {
    let move_index = 0
    if (startAt1) {
        move_index = 1
    }
    return Array(until).fill(0).map((_, i) => i + move_index)
}