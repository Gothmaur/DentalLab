import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventarios } from '../../Models/inventarios';

@Component({
  selector: 'app-inventarios-dialog',
  templateUrl: './inventarios-dialog.component.html',
  styleUrls: ['./inventarios-dialog.component.scss']
})
export class InventarioDialogComponent {
  editingInventario?: Inventarios;
  
  //Validaciones requeridas para cada uno de los campos 
  MaterialControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  FechaIngresoControl = new FormControl<Date | null>(null,[
    Validators.required, //Requerido
  ]);
  FechaCaducidadControl = new FormControl<Date | null>(null,[
    Validators.required, //Requerido
  ]);
  ProveedorControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
  ]);
  DescripcionControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.minLength(2) //Tamaño minimo de 2 caracteres
  ]);
  UnidadMedidaControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
  ]);
  CantidadControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.min(0) //Tamaño minimo de 2 caracteres
  ]);
  PrecioControl = new FormControl<string | null>(null,[
    Validators.required, //Requerido
    Validators.min(0),
  ]);


  inventariosForm = new FormGroup({
    material: this.MaterialControl,
    fecha_ingreso: this.FechaIngresoControl,
    fecha_caducidad: this.FechaCaducidadControl,
    proveedor: this.ProveedorControl,
    descripcion: this.DescripcionControl,
    unidad_medida: this.UnidadMedidaControl,
    precio: this.PrecioControl,
    cantidad_disponible: this.CantidadControl
  });


  proveedores: string[] = ['Dentilab', 'Deposito Dental: Madero', 'Deposito Dental: La Raza']; // Obtendrías estos datos de tu servicio

constructor(private dialogRef: MatDialogRef<InventarioDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data?:Inventarios,
  ){
    if(this.data){
      this.editingInventario = data;
      this.MaterialControl.setValue(this.data.material);
      this.FechaIngresoControl.setValue(this.data.fecha_ingreso);
      this.FechaCaducidadControl.setValue(this.data.fecha_caducidad);
      this.ProveedorControl.setValue(this.data.proveedor);
      this.DescripcionControl.setValue(this.data.descripcion);
      this.UnidadMedidaControl.setValue(this.data.unidad_medida);
      this.CantidadControl.setValue(this.data.cantidad_disponible.toString());
      this.PrecioControl.setValue(this.data.precio.toString());
    }
  }


  onSubmint():void{
    if(this.inventariosForm.invalid){
      alert("Por favor llene todos los campos correctamente");
    }else{
      //alert(JSON.stringify(this.inventariosForm.value));
      this.dialogRef.close(this.inventariosForm.value);
    }
  }
  
}

