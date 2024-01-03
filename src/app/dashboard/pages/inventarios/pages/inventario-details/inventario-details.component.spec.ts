import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDetailsComponent } from './inventario-details.component';

describe('InventarioDetailsComponent', () => {
  let component: InventarioDetailsComponent;
  let fixture: ComponentFixture<InventarioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioDetailsComponent]
    });
    fixture = TestBed.createComponent(InventarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
