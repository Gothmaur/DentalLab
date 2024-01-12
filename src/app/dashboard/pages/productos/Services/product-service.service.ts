import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpClient } from '@angular/common/http';
import { ProductCreation, ProductUpdating, Products, TipoProducto } from '../Models/productos';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productos$ = new BehaviorSubject<Products[]>([]);
  private tp$ =new BehaviorSubject<TipoProducto[]>([]);
  
  constructor(private notify: NotifyService,private httpClient:HttpClient) { }
  
  
  //cargar productos
  loadProducts(): void{
    this.httpClient.get<Products[]>(environment.springApiURL + '/products').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        const productosConTipo: Products[] = response.map((producto) => ({
          ...producto,
          tipo: {
            id: producto.tipo.id,
            nombre: producto.tipo.nombre,
            desc: producto.tipo.desc,
          },
        }));
        this.productos$.next(productosConTipo);
      },
      error: () =>{
        //Si hay algún error, mostrar "Error al conectar".
        this.notify.showError("Error al conectar con el servidor") 
      }
    });
  }

  //cargar Tipo de productos
  loadTP(): void{
    this.httpClient.get<TipoProducto[]>(environment.springApiURL + '/tp').subscribe({//Se consultan los datos de la DB usando http
      next:(response)=> {
        this.tp$.next(response);
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

  //Obtener TipoProducto
  getTP(): Observable<TipoProducto[]>{
    return this.tp$.asObservable();
  }

  //Obtener TipoProducto por ID
  getTPById(id: Number):Observable < TipoProducto | undefined >{
    return this.tp$.pipe(
      map( ( tps ) => tps.find( ( tp ) => tp.id === id) ),
      take(1)
    );
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
    console.log(producto);
    this.httpClient.post<Products>(environment.springApiURL + '/products',producto).pipe( //
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
    this.httpClient.put(environment.springApiURL + '/products/'+id, producto).subscribe({
      next: () =>{ 
        this.loadProducts()
      },
      error: () => this.notify.showError("Error al conectar con el servidor")

    })
  }

  //Eliminar producto
  deleteProductById(id: number): void{
    this.httpClient.delete<Products>(environment.springApiURL + '/products/'+id) //Eliminar producto de la lista
    .pipe( mergeMap( (/* NecesitoVariable? */) => this.productos$.pipe(
      take(1),
      map( (arrayActual) => arrayActual.filter( (u) => u.id !== id) )//Filtrar lista sin el producto eliminado
      ))).subscribe({
        next: (arrayActualizado) => this.productos$.next(arrayActualizado), // Mostrar lista nueva
      })
      this.notify.showSuccess("Producto eliminado");
  }
}