import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { PedidoDetailsComponent } from './pages/pedido-details/pedido-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/pedidos
      path:'pedidos', 
      component: PedidosComponent
    },
    {
      //dashboard/pedidos/:id
      path:':id',
      component: PedidoDetailsComponent
    },
    {  
        path: '**', 
        redirectTo: 'Pedidos'
    }
  ]
    
  )],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
