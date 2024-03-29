import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ColumnModifier, GameOption, GameService, getGameTypeFromLocalStorage, saveGameTypeToLocalStorage } from '../game.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GameType } from '../../types/types';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [NgbTooltip, FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  @ViewChild("playername", { static: true }) playerinput!: ElementRef

  gameType: GameType = "TWO"

  players: string[] = []

  private gameService = inject(GameService)

  constructor() {
    let storedGameType = getGameTypeFromLocalStorage()
    if (storedGameType) {
      this.gameType = storedGameType
    }
  }

  addPlayer(name: string) {
    if (name.length === 0) {
      return
    }

    if (this.players.includes(name)) {
      console.warn("Cannot add Player twice - ignoring event")
      // todo show the user some warning
      return
    }

    this.players.push(name)
    this.playerinput.nativeElement.value = ""
  }

  deletePlayer(name: String) {
    this.players = this.players.filter((other) => other !== name)
  }

  private createGameOptions(): GameOption {
    let columnMods: Map<number, ColumnModifier> = new Map()
    switch (this.gameType) {
      case 'TWO':
        columnMods.set(0, { label: "1x" })
        columnMods.set(1, { label: "2x", multiplier: 2 })
        return {
          numberColumns: 2,
          columnModifiers: columnMods
        }
      case 'THREE':
        columnMods.set(0, { label: "↓" })
        columnMods.set(1, { label: "↑"})
        columnMods.set(2, { label: "F"})
        return {
          numberColumns: 3,
          columnModifiers: columnMods
        }
    }
  }

  startGame() {
    if (this.playerinput.nativeElement.value !== "") {
      this.addPlayer(this.playerinput.nativeElement.value)
    }

    if (this.players.length === 0) {
      console.warn("Cannot start game without players - ignoring event")
      return
    }
    let options = this.createGameOptions()

    this.gameService.newGame(options, this.players)
    saveGameTypeToLocalStorage(this.gameType)
  }
}
