import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponent } from './inventario-table.component';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableComponent]
    });
    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
