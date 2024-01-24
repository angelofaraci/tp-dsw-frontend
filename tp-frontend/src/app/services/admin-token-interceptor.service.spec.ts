import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './admin-token-interceptor.service';

describe('AdminTokenInterceptorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
