import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GameOption, GameService } from '../game.service';
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

  private createGameOptions(): GameOption {
    switch (this.gameType) {
      case 'TWO':
        return {
          numberColumns: 2
        }
      case 'THREE':
        return {
          numberColumns: 3
        }
    }
  }

  startGame() {
    if (this.players.length === 0) {
      console.warn("Cannot start game without players - ignoring event")
      return
    }
    let options = this.createGameOptions()

    this.gameService.newGame(options)
    this.players.forEach((player) => this.gameService.addPlayer(player))
  }
}
