import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {GameService} from "../game.service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-game-config-modal',
  standalone: true,
  imports: [CdkDropList, CdkDrag, NgOptimizedImage],
  templateUrl: './game-config-modal.component.html',
  styleUrl: './game-config-modal.component.css'
})
export class GameConfigModalComponent {
  activeModal = inject(NgbActiveModal);
  gameService = inject(GameService);

  players: string[]
  playersAdded: Set<string>
  playersDeleted: Set<string>

  @ViewChild("playername", { static: true }) playerinput!: ElementRef


  constructor() {
    this.players = this.gameService.getPlayers()
    this.playersAdded = new Set()
    this.playersDeleted = new Set()
  }

  playerDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  playerDelete(playerName: string) {
    this.playersDeleted.add(playerName);
    const index = this.players.indexOf(playerName);
    if (index > -1) {
      this.players.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  playerAdd(playerName: string) {
    if (this.players.includes(playerName)) {
      // todo add indication why this does not work
      console.error("Cannot add multiple persons with the same name.")
      return;
    }
    this.playersAdded.add(playerName);
    this.players.push(playerName);
    this.playerinput.nativeElement.value = ""
  }

  saveAndClose() {
    //  1. check if users have to be deleted (if username is not in current users)
    this.playersDeleted.forEach(p => {
      if (!this.players.includes(p)) {
        this.gameService.deletePlayer(p)
      }
    })

    //  2. check if users have to be added (if username is still in current users)
    this.playersAdded.forEach(p => {
      if (this.players.includes(p)) {
        try {
          this.gameService.addPlayer(p)
        } catch (e) {
          console.error("Cannot add player - probably exists already");
        }
      }
    })

    //  3. reorder users
    this.gameService.reorderPlayers(this.players)
    this.gameService.saveGame()
    this.activeModal.close()
  }


  cancel() {
    this.activeModal.close()
  }
}
