import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/productos
      path:'productos', 
      component: ProductosComponent
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
