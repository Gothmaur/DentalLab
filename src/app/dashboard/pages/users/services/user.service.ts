import { Injectable } from '@angular/core';
import { User, UserCreation, UserUpdating } from '../models/Users';
import { BehaviorSubject, Observable, Subject, catchError, delay, filter, map, mergeMap, of, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from 'src/app/Shared/Utils/helpers';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios$ = new BehaviorSubject<User[]>([]);
  
  constructor(private notify: NotifyService,private httpClient:HttpClient) { }
  
  
  //cargar usuarios
  loadUsers(): void{
    //Usando JSON-server : environment.baseApiURL/users
    //Usando el servicio spring : : environment.springApiURL
    this.httpClient.get<User[]>(environment.springApiURL + '/users').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        this.usuarios$.next(response);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    })
  }

  //Obtener usuarios
  getUsers(): Observable<User[]>{
    return this.usuarios$.asObservable();
  }
 
  //Obtener usuarios por ID
  getUsersById(id: Number):Observable < User | undefined >{
    return this.httpClient.get<User>(environment.springApiURL + '/users/id/' + id)
    .pipe(
      catchError(() => {
        // Manejar el error aquí si es necesario
        console.error("Error al conectar con el servidor");
        return of(undefined); // Devolver un observable vacío o con un valor por defecto
      }),
      map(user => user) // No es necesario utilizar find si la respuesta es un objeto User
    );
  }

  getUsersByType(tipo: string): Observable<User[]> {
    this.httpClient.get<User[]>(environment.springApiURL + '/users/tipo/'+tipo).subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        this.usuarios$.next(response);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    })
    return this.usuarios$.asObservable();
  }

  //Crear usuario en la vista
  createUser(usuario:UserCreation): void{
    const token = generateRandomString(20); 
    //Usando JSON-server : environment.baseApiURL/users
    //Usando el servicio spring : : environment.springApiURL
    this.httpClient.post<User>(environment.springApiURL + '/users',{...usuario, token }).pipe( //
      mergeMap((usuarioNuevo) => this.usuarios$.pipe(
        take(1),
        map((arrayActual)=>[...arrayActual, usuarioNuevo])
      ))
    ).subscribe({
      next: (arrayActualizado) => {
        this.usuarios$.next(arrayActualizado);
        this.notify.showSuccess("Registro exitoso");
      },
      error: () => this.notify.showError("Error al conectar con el servidor")
    })
  }
  
  //Actualizar usuario
  updateUserById(id: number, usuario:UserUpdating): void{
    // Obtener el usuario original con el token
    this.getUsersById(id).pipe(take(1)).subscribe(originalUser => {
    // Fusionar las propiedades actualizadas y mantener el token
    const usuarioActualizado = { ...originalUser, ...usuario };

    //Usando JSON-server : environment.baseApiURL/users
    //Usando el servicio spring : : environment.springApiURL
    this.httpClient.put(environment.springApiURL + '/users/'+id, usuarioActualizado).subscribe({
      next: () => {
        this.loadUsers();
        this.notify.showSuccess("Actualización exitosa");
      },
      error: () => this.notify.showError("Error al conectar con el servidor")
     });
    })
  }

  //Eliminar Usuario
  deleteUserById(id: number): void{
    //Usando JSON-server : environment.baseApiURL/users
    //Usando el servicio spring : : environment.springApiURL
    this.httpClient.delete<User>(environment.springApiURL + '/users/'+id) //Eliminar usuario de la lista
    .pipe( mergeMap( (/* NecesitoVariable? */) => this.usuarios$.pipe(
      take(1),
      map( (arrayActual) => arrayActual.filter( (u) => u.id !== id) )//Filtrar lista sin el usuario eliminado
      ))).subscribe({
        next: (arrayActualizado) => this.usuarios$.next(arrayActualizado), // Mostrar lista nueva
      })
      this.notify.showSuccess("Usuario eliminado");
  }
}