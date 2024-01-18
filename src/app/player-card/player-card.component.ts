import { Component, Input, inject } from '@angular/core';
import { RollTypes } from '../../types/types';
import { rangeTo } from '../../utils/range';
import { PointFieldComponent } from '../point-field/point-field.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [PointFieldComponent],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {
  @Input() numColumns!: number
  @Input() playerName!: string
  rollTypes = RollTypes
  gameService = inject(GameService)

  rangeTo = rangeTo

  totalPoints() {
    return this.gameService.getPlayerTotal(this.playerName)
  }
}
