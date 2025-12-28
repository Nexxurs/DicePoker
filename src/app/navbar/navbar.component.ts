import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {ScreenUtilsService} from "../screen-utils.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScoreModalComponent} from "../score-modal/score-modal.component";
import {NewGameModal} from "../app.component";
import {GameConfigModalComponent} from "../game-config-modal/game-config-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
  screenUtils = inject(ScreenUtilsService)
  private modalService = inject(NgbModal)

  isCollapsed: boolean = true

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  openScoreModal() {
    this.modalService.open(ScoreModalComponent)
  }

  openPlayerModal() {
    this.modalService.open(GameConfigModalComponent)
  }

  onNewGame() {
    this.modalService.open(NewGameModal);
  }
}
