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
    return this.httpClient.get<User[]>(environment.baseApiURL + '/users',{
      params:{
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) =>{
        if(usersResult.length){
          const authUser = usersResult[0];
          this.store.dispatch(AuthActions.setAuthUser({payload:authUser}));
        }

        return !!usersResult.length;
      })
    )
  }

  login(payload:LoginPayload):void{
    
    this.httpClient.get<User[]>(environment.baseApiURL + '/users',{
      params:{
        email: payload.email || '',
        clave: payload.password || ''
      }
    }).subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        if(response.length){
          const authUser = response[0];
          //Respuesta en obserbable
          //this._authUsers$.next(response[0]);
          //Respuesta en store
          this.store.dispatch(AuthActions.setAuthUser({payload : authUser}));
          localStorage.setItem('token',authUser.token);
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
