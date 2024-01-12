import { Component } from '@angular/core';
import { Products } from '../../Models/productos';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ProductService } from '../../Services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  public producto: Products | undefined;
  public productoId?: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!Number(id)) {
        this.router.navigate(['dashboard', 'products']);
        this.notification.showError(`${id} no es un ID válido`);
      } else {
        if(id!=null){
          this.productoId = +id;
          this.loadProduct();
      }
      }
    });
  }

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private notification: NotifyService, private productService:ProductService){
    console.log("Intento imprimir el usuario");
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard','users']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID válido`);
    }else{
      this.productoId = +this.activatedRoute.snapshot.params['id'];
      this.productService.loadProducts();
      this.loadProduct();
    }
  }

  loadProduct():void{
    if(this.productoId){
      this.productService.getProductsById(this.productoId).subscribe({
        next:(data) => 
          this.producto = data
      });
    }
  }
}
