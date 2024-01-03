import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventarios } from '../../Models/inventarios';

@Component({
  selector: 'app-inventario-table',
  templateUrl: './inventario-table.component.html',
  styleUrls: ['./inventario-table.component.scss']
})
export class InventarioTableComponent {
  displayedColumns: string[] = ['material', 'unidad_medida', 'cantidad','fecha_caducidad','acciones'];
  @Input()
  dataSource: Inventarios[] = [];
  @Output()
  deleteProduct = new EventEmitter<Inventarios>();
  @Output()
  editProduct = new EventEmitter<Inventarios>();
}
