export type RollType = { label: string, possibleValues: number[] }

function possibleValuesForNumber(num: number) {
    let result: number[] = []
    for (let i = 1; i <= 5; i++) {
        result.push(i * num)
    }
    return result
}

export const RollTypes: RollType[] = [
    { label: "1", possibleValues: possibleValuesForNumber(1) },
    { label: "2", possibleValues: possibleValuesForNumber(2) },
    { label: "3", possibleValues: possibleValuesForNumber(3) },
    { label: "4", possibleValues: possibleValuesForNumber(4) },
    { label: "5", possibleValues: possibleValuesForNumber(5) },
    { label: "6", possibleValues: possibleValuesForNumber(6) },
    { label: "S", possibleValues: [20, 25] },
    { label: "F", possibleValues: [30, 35] },
    { label: "P", possibleValues: [40, 45] },
    { label: "G", possibleValues: [50, 100] }
]

export type GameType = "TWO" | "THREE"
export function isGameType(test: string): test is GameType {
    return ["TWO", "THREE"].includes(test)
}