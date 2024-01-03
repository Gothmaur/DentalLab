import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
//import { NotifyService } from 'src/app/core/services/notify.service';
import { Inventarios } from './Models/inventarios';
import { InventarioDialogComponent } from './components/inventario-dialog/Inventarios-dialog.component';
import { InventarioService } from './Services/inventario-service.service';
@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss']
})
export class InventariosComponent{


  public inventarios: Observable<Inventarios[]>; 
  
  constructor(private matDialog: MatDialog, 
    private inventarioServices:InventarioService,
    //private notifyServices:NotifyService
    ){
      this.inventarios = this.inventarioServices.getInventarios().pipe(
        //tap((valor) => console.log('Valor', valor)),
        map((valor) => valor.map((inventario) => (
          {
            ...inventario, 
            material: inventario.material,
            unidad_medida: inventario.unidad_medida, 
            cantidad_disponible: inventario.cantidad_disponible,
            fecha_caducidad: inventario.fecha_caducidad
          }))),
        //tap((valor) => console.log('Valor nuevo', valor)),
      );
      this.inventarioServices.loadInventarios();
      //this.notifyServices.showSuccess("Se cargó correctamente");
    }

    

//Crear Inventario 
  onCreateInventario():void{
    //Abre form
    const dialogRef=this.matDialog.open(InventarioDialogComponent)
    //Cuando cierre, haré esto
    .afterClosed().subscribe({
      next: (v) => {
        //Log para ver que retorna el form
        //console.log(v);
        if(v) {
          //console.log('recibí el valor ',v);
          this.inventarioServices.createInventario({
            material: v.material,
            fecha_ingreso: v.fecha_ingreso,
            fecha_caducidad: v.fecha_caducidad,
            proveedor: v.proveedor,
            descripcion: v.descripcion,
            unidad_medida: v.unidad_medida,
            precio: v.precio,
            cantidad_disponible: v.cantidad_disponible
          });
          //console.log('Aprobado');
        }
        else{ 
          //console.log('cancelado');
        }
      },
    });
  }
//Eliminar Inventario 
  onDeleteInventario(inventarioToDelete:Inventarios):void{
    if(confirm(`¿Está seguro de eliminar el inventario? {{userToDelete.nombre}}`)){
      this.inventarioServices.deleteInventarioById(inventarioToDelete.id);
    }
  }
//Editar Inventario  
  onEditInventario(inventarioToEdit:Inventarios):void{
    this.matDialog.open(InventarioDialogComponent,{
      data: inventarioToEdit
    })
    .afterClosed().subscribe({
      next: (inventarioUpdated) => {
        if(inventarioUpdated){
          this.inventarioServices.updateInventarioById(inventarioToEdit.id,inventarioUpdated);
        }
      }
    })
  }
}