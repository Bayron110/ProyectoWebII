import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPanico } from './boton-panico';

describe('BotonPanico', () => {
  let component: BotonPanico;
  let fixture: ComponentFixture<BotonPanico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonPanico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonPanico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
