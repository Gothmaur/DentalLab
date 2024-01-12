import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoIndexComponent } from './pedido-index.component';

describe('PedidoIndexComponent', () => {
  let component: PedidoIndexComponent;
  let fixture: ComponentFixture<PedidoIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoIndexComponent]
    });
    fixture = TestBed.createComponent(PedidoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
