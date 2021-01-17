import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesEditComponent } from './games-edit.component';

describe('GamesEditComponent', () => {
  let component: GamesEditComponent;
  let fixture: ComponentFixture<GamesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
