import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'logIn',
      'loggedIn',
    ]);
    TestBed.configureTestingModule({
      declarations: [LogInComponent, NavBarComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the log in div', () => {
    const div = fixture.debugElement.query(By.css('.loginBox.container.mt-4'))
    expect(div).toBeTruthy()
  })

  it('should call logIn on AuthService and navigate to /home on success', async () => {
    const fakeToken = 'fakeToken';

    spyOn(component['router'], 'navigate');
    authService.logIn.and.returnValue(of({ token: fakeToken }));

    await component.logIn();

    expect(authService.logIn).toHaveBeenCalledWith(component.user);
    expect(localStorage.getItem('token')).toEqual(fakeToken);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);

  });

  it('should call logIn on AuthService and give an error', async () => {
    
      const err = new Error('error');
      spyOn(component['router'], 'navigate');
      authService.logIn.and.returnValue(throwError(err));
      try{await component.logIn()} catch (err) {
        console.error('Hubo un error!!!!!!!!');
      };
      fixture.detectChanges();
      expect(authService.logIn).toHaveBeenCalledWith(component.user);
      expect(component.error).toBeTrue();
      expect(component['router'].navigate).not.toHaveBeenCalled();
    
  });
});
