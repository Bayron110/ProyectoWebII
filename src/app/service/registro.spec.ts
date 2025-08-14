import { TestBed } from '@angular/core/testing';
import { Registro } from '../pages/registro/registro';



describe('Registro', () => {
  let service: Registro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Registro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
