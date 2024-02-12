import { Component, inject, HostListener, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { GameService } from '../game.service';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

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

  isSmallScreen: boolean = false

  @ViewChild('smallCarousel', { static: false }) smallCarousel!: NgbCarousel;

  ngOnInit() {
    this.calculateSmallScreen()
    this.gameService.setPointsChangedListener(this.onPointsChanged.bind(this))
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateSmallScreen()
  }

  private calculateSmallScreen() {
    this.isSmallScreen = window.innerWidth < 600    
  }

  private onPointsChanged() {
    if (this.smallCarousel) {
      this.smallCarousel.next()
    }
  }
}
