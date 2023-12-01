import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
//import { NotifyService } from 'src/app/core/services/notify.service';
import { Products } from './Models/productos';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductService } from './Services/product-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {


  public products: Observable<Products[]>; 
  
  constructor(private matDialog: MatDialog, 
    private productServices:ProductService,
    //private notifyServices:NotifyService
    ){
      this.products = this.productServices.getProducts().pipe(
        //tap((valor) => console.log('Valor', valor)),
        map((valor) => valor.map((producto) => (
          {
            ...producto, 
            nombre: producto.nombre,
            descripcion: producto.descripcion, 
            tipo: producto.tipo
          }))),
        //tap((valor) => console.log('Valor nuevo', valor)),
      );
      this.productServices.loadProducts();
      //this.notifyServices.showSuccess("Se cargó correctamente");
    }

    

//Crear Producto 
  onCreateProduct():void{
    //Abre form
    const dialogRef=this.matDialog.open(ProductDialogComponent)
    //Cuando cierre, haré esto
    .afterClosed().subscribe({
      next: (v) => {
        //Log para ver que retorna el form
        //console.log(v);
        if(v) {
          //console.log('recibí el valor ',v);
          this.productServices.createProduct({
            nombre: v.nombre,
            descripcion: v.descripcion,
            tipo: v.tipo,
            precio: v.precio,
            cotizar:v.cotizar
          });
          //console.log('Aprobado');
        }
        else{ 
          //console.log('cancelado');
        }
      },
    });
  }
//Eliminar Producto 
  onDeleteProduct(productToDelete:Products):void{
    if(confirm(`¿Está seguro de eliminar el producto? {{userToDelete.nombre}}`)){
      this.productServices.deleteProductById(productToDelete.id);
    }
  }
//Editar Producto  
  onEditProduct(productToEdit:Products):void{
    this.matDialog.open(ProductDialogComponent,{
      data: productToEdit
    })
    .afterClosed().subscribe({
      next: (productUpdated) => {
        if(productUpdated){
          this.productServices.updateProductById(productToEdit.id,productUpdated);
        }
      }
    })
  }
}
