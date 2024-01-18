import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayerCardComponent } from './player-card/player-card.component';
import { GameService } from './game.service';
import { SetupComponent } from './setup/setup.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private modalService = inject(NgbModal)

  onNewGame() {
    this.modalService.open(NewGameModal);
  }
}


@Component({
  selector: 'app-new-game-modal',
  standalone: true,
  template: `
		<div class="modal-body">
			<p>Are you sure you want to start a new game? The current game will be lost!</p>
		</div>
		<div class="modal-footer">
      <button type="button" class="btn" (click)="onNewGame()">New Game</button>
			<button type="button" class="btn" (click)="close()">Cancel</button>
		</div>
	`,
})
export class NewGameModal {
  activeModal = inject(NgbActiveModal);
  gameService = inject(GameService)

  close() {
    this.activeModal.close()
  }

  onNewGame() {
    this.gameService.resetGame()
    this.close()
  }
}