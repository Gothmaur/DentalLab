import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { PedidoCreation, PedidoUpdating, Pedidos } from '../Models/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidos$ = new BehaviorSubject<Pedidos[]>([]);
  
  constructor(private notify: NotifyService,private httpClient:HttpClient) { }
  
  
  //cargar pedidos
  loadPedidos(): void{
    this.httpClient.get<Pedidos[]>('http://localhost:3000/pedidos').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        console.log(response);
        this.pedidos$.next(response);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    })
  }

  //Obtener pedidos
  getPedidosByDr(drSolicitante:string | undefined): Observable<Pedidos[]>{
    return this.pedidos$.pipe(
      map((pedidos: Pedidos[]) => {
        if (!drSolicitante) {
          // Si el parámetro es undefined, retornar todos los pedidos
          return pedidos;
        }
        // Filtrar por el parámetro drSolicitante
        return pedidos.filter(pedido => pedido.dr_solicitante === drSolicitante);
      })
    );
  }
 
  //Obtener pedidos
  getPedidos(): Observable<Pedidos[]>{
    return this.pedidos$.asObservable();
  }

  //Obtener pedidos por ID
  getPedidosById(id: Number):Observable < Pedidos | undefined >{
    return this.pedidos$.pipe(
      map( ( pedidos ) => pedidos.find( ( u ) => u.id === id) ),
      take(1)
    );
  }

  //Crear pedido en la vista
  createPedido(pedido:PedidoCreation): void{
    this.httpClient.post<Pedidos>('http://localhost:3000/pedidos',pedido).pipe( //
      mergeMap((pedidoNuevo) => this.pedidos$.pipe(
        take(1),
        map((arrayActual)=>[...arrayActual, pedidoNuevo])
      ))
    ).subscribe({
      next: (arrayActualizado) => {
        this.pedidos$.next(arrayActualizado);
      },
      error: () => this.notify.showError("Error al conectar con el servidor")
    })
  }
  
  //Actualizar pedido
  updatePedidoById(id: number, pedido:PedidoUpdating): void{
    this.httpClient.put('http://localhost:3000/pedidos/'+id, pedido).subscribe({
      next: () => this.loadPedidos(),
      error: () => this.notify.showError("Error al conectar con el servidor")

    })
  }

  //Eliminar pedido
  deletePedidoById(id: number): void{
    this.httpClient.delete<Pedidos>('http://localhost:3000/pedidos/'+id) //Eliminar pedido de la lista
    .pipe( mergeMap( (/* NecesitoVariable? */) => this.pedidos$.pipe(
      take(1),
      map( (arrayActual) => arrayActual.filter( (u) => u.id !== id) )//Filtrar lista sin el pedido eliminado
      ))).subscribe({
        next: (arrayActualizado) => this.pedidos$.next(arrayActualizado), // Mostrar lista nueva
      })
      this.notify.showSuccess("Pedido eliminado");
  }
}