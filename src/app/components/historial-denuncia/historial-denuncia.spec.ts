import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDenuncia } from './historial-denuncia';

describe('HistorialDenuncia', () => {
  let component: HistorialDenuncia;
  let fixture: ComponentFixture<HistorialDenuncia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialDenuncia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialDenuncia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
