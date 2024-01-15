import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAuthRole } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent {
  rol:string | undefined;
  
  //Validaciones requeridas para cada uno de los campos 
  NombreControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  PrimerApellidoControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  SegundoApellidoControl = new FormControl<string | null>(null,[
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  TelefonoControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  DireccionControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  EmailControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.email //Debe cumplir con las características de un e-mail
  ]);
  ClaveControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
  ]);
  TipoControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
  ]);


  usersForm = new FormGroup({
    nombre: this.NombreControl,
    apellido1: this.PrimerApellidoControl,
    apellido2: this.SegundoApellidoControl,
    telefono: this.TelefonoControl,
    direccion: this.DireccionControl,
    email: this.EmailControl,
    clave: this.ClaveControl,
    tipo: this.TipoControl
  });


constructor(private dialogRef: MatDialogRef<RegisterComponentComponent>,private store:Store,
  ){
    store.select(selectAuthRole).subscribe((userRole) => this.rol = userRole);
    this.TipoControl.setValue("Cliente");
  }


  onSubmint():void{
    if(this.usersForm.invalid){
      alert("Por favor llene todos los campos correctamente");
    }else{
      //alert(JSON.stringify(this.usersForm.value));
      this.dialogRef.close(this.usersForm.value);
    }
  }
}
