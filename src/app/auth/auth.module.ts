import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponentComponent } from './pages/registro/register-component/register-component.component';
import { LoginComponentComponent } from './pages/LogIn/login-component/login-component.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';




@NgModule({
  declarations: [
    RegisterComponentComponent,
    LoginComponentComponent,
    AuthComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
