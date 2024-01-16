import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currGame?: Game
  constructor() { }

  newGame(numCols: number) {
    this.currGame = new Game(numCols)
  }

  addPlayer(name: string) {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    this.currGame.addPlayer(name)
  }

  setPoints(name: string, col: number, rolltype: string, value: number) {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    this.currGame.setPoints(name, col, rolltype, value)
  }

  getPoints(name: string, col: number, rolltype: string): number {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.getPoints(name, col, rolltype)
  }
}


class Game {
  numCols: number
  private gamestates: Map<string, Map<string, number>[]> = new Map()

  constructor(numCols: number) {
    this.numCols = numCols
  }

  addPlayer(name: string) {
    if (this.gamestates.has(name)) {
      throw Error("User " + name + " cannot be added twice")
    }
    let arr = Array(this.numCols).fill(0).map(() => new Map())
    this.gamestates.set(name, arr)
  }

  setPoints(name: string, col: number, rolltype: string, value: number) {
    let gameForPlayer = this.gamestates.get(name)
    if (!gameForPlayer) {
      throw Error("Name " + name + " is no Player in this game!")
    }
    let columnMap = gameForPlayer[col]
    columnMap.set(rolltype, value)
  }

  getPoints(name: string, col: number, rolltype: string): number {
    let gameForPlayer = this.gamestates.get(name)
    if (!gameForPlayer) {
      throw Error("Name " + name + " is no Player in this game!")
    }
    let columnMap = gameForPlayer[col]
    if (!columnMap.has(rolltype)) {
      return 0
    }
    return columnMap.get(rolltype) as number
  }
}