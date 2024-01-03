import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { InventariosComponent } from './inventarios.component';
import { InventarioDialogComponent } from './components/inventario-dialog/Inventarios-dialog.component';
import { InventarioTableComponent } from './components/inventario-table/inventario-table.component';
import { InventarioDetailsComponent } from './pages/inventario-details/inventario-details.component';
import { inventariosRoutingModule } from './inventarios-routing.module';



@NgModule({
  declarations: [
    InventariosComponent,
    InventarioDialogComponent,
    InventarioTableComponent,
    InventarioDetailsComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    inventariosRoutingModule
  ]
})
export class InventariosModule { }
