import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ColumnModifier, GameOption, GameService } from '../game.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [NgbTooltip, FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  @ViewChild("playername", { static: true }) playerinput!: ElementRef

  gameType: "TWO" | "THREE" = "TWO"

  players: string[] = []

  private gameService = inject(GameService)

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
        columnMods.set(1, { label: "↑", multiplier: 2 })
        columnMods.set(2, { label: "F", multiplier: 2 })
        return {
          numberColumns: 3,
          columnModifiers: columnMods
        }
    }
  }

  startGame() {
    if (this.players.length === 0) {
      console.warn("Cannot start game without players - ignoring event")
      return
    }
    let options = this.createGameOptions()

    this.gameService.newGame(options, this.players)
  }
}
