import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesDetailComponent } from './inscripciones-detail.component';

describe('InscripcionesDetailComponent', () => {
  let component: InscripcionesDetailComponent;
  let fixture: ComponentFixture<InscripcionesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionesDetailComponent]
    });
    fixture = TestBed.createComponent(InscripcionesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
