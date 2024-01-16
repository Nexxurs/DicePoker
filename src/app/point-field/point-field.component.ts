import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { GameService } from '../game.service';
import { PopoverModule, PopoverDirective } from 'ngx-bootstrap/popover'
import { RollType } from '../../types/types';

@Component({
  selector: 'app-point-field',
  standalone: true,
  imports: [PopoverModule],
  templateUrl: './point-field.component.html',
  styleUrl: './point-field.component.css'
})
export class PointFieldComponent {
  @Input() name!: string
  @Input() col!: number
  @Input() rolltype!: RollType

  @ViewChild("popover", { static: true }) popover!: PopoverDirective

  private gameService = inject(GameService)
  getPoints() {
    let points = this.gameService.getPoints(this.name, this.col, this.rolltype.label)
    if (points == 0) {
      return " "
    }
    if (points < 0) {
      return "X"
    }
    return points
  }

  onSetPoints(points: number) {
    this.gameService.setPoints(this.name, this.col, this.rolltype.label, points);
    this.popover.hide()
  }

}
