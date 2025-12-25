import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GameService} from "../game.service";

@Component({
  selector: 'app-score-modal',
  standalone: true,
  imports: [],
  templateUrl: './score-modal.component.html',
  styleUrl: './score-modal.component.css'
})
export class ScoreModalComponent {
  activeModal = inject(NgbActiveModal);
  gameService = inject(GameService);

  close() {
    this.activeModal.close()
  }

  getPlayerAndScores() {
    return this.gameService.getPlayers()
      .map(name => ({
        name,
        score: this.gameService.getPlayerTotal(name)
      }))
      .sort((a, b) => b.score - a.score);
  }
}
