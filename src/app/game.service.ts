import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currGame?: Game
  constructor() {
    let savedGame = loadGameFromLocalStorage()
    if (savedGame) {
      this.currGame = savedGame
    }
  }

  newGame(options: GameOption, players: string[]) {
    this.currGame = new Game(options)
    players.forEach(player => this.addPlayer(player))
    saveGameToLocalStorage(this.currGame)
  }

  resetGame() {
    this.currGame = undefined
    clearGameInLocalStorage()
  }

  gameStarted() {
    return Boolean(this.currGame)
  }

  getNumberColumns() {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.options.numberColumns
  }

  getPlayers() {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.getPlayers()
  }

  private addPlayer(name: string) {
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
    saveGameToLocalStorage(this.currGame)
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

  getColumnModifiers(column: number): ColumnModifier {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    return this.currGame.getColumnModifiers(column)
  }
}

export interface ColumnModifier {
  label?: string
  multiplier?: number
}

export interface GameOption {
  numberColumns: number,
  columnModifiers?: Map<number, ColumnModifier>
}

type GameStateMap = Map<string, Map<string, number>[]>


class Game {
  options: GameOption
  private gamestates: GameStateMap

  constructor(options: GameOption, gamestates: GameStateMap | undefined = undefined) {
    this.options = options
    if (gamestates) {
      this.gamestates = gamestates
    } else {
      this.gamestates = new Map()
    }
  }

  addPlayer(name: string) {
    if (this.gamestates.has(name)) {
      throw Error("User " + name + " cannot be added twice")
    }
    let arr: Map<string, number>[] = Array(this.options.numberColumns).fill(0).map(() => new Map())
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
    if (!player) {
      throw Error("Player " + name + " is not registered!")
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

  getColumnModifiers(column: number): ColumnModifier {
    let colMods = this.options.columnModifiers?.get(column)
    if (!colMods) return {}
    return colMods
  }
}

const LOCALSTORAGE_KEY_GAME = "CurrentGame"
function loadGameFromLocalStorage(): Game | undefined {
  let stored_string = localStorage.getItem(LOCALSTORAGE_KEY_GAME)
  if (!stored_string) return undefined

  console.log("Loading Game from LocalStorage");
  let stored_value = JSON.parse(stored_string, jsonReviver)
  // todo sanity checks

  return new Game(stored_value.options, stored_value.gamestates)
}

function saveGameToLocalStorage(game: Game) {
  console.log("Saving Game ino LocalStorage");

  let game_string = JSON.stringify(game, jsonReplacer)
  localStorage.setItem(LOCALSTORAGE_KEY_GAME, game_string)
}

function clearGameInLocalStorage() {
  console.log("Clearing Game from LocalStorage");

  localStorage.removeItem(LOCALSTORAGE_KEY_GAME)
}

function jsonReplacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

function jsonReviver(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}