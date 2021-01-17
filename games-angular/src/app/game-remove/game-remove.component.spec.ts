import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRemoveComponent } from './game-remove.component';

describe('GameRemoveComponent', () => {
  let component: GameRemoveComponent;
  let fixture: ComponentFixture<GameRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
