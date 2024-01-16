export enum RollType {
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    STREET = "Str",
    FULLHOUSE = "Full",
    POKER = "Poker",
    GRANDE = "Grande"
}

// 1, 2, 3, ..., Str, Full, Poker, Grande
export const RollNames = Object.values(RollType)