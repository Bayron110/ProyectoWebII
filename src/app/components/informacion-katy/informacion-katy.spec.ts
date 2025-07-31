import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionKaty } from './informacion-katy';

describe('InformacionKaty', () => {
  let component: InformacionKaty;
  let fixture: ComponentFixture<InformacionKaty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionKaty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionKaty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
