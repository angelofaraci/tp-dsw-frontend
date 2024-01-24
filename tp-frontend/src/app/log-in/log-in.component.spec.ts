import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent, NavBarComponent],
      providers: [AuthService],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
