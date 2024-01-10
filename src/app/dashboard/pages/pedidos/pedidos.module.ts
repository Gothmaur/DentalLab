import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { PedidosComponent } from './pedidos.component';
import { PedidoDetailsComponent } from './pages/pedido-details/pedido-details.component';
import { PedidoDialogComponent } from './components/pedido-dialog/pedido-dialog.component';
import { PedidoTableComponent } from './components/pedido-table/pedido-table.component';
import { PedidosRoutingModule } from './pedidos-routing.module';



@NgModule({
  declarations: [
    PedidosComponent,
    PedidoDetailsComponent,
    PedidoDialogComponent,
    PedidoTableComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
