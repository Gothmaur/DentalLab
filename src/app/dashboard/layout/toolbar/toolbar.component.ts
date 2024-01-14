import { Component, Input, NgZone, Pipe } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../pages/users/models/Users';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;

  public authUser$: Observable<User | null>;
  public authUserSubscription: Subscription | undefined;
  public nombreUsuario: string | undefined = "";

  constructor(private store: Store, private zone: NgZone){
    //this.authUser$ = this.AuthService.authUsers$
    this.authUser$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.authUserSubscription = this.authUser$.subscribe((user) => {
      // Actualizar el nombre del usuario en la vista cuando cambie la información del usuario autenticado
      // Asegúrate de tener un campo "nombre" en tu modelo User
      this.zone.run(() => {
        this.nombreUsuario = user?.nombre || 'Invitado';
      });
    });
  }

  ngOnDestroy(): void {
    if (this.authUserSubscription) {
      this.authUserSubscription.unsubscribe();
    }
  }
}
