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
    let numCols = Number(this.numColsInput.nativeElement.value)

    this.gameService.newGame(numCols)
    this.players.forEach((player) => this.gameService.addPlayer(player))
  }
}
