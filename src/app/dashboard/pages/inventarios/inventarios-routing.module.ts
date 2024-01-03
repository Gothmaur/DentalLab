import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventariosComponent } from './inventarios.component';
import { InventarioDetailsComponent } from './pages/inventario-details/inventario-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/inventarios
      path:'inventarios', 
      component: InventariosComponent
    },
    {
      //dashboard/inventarios/:id
      path:':id',
      component: InventarioDetailsComponent
    },
    {  
        path: '**', 
        redirectTo: 'inventarios'
    }
  ]
    
  )],
  exports: [RouterModule]
})
export class inventariosRoutingModule { }
