import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { ProductCreation, ProductUpdating, Products } from '../Models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productos$ = new BehaviorSubject<Products[]>([]);
  
  constructor(private notify: NotifyService,private httpClient:HttpClient) { }
  
  
  //cargar productos
  loadProducts(): void{
    this.httpClient.get<Products[]>('http://localhost:3000/products').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        console.log(response);
        this.productos$.next(response);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    })
  }

  //Obtener productos
  getProducts(): Observable<Products[]>{
    return this.productos$.asObservable();
  }
 
  //Obtener productos por ID
  getProductsById(id: Number):Observable < Products | undefined >{
    return this.productos$.pipe(
      map( ( products ) => products.find( ( u ) => u.id === id) ),
      take(1)
    );
  }

  //Crear producto en la vista
  createProduct(producto:ProductCreation): void{
    this.httpClient.post<Products>('http://localhost:3000/products',producto).pipe( //
      mergeMap((productoNuevo) => this.productos$.pipe(
        take(1),
        map((arrayActual)=>[...arrayActual, productoNuevo])
      ))
    ).subscribe({
      next: (arrayActualizado) => {
        this.productos$.next(arrayActualizado);
      },
      error: () => this.notify.showError("Error al conectar con el servidor")
    })
  }
  
  //Actualizar producto
  updateProductById(id: number, producto:ProductUpdating): void{
    this.httpClient.put('http://localhost:3000/products/'+id, producto).subscribe({
      next: () => this.loadProducts(),
      error: () => this.notify.showError("Error al conectar con el servidor")

    })
  }

  //Eliminar producto
  deleteProductById(id: number): void{
    this.httpClient.delete<Products>('http://localhost:3000/products/'+id) //Eliminar producto de la lista
    .pipe( mergeMap( (/* NecesitoVariable? */) => this.productos$.pipe(
      take(1),
      map( (arrayActual) => arrayActual.filter( (u) => u.id !== id) )//Filtrar lista sin el producto eliminado
      ))).subscribe({
        next: (arrayActualizado) => this.productos$.next(arrayActualizado), // Mostrar lista nueva
      })
      this.notify.showSuccess("Producto eliminado");
  }
}