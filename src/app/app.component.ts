import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameService } from './game.service';
import { SetupComponent } from './setup/setup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PlayerCardComponent, SetupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dice-poker-angular';
  gameService = inject(GameService)
  constructor() {
  }
}
