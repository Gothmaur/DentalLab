import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../../Models/productos';

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
  TipoControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  ProfesorControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  PrecioControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
  ]);


  productsForm = new FormGroup({
    nombre: this.NombreControl,
    descripcion: this.DescripcionControl,
    tipo: this.TipoControl,
    profesor: this.ProfesorControl,
    precio: this.PrecioControl
  });



constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data?:Products,
  ){
    if(this.data){
      this.editingProduct = data;
      this.NombreControl.setValue(this.data.nombre);
      this.DescripcionControl.setValue(this.data.descripcion);
      this.TipoControl.setValue(this.data.tipo);
      this.ProfesorControl.setValue(this.data.profesor);
      this.PrecioControl.setValue(this.data.precio.toString());
    }
  }


  onSubmint():void{
    if(this.productsForm.invalid){
      alert("Por favor llene todos los campos correctamente");
    }else{
      alert(JSON.stringify(this.productsForm.value));
      this.dialogRef.close(this.productsForm.value);
    }
  }
}
