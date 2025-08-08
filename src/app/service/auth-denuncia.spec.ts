import { TestBed } from '@angular/core/testing';

import { AuthDenuncia } from './auth-denuncia';

describe('AuthDenuncia', () => {
  let service: AuthDenuncia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDenuncia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
