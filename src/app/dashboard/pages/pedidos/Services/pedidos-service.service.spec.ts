import { TestBed } from '@angular/core/testing';

import { PedidoService } from './pedidos-service.service';

describe('PedidoServiceService', () => {
  let service: PedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
