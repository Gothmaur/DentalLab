import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductIndexComponent } from './pages/product-index/product-index.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/productos
      path:'', 
      component: ProductIndexComponent
    },
    {
      //dashboard/productos/:id
      path:':id',
      component: ProductDetailsComponent
    },
    {  
        path: '**', 
        redirectTo: 'productos'
    }
  ]
    
  )],
  exports: [RouterModule]
})
export class productosRoutingModule { }
