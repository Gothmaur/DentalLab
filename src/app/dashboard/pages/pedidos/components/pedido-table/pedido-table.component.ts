import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Pedidos } from '../../Models/pedidos';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido-table.component.html',
  styleUrls: ['./pedido-table.component.scss']
})
export class PedidoTableComponent {
  displayedColumns: string[] = ['cliente', 'producto', 'pendiente', 'fecha_entrega','acciones'];
  dataSourceMatTable!: MatTableDataSource<Pedidos>;


  @Input()
  dataSource: Pedidos[] = [];
  @Output()
  deletePedido = new EventEmitter<Pedidos>();
  @Output()
  editPedido = new EventEmitter<Pedidos>();

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

  customFilterPredicate(data: Pedidos, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    const name = data.dr_solicitante.toLowerCase();
    const tratamiento = data.paciente_tratamiento.toLowerCase();
    const pendiente = (data.precio_total - data.abono).toString(); 
    const fechaEntrega = new Date(data.fecha_entrega);
    
    return (name.includes(transformedFilter) 
    || tratamiento.includes(transformedFilter) 
    || pendiente.includes(transformedFilter) 
    || fechaEntrega.toString().includes(transformedFilter)
    || (fechaEntrega.getMonth()+1).toString().includes(transformedFilter)
    || fechaEntrega.getFullYear().toString().includes(transformedFilter));
  }
}
