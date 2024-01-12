import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioIndexComponent } from './inventario-index.component';

describe('InventarioIndexComponent', () => {
  let component: InventarioIndexComponent;
  let fixture: ComponentFixture<InventarioIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioIndexComponent]
    });
    fixture = TestBed.createComponent(InventarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
