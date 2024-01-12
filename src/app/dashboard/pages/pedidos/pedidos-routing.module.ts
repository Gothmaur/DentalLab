import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoDetailsComponent } from './pages/pedido-details/pedido-details.component';
import { PedidoIndexComponent } from './pages/pedido-index/pedido-index.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/pedidos
      path:'', 
      component: PedidoIndexComponent
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
