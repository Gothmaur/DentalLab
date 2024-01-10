import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/Users';




@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {

  editingUser?: User;
  
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



constructor(private dialogRef: MatDialogRef<UserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data?:User,
  ){
    if(this.data){
      this.editingUser = data;
      this.NombreControl.setValue(this.data.nombre);
      this.PrimerApellidoControl.setValue(this.data.apellido1);
      this.SegundoApellidoControl.setValue(this.data.apellido2);
      this.TelefonoControl.setValue(this.data.telefono);
      this.DireccionControl.setValue(this.data.direccion);
      this.EmailControl.setValue(this.data.email);
      this.ClaveControl.setValue(this.data.clave);
      this.TipoControl.setValue(this.data.tipo);
    }
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
