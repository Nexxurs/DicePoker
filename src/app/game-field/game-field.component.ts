import { Component, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { GameService } from '../game.service';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {ScreenUtilsService} from "../screen-utils.service";

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [PlayerCardComponent, NgbCarouselModule],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css',
  encapsulation: ViewEncapsulation.None
})
export class GameFieldComponent {
  gameService = inject(GameService)
  screenUtils = inject(ScreenUtilsService)

  @ViewChild('smallCarousel', { static: false }) smallCarousel!: NgbCarousel;

  ngOnInit() {
    this.gameService.setPointsChangedListener(this.onPointsChanged.bind(this))
  }

  private onPointsChanged() {
    if (this.smallCarousel) {
      this.smallCarousel.next()
    }
  }
}
