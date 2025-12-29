import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WakelockComponent } from './wakelock.component';

describe('WakelockComponent', () => {
  let component: WakelockComponent;
  let fixture: ComponentFixture<WakelockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WakelockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WakelockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
