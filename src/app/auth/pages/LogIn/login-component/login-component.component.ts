import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { RegisterComponentComponent } from '../../registro/register-component/register-component.component';
import { UserService } from 'src/app/dashboard/pages/users/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {

  public emailControl = new FormControl(
    "",[Validators.required, Validators.email]
  );
  public passControl = new FormControl(
    "",[Validators.required]
  );
  

  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passControl
  });

  constructor(private matDialog: MatDialog, 
    private authService: AuthService,
    private userServices: UserService){}

  login():void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      this.authService.login(this.loginForm.getRawValue());
    }
  }

  Registrarse():void{
    //Abre form
    const dialogRef=this.matDialog.open(RegisterComponentComponent)
    //Cuando cierre, haré esto
    .afterClosed().subscribe({
      next: (v) => {
        //Log para ver que retorna el form
        //console.log(v);
        if(v) {
          //console.log('recibí el valor ',v);
          this.userServices.createUser({
            nombre: v.nombre,
            apellido1: v.apellido1,
            apellido2: v.apellido2,
            telefono: v.telefono,
            direccion: v.direccion,
            email: v.email,
            clave: v.clave,
            tipo: v.tipo
          });
          //console.log('Aprobado');
        }
        else{ 
          //console.log('cancelado');
        }
      },
    });
  }
}
