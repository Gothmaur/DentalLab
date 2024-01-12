import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products, TipoProducto } from '../../Models/productos';
import { ProductService } from '../../Services/product-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  editingProduct?: Products;
  
  //Validaciones requeridas para cada uno de los campos 
  NombreControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  DescripcionControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  TipoControl = new FormControl<TipoProducto | null>(null,[
    Validators.required, //Requerido
  ]);
  PrecioControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.min(0), //Valor minimo
    
  ]);
  CotizarControl = new FormControl(false);


  productsForm = new FormGroup({
    nombre: this.NombreControl,
    descripcion: this.DescripcionControl,
    tipo: this.TipoControl,
    precio: this.PrecioControl,
    cotizar: this.CotizarControl
  });

TP!:TipoProducto[];

constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
  private productService:ProductService,
  @Inject(MAT_DIALOG_DATA) private data?:Products,
  ){
    console.log(data);
    this.productService.loadTP();
    this.productService.getTP().subscribe((tipoProductos) => {
      this.TP = tipoProductos.map((tp) => ({
        ...tp,
        nombre: tp.nombre,
        descripcion: tp.desc
      }));
    });
    this.productService.loadTP();
    if(this.data){
      this.editingProduct = data;
      this.NombreControl.setValue(this.data.nombre);
      this.DescripcionControl.setValue(this.data.descripcion);
      this.TipoControl.setValue(this.data.tipo);
      this.PrecioControl.setValue(this.data.precio.toString());
      this.CotizarControl.setValue(this.data.cotizar);
      if(this.CotizarControl.getRawValue()) this.PrecioControl.disable();
    }
    
  }


  onSubmint():void{
    if(this.productsForm.invalid){
      alert("Por favor llene todos los campos correctamente");
    }else{
      this.PrecioControl.enable();
      //alert(JSON.stringify(this.productsForm.value));
      this.dialogRef.close(this.productsForm.value);
    }
  }

  onCotizarChange(): void {
    if (this.CotizarControl.value) {
      // Checkbox marcado: establecer el valor del campo de precio a 0 y deshabilitar
      this.PrecioControl.setValue('0');
      this.PrecioControl.disable();
    } else {
      // Checkbox no marcado: habilitar el campo de precio
      this.PrecioControl.enable();
    }
  }
  
}

