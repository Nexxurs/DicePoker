import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConfigModalComponent } from './game-config-modal.component';

describe('GameConfigModalComponent', () => {
  let component: GameConfigModalComponent;
  let fixture: ComponentFixture<GameConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameConfigModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
