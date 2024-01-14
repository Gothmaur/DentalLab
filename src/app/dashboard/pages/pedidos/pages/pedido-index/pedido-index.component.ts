import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pedidos } from '../../Models/pedidos';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../Services/pedidos-service.service';
import { PedidoDialogComponent } from '../../components/pedido-dialog/pedido-dialog.component';

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.scss']
})
export class PedidoIndexComponent {
  public pedidos: Observable<Pedidos[]>; 
  
  constructor(private matDialog: MatDialog, 
    private pedidoServices:PedidoService,
    //private notifyServices:NotifyService
    ){
      this.pedidos = this.pedidoServices.getPedidos().pipe(
        //tap((valor) => console.log('Valor', valor)),
        map((valor) => valor.map((pedido) => (
          {
            ...pedido, 
            dr_solicitante: pedido.dr_solicitante,
            paciente_tratamiento: pedido.paciente_tratamiento, 
            precio_total: pedido.precio_total,
            abono: pedido.abono,
            fecha_entrega: pedido.fecha_entrega
          }))),
        //tap((valor) => console.log('Valor nuevo', valor)),
      );
      this.pedidoServices.loadPedidos();
      //this.notifyServices.showSuccess("Se cargó correctamente");
    }

    

//Crear Pedido 
  onCreatePedido():void{
    //Abre form
    const dialogRef=this.matDialog.open(PedidoDialogComponent)
    //Cuando cierre, haré esto
    .afterClosed().subscribe({
      next: (v) => {
        //Log para ver que retorna el form
        //console.log(v);
        if(v) {
          //console.log('recibí el valor ',v);
          this.pedidoServices.createPedido({
            dr_solicitante: v.dr_solicitante,
            paciente_tratamiento: v.paciente_tratamiento,
            fecha_recepcion: v.fecha_recepcion,
            fecha_entrega: v.fecha_entrega,
            tipo_protesis: v.tipo_protesis,
            tipo_prueba: v.tipo_prueba,
            color_incisal_oclusal: v.color_incisal_oclusal,
            color_medio: v.color_medio,
            color_Cervical: v.color_Cervical,
            modelo: v.modelo,
            impresion: v.impresion,
            antagonista: v.antagonista,
            mordida: v.mordida,
            colorimetro: v.colorimetro,
            cucharillas: v.cucharillas,
            precio_total: v.precio_total,
            abono: v.abono,
            observaciones: v.observaciones,
          });
          //console.log('Aprobado');
        }
        else{ 
          //console.log('cancelado');
        }
      },
    });
  }
//Eliminar Pedido 
  onDeletePedido(pedidoToDelete:Pedidos):void{
    if(confirm(`¿Está seguro de eliminar el pedido?`)){
      this.pedidoServices.deletePedidoById(pedidoToDelete.id);
    }
  }
//Editar Pedido  
  onEditPedido(pedidoToEdit:Pedidos):void{
    this.matDialog.open(PedidoDialogComponent,{
      data: pedidoToEdit
    })
    .afterClosed().subscribe({
      next: (pedidoUpdated) => {
        if(pedidoUpdated){
          this.pedidoServices.updatePedidoById(pedidoToEdit.id,pedidoUpdated);
        }
      }
    })
  }
}
