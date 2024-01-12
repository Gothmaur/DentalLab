import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { InventarioCreation, InventarioUpdating, Inventarios } from '../Models/inventarios';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private inventarios$ = new BehaviorSubject<Inventarios[]>([]);
  
  constructor(private notify: NotifyService,private httpClient:HttpClient) { }
  
  
  //cargar inventarios
  loadInventarios(): void{
    this.httpClient.get<Inventarios[]>(environment.springApiURL + '/inventarios').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        console.log(response);
        this.inventarios$.next(response);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    })
  }

  //Obtener inventarios
  getInventarios(): Observable<Inventarios[]>{
    return this.inventarios$.asObservable();
  }
 
  //Obtener inventarios por ID
  getInventariosById(id: Number):Observable < Inventarios | undefined >{
    return this.inventarios$.pipe(
      map( ( inventarios ) => inventarios.find( ( u ) => u.id === id) ),
      take(1)
    );
  }

  //Crear inventario en la vista
  createInventario(inventario:InventarioCreation): void{
    this.httpClient.post<Inventarios>(environment.springApiURL + '/inventarios',inventario).pipe( //
      mergeMap((inventarioNuevo) => this.inventarios$.pipe(
        take(1),
        map((arrayActual)=>[...arrayActual, inventarioNuevo])
      ))
    ).subscribe({
      next: (arrayActualizado) => {
        this.inventarios$.next(arrayActualizado);
      },
      error: () => this.notify.showError("Error al conectar con el servidor")
    })
  }
  
  //Actualizar inventario
  updateInventarioById(id: number, inventario:InventarioUpdating): void{
    this.httpClient.put(environment.springApiURL + '/inventarios/'+id, inventario).subscribe({
      next: () => this.loadInventarios(),
      error: () => this.notify.showError("Error al conectar con el servidor")

    })
  }

  //Eliminar inventario
  deleteInventarioById(id: number): void{
    this.httpClient.delete<Inventarios>(environment.springApiURL + '/inventarios/'+id) //Eliminar inventario de la lista
    .pipe( mergeMap( (/* NecesitoVariable? */) => this.inventarios$.pipe(
      take(1),
      map( (arrayActual) => arrayActual.filter( (u) => u.id !== id) )//Filtrar lista sin el inventario eliminado
      ))).subscribe({
        next: (arrayActualizado) => this.inventarios$.next(arrayActualizado), // Mostrar lista nueva
      })
      this.notify.showSuccess("Inventario eliminado");
  }
}