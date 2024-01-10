import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedidos } from '../../Models/pedidos';

@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido-table.component.html',
  styleUrls: ['./pedido-table.component.scss']
})
export class PedidoTableComponent {
  displayedColumns: string[] = ['cliente', 'producto', 'pendiente', 'fecha_entrega','acciones'];
  @Input()
  dataSource: Pedidos[] = [];
  @Output()
  deletePedido = new EventEmitter<Pedidos>();
  @Output()
  editPedido = new EventEmitter<Pedidos>();
}
