import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Products } from '../../Models/productos';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectIsAdministrador } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  displayedColumns: string[] = ['curso', 'descripcion', 'precio','acciones'];
  dataSourceMatTable!: MatTableDataSource<Products>;
  isAdmin!:boolean;

  @Input()
  dataSource: Products[] = [];
  @Output()
  deleteProduct = new EventEmitter<Products>();
  @Output()
  editProduct = new EventEmitter<Products>();

  constructor(private store:Store){
    this.store.select(selectIsAdministrador).subscribe((isAdmin) => this.isAdmin = isAdmin);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.dataSourceMatTable = new MatTableDataSource(this.dataSource);
      this.dataSourceMatTable.filterPredicate = this.customFilterPredicate.bind(this);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMatTable.filter = filterValue.trim().toLowerCase();
  }

  customFilterPredicate(data: Products, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    const name = data.nombre.toLowerCase();
    const desc = data.descripcion.toLowerCase();
    const precio = (data.precio * 1.16).toString();
    return name.includes(transformedFilter) || desc.includes(transformedFilter)|| precio.includes(transformedFilter);;
  }
}
