import { Injectable } from '@angular/core';
import { GameType, isGameType } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currGame?: Game
  private pointsChangedCallback?: () => void
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

  /**
   * Stop and remove the current game
   */
  resetGame() {
    this.currGame = undefined
    clearGameInLocalStorage()
  }

  /**
   * Stop the current game and start a new one with the same options
   */
  restartGame() {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    let options = this.currGame.options
    let players = this.currGame.getPlayers()
    this.resetGame()
    this.newGame(options, players)

  }

  setPointsChangedListener(callback: () => void) {
    this.pointsChangedCallback = callback
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
    if (this.pointsChangedCallback) {
      this.pointsChangedCallback()
    }
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

  reorderPlayers(names: string[]) {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    this.currGame.reorderPlayers(names)
  }

  deletePlayer(name: string) {
    if (!this.currGame) {
      throw Error("Game not initialized")
    }
    this.currGame.deletePlayer(name)
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

  reorderPlayers(names: string[]) {
    let newGameStates = new Map(names.map(n => [n, this.gamestates.get(n)]))
    if (newGameStates === undefined) {
      throw Error("Something went wrong")
    }
    this.gamestates = newGameStates as GameStateMap
  }

  deletePlayer(name: string) {
    this.gamestates.delete(name);
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
const LOCALSTORAGE_KEY_GAMETYPE = "GameType"
function loadGameFromLocalStorage(): Game | undefined {
  let stored_string = localStorage.getItem(LOCALSTORAGE_KEY_GAME)
  if (!stored_string) return undefined

  console.log("Loading Game from LocalStorage");
  let stored_value = JSON.parse(stored_string, jsonReviver)
  // todo sanity checks

  return new Game(stored_value.options, stored_value.gamestates)
}

function saveGameToLocalStorage(game: Game) {
  console.log("Saving Game into LocalStorage");

  let game_string = JSON.stringify(game, jsonReplacer)
  localStorage.setItem(LOCALSTORAGE_KEY_GAME, game_string)
}

function clearGameInLocalStorage() {
  console.log("Clearing Game from LocalStorage");

  localStorage.removeItem(LOCALSTORAGE_KEY_GAME)
}

export function getGameTypeFromLocalStorage(): GameType | undefined {
  console.log("Loading GameType from LocalStorage")
  let stored_string = localStorage.getItem(LOCALSTORAGE_KEY_GAMETYPE)
  if (!stored_string) {
    return undefined
  }
  if (isGameType(stored_string)) {
    return stored_string
  }
  return undefined
}

export function saveGameTypeToLocalStorage(gametype: GameType) {
  console.log("Saving GameType ito LocalStorage", gametype)
  localStorage.setItem(LOCALSTORAGE_KEY_GAMETYPE, gametype)
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
