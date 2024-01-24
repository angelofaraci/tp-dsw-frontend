import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
let gamePage: GamePageComponent
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamePageComponent, NavBarComponent,],
      providers: [],
      imports: [RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable()
    gamePage = fixture.nativeElement()
  });

  it('should create', fakeAsync(() => {
    expect(gamePage).toBeTruthy();
  }));
});
