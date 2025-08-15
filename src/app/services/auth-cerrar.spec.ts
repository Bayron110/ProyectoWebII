import { TestBed } from '@angular/core/testing';

import { AuthCerrar } from './auth-cerrar';

describe('AuthCerrar', () => {
  let service: AuthCerrar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCerrar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
