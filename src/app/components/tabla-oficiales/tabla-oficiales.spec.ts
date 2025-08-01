import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOficiales } from './tabla-oficiales';

describe('TablaOficiales', () => {
  let component: TablaOficiales;
  let fixture: ComponentFixture<TablaOficiales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaOficiales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaOficiales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
