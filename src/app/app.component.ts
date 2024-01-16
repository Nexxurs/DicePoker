import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dice-poker-angular';
  numCols = 3

  mainPlayer = "Testing (me)"

  gameService = inject(GameService)
  constructor() {
    this.gameService.newGame(3)
    this.gameService.addPlayer(this.mainPlayer)
  }
}
