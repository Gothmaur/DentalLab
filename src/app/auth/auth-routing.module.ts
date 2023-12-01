import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponentComponent } from "./pages/LogIn/login-component/login-component.component";
import { RegisterComponentComponent } from "./pages/registro/register-component/register-component.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {
                //auth/login/
                path:'login',
                component: LoginComponentComponent
              },
              {
                //auth/registrarse/
                path:'register',
                component: RegisterComponentComponent
              },
              {
                path: '**',
                redirectTo: 'login'
              }
        ]),
    ],
    exports : [ RouterModule ]
})
export class AuthRoutingModule{}
