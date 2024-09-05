import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const authServiceMock = {
      logIn: jest.fn(),
      loggedIn: jest.fn().mockReturnValue(false)
    };

    await TestBed.configureTestingModule({
      declarations: [LogInComponent, NavBarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA] // This will ignore unknown elements like app-footer
    }).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the log in div', () => {
    const div = fixture.debugElement.query(By.css('.loginBox.container.mt-4'));
    expect(div).toBeTruthy();
  });

  it('should call logIn on AuthService and navigate to /home on success', async () => {
    const fakeToken = 'fakeToken';
    jest.spyOn(component['router'], 'navigate').mockResolvedValue(true);
    authService.logIn.mockReturnValue(of({ token: fakeToken }));
    
    component.user = { email: 'test@example.com', password: 'password123' };
    await component.logIn();
    
    expect(authService.logIn).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(localStorage.getItem('token')).toEqual(fakeToken);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/home']);
  });
  
  it('should call logIn on AuthService and give an error', async () => {
    const err = new Error('error');
    jest.spyOn(component['router'], 'navigate');
    const mockLogin = (authService.logIn as jest.Mock);
    mockLogin.mockReturnValue(throwError(() => err))
    
    component.user={email:'asd', password:'asd'}
    await component.logIn();
    
    expect(authService.logIn).toHaveBeenCalled();
    expect(component.logIn);
    expect(component['router'].navigate).not.toHaveBeenCalled();
  });
});