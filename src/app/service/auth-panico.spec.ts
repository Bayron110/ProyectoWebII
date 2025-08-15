import { TestBed } from '@angular/core/testing';

import { AuthPanico } from './auth-panico';

describe('AuthPanico', () => {
  let service: AuthPanico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPanico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
