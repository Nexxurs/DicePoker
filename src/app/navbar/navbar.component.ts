import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {ScreenUtilsService} from "../screen-utils.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScoreModalComponent} from "../score-modal/score-modal.component";
import {NewGameModal} from "../app.component";
import {GameConfigModalComponent} from "../game-config-modal/game-config-modal.component";
import {NgOptimizedImage} from "@angular/common";
import {WakelockComponent} from "../icons/wakelock/wakelock.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    WakelockComponent
  ],
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
    this.isCollapsed = true;
  }

  openPlayerModal() {
    this.modalService.open(GameConfigModalComponent)
    this.isCollapsed = true;
  }

  onNewGame() {
    this.modalService.open(NewGameModal);
    this.isCollapsed = true;
  }

  // Wakelock stuff - might be better in their own service!
  wakeLock: WakeLockSentinel|null = null;

  isWakeLockActive(): boolean {
    return this.wakeLock !== null
  }

  async requestWakeLock() {
    try {
      this.wakeLock = await navigator.wakeLock.request("screen");
      console.log("Wake Lock is active");

      this.wakeLock.addEventListener("release", () => {
        this.wakeLock = null;
        console.log("Wake Lock was released");
      });
    } catch (err) {
      const error = err as Error
      console.error(`${error.name}, ${error.message}`);
    }
  }
}
