import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventarioDetailsComponent } from './pages/inventario-details/inventario-details.component';
import { InventarioIndexComponent } from './pages/inventario-index/inventario-index.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/inventarios
      path:'', 
      component: InventarioIndexComponent
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
