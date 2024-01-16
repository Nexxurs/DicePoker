import { Component, Input } from '@angular/core';
import { RollNames } from '../../types/types';
import { rangeTo } from '../../utils/range';
import { PointFieldComponent } from '../point-field/point-field.component';

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
  rollTypes = RollNames

  rangeTo = rangeTo
}
