import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { UsersComponent } from "./pages/users/users.component";
import { PedidosComponent } from "./pages/pedidos/pedidos.component";
import { InventariosComponent } from "./pages/inventarios/inventarios.component";
import { adminGuard } from "../core/guards/admin.guard";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { clienteGuard } from "../core/guards/cliente.guard";
import { empleadoGuard } from "../core/guards/empleado.guard";

@NgModule({
    imports:[
        RouterModule.forChild([
            { //dashboard/home
                path:'home', component: HomeComponent
              },
              {
                path:"perfil",
                component:UserDetailComponent,
              },
              {
                //dashboard/users
                path:'users', 
                canActivate:[adminGuard],
                component: UsersComponent,
                loadChildren: () => import('./pages/users/users.module').then( (m) => m.UsersModule),
              },
              {
                //dashboard/productoss
                path:'products',
                canActivate:[empleadoGuard],
                component: ProductosComponent,
                loadChildren: () => import('./pages/productos/productos.module').then( (m) => m.ProductosModule),
              },
              {
                //dashboard/pedidos
                path:'pedidos',
                component: PedidosComponent,
                loadChildren: () => import('./pages/pedidos/pedidos.module').then( (m) => m.PedidosModule),
              },
              {
                //dashboard/inventarios
                path:'inventarios',
                canActivate: [clienteGuard],
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
