import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreationComponent } from './game-creation.component';

describe('GameCreationComponent', () => {
  let component: GameCreationComponent;
  let fixture: ComponentFixture<GameCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCreationComponent]
    });
    fixture = TestBed.createComponent(GameCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
