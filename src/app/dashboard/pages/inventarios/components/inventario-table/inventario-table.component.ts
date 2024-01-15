import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Inventarios } from '../../Models/inventarios';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventario-table',
  templateUrl: './inventario-table.component.html',
  styleUrls: ['./inventario-table.component.scss']
})
export class InventarioTableComponent {
  displayedColumns: string[] = ['material', 'unidad_medida', 'cantidad','fecha_caducidad','acciones'];
  dataSourceMatTable!: MatTableDataSource<Inventarios>;
 
  @Input()
  dataSource: Inventarios[] = [];
  @Output()
  deleteProduct = new EventEmitter<Inventarios>();
  @Output()
  editProduct = new EventEmitter<Inventarios>();

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

  customFilterPredicate(data: Inventarios, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    const name = data.material.toLowerCase();
    const unidadMedida = data.unidad_medida.toLowerCase();
    const cant = data.cantidad_disponible.toString(); 
    const fechaCaducidad = new Date(data.fecha_caducidad);
    
    return (name.includes(transformedFilter) 
    || unidadMedida.includes(transformedFilter) 
    || cant.includes(transformedFilter) 
    || fechaCaducidad.toString().includes(transformedFilter)
    || (fechaCaducidad.getMonth()+1).toString().includes(transformedFilter)
    || fechaCaducidad.getFullYear().toString().includes(transformedFilter));
  }

}
