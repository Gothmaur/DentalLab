import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { UsersComponent } from "./pages/users/users.component";
import { InscripcionesComponent } from "./pages/inscripciones/inscripciones.component";
import { PedidosComponent } from "./pages/pedidos/pedidos.component";
import { InventariosComponent } from "./pages/inventarios/inventarios.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            { //dashboard/home
                path:'home', component: HomeComponent
              },
              {
                //dashboard/users
                path:'users', 
                component: UsersComponent,
                loadChildren: () => import('./pages/users/users.module').then( (m) => m.UsersModule),
              },
              {
                //dashboard/productoss
                path:'products',
                component: ProductosComponent,
                loadChildren: () => import('./pages/productos/productos.module').then( (m) => m.ProductosModule),
              },
              {
                //dashboard/inscripciones
                path:'inscripciones',
                component: InscripcionesComponent,
                loadChildren: () => import('./pages/inscripciones/inscripciones.module').then( (m) => m.InscripcionesModule),
              },
              {
                //dashboard/pedidos
                path:'pedidos',
                component: PedidosComponent,
                loadChildren: () => import('./pages/pedidos/pedidos.module').then( (m) => m.PedidosModule),
              },
              {
                //dashboard/
                path:'inventarios',
                component: InventariosComponent,
                loadChildren: () => import('./pages/inventarios/inventarios.module').then( (m) => m.InventariosModule),
              },
              {
                path: '**',
                redirectTo: 'home'
              }
        ]),
    ],
    exports : [ RouterModule ]
})
export class DashboardRoutingModule{}
