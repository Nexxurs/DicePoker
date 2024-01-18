import { Component, Input, ViewChild, inject } from '@angular/core';
import { GameService } from '../game.service';
import { NgbPopoverModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { RollType } from '../../types/types';

@Component({
  selector: 'app-point-field',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './point-field.component.html',
  styleUrl: './point-field.component.css'
})
export class PointFieldComponent {
  @Input() name!: string
  @Input() col!: number
  @Input() rolltype!: RollType

  @ViewChild("popover", { static: true }) popover!: NgbPopover

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

  private applyGameModifiersToPoints(points: number): number {
    let mods = this.gameService.getColumnModifiers(this.col)

    if (mods.multiplier) {
      return points * mods.multiplier
    }
    return points
  }

  getPossiblePoints() {
    let result: { label: string, points: number }[] = []
    result.push({ label: "", points: 0 })
    result = result.concat(this.rolltype.possibleValues.map(val => {
      let pointsModified = this.applyGameModifiersToPoints(val)
      return { label: pointsModified.toString(), points: pointsModified }
    }))
    result.push({ label: "X", points: -1 })
    return result
  }

  onSetPoints(points: number) {
    this.gameService.setPoints(this.name, this.col, this.rolltype.label, points);
    this.popover.close()
  }

}
