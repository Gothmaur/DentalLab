import { Component } from '@angular/core';
import { User } from '../../models/Users';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { selectAuthId } from 'src/app/store/auth/auth.selector';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthActions } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  
  public user: User | undefined;
  public userId?: number | undefined;
  public perfil: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (this.router.url.includes('/dashboard/users')) {
        if (!Number(id)) {
          this.router.navigate(['dashboard', 'users']);
          this.notification.showError(`${id} no es un ID válido`);
        } else {
          if(id!=null){
            this.userId = +id;
            this.loadUser();
        }
        }
      }else {
        this.perfil = true;
        console.log("Pantalla perfil");
        this.store.select(selectAuthId).subscribe((id: number | undefined) => {
          this.userId = id;
        });
        console.log("id de usuario:" + this.userId); 
        this.loadUser();
      }
    });
    
  }

  constructor(
      private matDialog: MatDialog,
      private activatedRoute: ActivatedRoute, 
      private router:Router, 
      private notification: NotifyService, 
      private userService:UserService,
      private store:Store,
    ){}

  loadUser():void{
    if (this.userId) {//Si se detecta ID de usuario
      this.userService.getUsersById(this.userId).subscribe({ //Obtiene el usuario por id desde el servicio
        next: (data) => {
          this.user = data; //Guarda la data
        }
      });
    }
  }
  onEditProfile(): void {
    if (this.user) {
      this.matDialog.open(UserDialogComponent, {
        data: { ...this.user } // Pasar una copia del usuario para evitar modificar directamente this.user
      })
      .afterClosed().subscribe({
        next: (userUpdated) => {
          if (userUpdated) {
            // Actualizar el usuario en el servicio
            if(this.userId) {
              this.userService.updateUserById(this.userId, userUpdated);
            }
            else this.notification.showError(`Error al procesar el id: ${this.userId}`);
            this.store.dispatch(AuthActions.setAuthUser({payload : this.user || null}));
            window.location.reload();
          }
        }
      });
    }
  }

}
