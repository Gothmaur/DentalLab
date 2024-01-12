import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../Models';
import { User } from 'src/app/dashboard/pages/users/models/Users';
import { environment } from 'src/environment/environment';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _authUsers$ = new BehaviorSubject<User | null>(null);
  //public authUsers$ = this._authUsers$.asObservable();
  

  constructor(private notify:NotifyService, private router:Router, private httpClient:HttpClient,private store: Store) { }

  isAuthenticated(): Observable<boolean>{
    //return this.authUsers$.pipe(take(1),map( (user)=> !!user ));
    //Usando JSON-server : environment.baseApiURL + '/users'
    //Usando el servicio spring : : environment.springApiURL + '/authenticated'
    return this.httpClient.get<User>(environment.springApiURL + '/authenticated',{
      params:{
        //Con Json-server
        token: localStorage.getItem('token') || '',
        //Con spring
        //tbl_usuarios_token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) =>{
        if(usersResult){
          const authUser = usersResult;
          this.store.dispatch(AuthActions.setAuthUser({payload:authUser}));
        }
        return !!usersResult;
      })
    )
  }

  login(payload:LoginPayload):void{
    //Usando JSON-server : environment.baseApiURL+ '/users'
    //Usando el servicio spring : : environment.springApiURL + '/login'
    this.httpClient.post<User>(environment.springApiURL + '/login',{
        email: payload.email || '',
        clave: payload.password || ''
    }).subscribe({//Se consultan los datos de la DB usando http
      next:(authUser)=> {
        if(authUser){
          console.log(authUser);
          //Respuesta en obserbable
          //this._authUsers$.next(response[0]);
          //Respuesta en store
          this.store.dispatch(AuthActions.setAuthUser({payload : authUser}));
          console.log("Asigno token "+ authUser.token);
          this.router.navigate(['/dashboard/home']);
        }else{
          this.notify.showError('E-mail o contraseña no validos');
          this.store.dispatch(AuthActions.setAuthUser({payload : null}));
          //this._authUsers$.next(null);
        }
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor"),
        this.store.dispatch(AuthActions.setAuthUser({payload : null}));
      }
    })
  
  }
  

  logOut():void{
    this.store.dispatch(AuthActions.setAuthUser({payload : null}));
    localStorage.removeItem('token');
    //console.log(localStorage.getItem('token'));
  }
}
