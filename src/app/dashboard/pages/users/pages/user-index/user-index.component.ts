import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { User } from '../../models/Users';
import { UserService } from '../../services/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent {
  
  public users: Observable<User[]>;
  
  constructor(private matDialog: MatDialog, 
    private userServices:UserService){
      console.log(UserService);
      this.users = this.userServices.getUsers().pipe(
        //tap((valor) => console.log('Valor', valor)),
        map((valor) => valor.map((usuario) => (
          {
            ...usuario, 
            nombre: usuario.nombre,
            apellido1: usuario.apellido1, 
            apellido2: usuario.apellido2
          }))),
        //tap((valor) => console.log('Valor nuevo', valor)),
      );
      this.userServices.loadUsers();
      //this.notifyServices.showSuccess("Se cargó correctamente");
    }


//Crear usuario
  onCreateUser():void{
    //Abre form
    const dialogRef=this.matDialog.open(UserDialogComponent)
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
//Eliminar Usuario
  onDeleteUser(userToDelete:User):void{
    if(confirm(`¿Está seguro de eliminar este usuario?`)){
      this.userServices.deleteUserById(userToDelete.id);
    }
  }
//Editar Usuario
  onEditUser(userToEdit:User):void{
    console.log(userToEdit);
    this.matDialog.open(UserDialogComponent,{
      data: userToEdit
    })
    .afterClosed().subscribe({
      next: (userUpdated) => {
        if(userUpdated){
          this.userServices.updateUserById(userToEdit.id,userUpdated);
        }
      }
    })
  }
}
