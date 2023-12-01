import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../Models/productos';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  displayedColumns: string[] = ['curso', 'descripcion', 'precio','acciones'];
  @Input()
  dataSource: Products[] = [];
  @Output()
  deleteProduct = new EventEmitter<Products>();
  @Output()
  editProduct = new EventEmitter<Products>();
}
