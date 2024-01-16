import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  @ViewChild("playername", { static: true }) playerinput!: ElementRef
  @ViewChild("numCols", { static: true }) numColsInput!: ElementRef

  players: string[] = []

  private gameService = inject(GameService)

  addPlayer(name: string) {
    this.players.push(name)
    this.playerinput.nativeElement.value = ""
  }

  startGame() {
    console.log("Starting Game", this.players);

    let numCols = this.numColsInput.nativeElement.value as number
    console.log("cols", numCols);

    this.gameService.newGame(numCols)
    for (let player in this.players) {
      this.gameService.addPlayer(player)
    }
    console.log(this.gameService.gameStarted());

  }
}
