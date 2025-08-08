import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDenuncia } from './registro-denuncia';

describe('RegistroDenuncia', () => {
  let component: RegistroDenuncia;
  let fixture: ComponentFixture<RegistroDenuncia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDenuncia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDenuncia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
