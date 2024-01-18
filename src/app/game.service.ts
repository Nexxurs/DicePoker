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

  resetGame() {
    this.currGame = undefined
  }

  gameStarted() {
    return Boolean(this.currGame)
  }

  getNumberColumns() {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.numCols
  }

  getPlayers() {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }    
    return this.currGame.getPlayers()
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

  getPlayerTotal(playerName: string): number {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.getPlayerTotal(playerName)
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
    let arr: Map<string, number>[] = Array(this.numCols).fill(0).map(() => new Map())
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

  getPlayers(): string[] {    
    return Array.from(this.gamestates.keys())
  }

  getPlayerTotal(name: string): number {
    let player = this.gamestates.get(name)
    if(!player) {
      throw Error("Player "+name+" is not registered!")
    }
    let total = 0
    player.forEach(columnMap => {
      columnMap.forEach((value, _) => {
        if (value >= 0) {
          total += value
        }
      })
    })
    return total
  }

}