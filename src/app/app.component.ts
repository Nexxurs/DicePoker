import {Component, HostListener, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';
import { SetupComponent } from './setup/setup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameFieldComponent } from './game-field/game-field.component';
import {ScreenUtilsService} from "./screen-utils.service";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SetupComponent, GameFieldComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dice-poker-angular';

  gameService = inject(GameService)
  private screenUtils = inject(ScreenUtilsService)

  @HostListener('window:resize')
  onResize() {
    this.screenUtils.onResize()
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
      <button type="button" class="btn" (click)="onRematch()">Rematch</button>
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

  onRematch() {
    this.gameService.restartGame()
    this.close()
  }
}
