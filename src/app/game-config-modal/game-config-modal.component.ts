import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GameService} from "../game.service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-game-config-modal',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './game-config-modal.component.html',
  styleUrl: './game-config-modal.component.css'
})
export class GameConfigModalComponent {
  activeModal = inject(NgbActiveModal);
  gameService = inject(GameService);

  players: string[]
  playersAdded: string[]
  playersDeleted: string[]


  constructor() {
    this.players = this.gameService.getPlayers()
    this.playersAdded = []
    this.playersDeleted = []
  }

  playerDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  saveAndClose() {
    // todo save changes
    //  1. check if users have to be deleted (if username is not in current users)
    //  2. check if users have to be added (if username is still in current users)
    //  3. reorder users
    this.gameService.reorderPlayers(this.players)
    this.activeModal.close()
  }

  // todo on create user: check if username is duplicate first

  cancel() {
    this.activeModal.close()
  }
}
