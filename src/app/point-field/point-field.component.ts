import { Component, Input, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-point-field',
  standalone: true,
  imports: [],
  templateUrl: './point-field.component.html',
  styleUrl: './point-field.component.css'
})
export class PointFieldComponent {
  @Input() name!: string
  @Input() col!: number
  @Input() rolltype!: string

  private gameService = inject(GameService)
  getPoints() {
    let points = this.gameService.getPoints(this.name, this.col, this.rolltype)
    if (points == 0) {
      return " "
    }
    if (points < 0) {
      return "X"
    }
    return points
  }

  onclick() {
    console.log("Clicked!")
  }
}
