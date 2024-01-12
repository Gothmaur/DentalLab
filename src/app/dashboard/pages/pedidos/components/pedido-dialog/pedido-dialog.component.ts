import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedidos } from '../../Models/pedidos';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/Users';
import { filter } from 'rxjs';

@Component({
  selector: 'app-pedido-dialog',
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.scss']
})
export class PedidoDialogComponent {
  editingPedido?: Pedidos;
  
  //Validaciones requeridas para cada uno de los campos 
    DrSolicitanteControl = new FormControl<string | null>(null,[
      Validators.required, //Requerido
    ]);
    PacienteTratamientoControl = new FormControl<string | null>(null,[
      Validators.required, //Requerido
    ]);
    FechaRecepcionControl = new FormControl<Date | null>(null,[
      Validators.required, //Requerido
    ]);
    FechaEntregaControl = new FormControl<Date | null>(null,[
      Validators.required, //Requerido
    ]);
    TipoProtesisControl = new FormControl<string | null>(null,[
      Validators.required, //Requerido
    ]);
    TipoPruebaControl = new FormControl<string | null>(null,[
      Validators.required, //Requerido
    ]);
    ColorIncisalOclusalControl = new FormControl<string | null>(null,[]);
    ColorMedioControl = new FormControl<string | null>(null,[]);
    ColorCervicalControl = new FormControl<string | null>(null,[]);
    ModeloControl= new FormControl(false);
    ImpresionControl= new FormControl(false);
    AntagonistaControl= new FormControl(false);
    MordidaControl= new FormControl(false);
    ColorimetroControl= new FormControl(false);
    CucharillasControl= new FormControl(false);
    PrecioTotalControl= new FormControl<string | null>(null,[
      Validators.required, //Requerido
      Validators.min(0), //Valor minimo 0
    ]);
    AbonoControl = new FormControl<string | null>(null,[
      Validators.required, //Requerido
      Validators.min(0), //Valor minimo 0
    ]);
    ObservacionesControl = new FormControl<string | null>(null,[
    ]);

  pedidosForm = new FormGroup({
    dr_solicitante:this.DrSolicitanteControl,
    paciente_tratamiento: this.PacienteTratamientoControl,
    fecha_recepcion: this.FechaRecepcionControl,
    fecha_entrega: this.FechaEntregaControl,
    tipo_protesis: this.TipoProtesisControl,
    tipo_prueba: this.TipoPruebaControl,
    color_incisal_oclusal: this.ColorIncisalOclusalControl,
    color_medio: this.ColorMedioControl,
    color_Cervical: this.ColorCervicalControl,
    modelo: this.ModeloControl,
    impresion: this.ImpresionControl,
    antagonista: this.AntagonistaControl,
    mordida: this.MordidaControl,
    colorimetro: this.ColorimetroControl,
    cucharillas: this.CucharillasControl,
    precio_total: this.PrecioTotalControl,
    abono: this.AbonoControl,
    observaciones: this.ObservacionesControl
  });

  doctores!: User[] | undefined; // Obtendrías estos datos de tu servici
  doctoresF: User[] | undefined = []; // Obtendrías estos datos de tu servicio
  colores: string[] = ['','A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4','D1','D2','D3','D4'];

constructor(private dialogRef: MatDialogRef<PedidoDialogComponent>,
  userService:UserService,
  @Inject(MAT_DIALOG_DATA) private data?:Pedidos,
  ){
    userService.loadUsers();
    userService.getUsersByType("Cliente").subscribe({
      next: (response) => {this.doctores = response;
      }
    });
    console.log(this.doctores);
    //this.doctores = this.doctores?.filter((user: User) => user.tipo === 'Cliente') ?? [];
    console.log(this.doctoresF);
    if(this.data){
      this.editingPedido = data;

      this.DrSolicitanteControl.setValue(this.data.dr_solicitante);
      this.PacienteTratamientoControl.setValue(this.data.paciente_tratamiento);
      this.FechaRecepcionControl.setValue(this.data.fecha_recepcion);
      this.FechaEntregaControl.setValue(this.data.fecha_entrega);
      this.TipoProtesisControl.setValue(this.data.tipo_protesis);
      this.TipoPruebaControl.setValue(this.data.tipo_prueba);
      this.ColorIncisalOclusalControl.setValue(this.data.color_incisal_oclusal);
      this.ColorMedioControl.setValue(this.data.color_medio);
      this.ColorCervicalControl.setValue(this.data.color_Cervical);
      this.ModeloControl.setValue(this.data.modelo);
      this.ImpresionControl.setValue(this.data.impresion);
      this.AntagonistaControl.setValue(this.data.antagonista);
      this.MordidaControl.setValue(this.data.mordida);
      this.ColorimetroControl.setValue(this.data.colorimetro);
      this.CucharillasControl.setValue(this.data.cucharillas);
      this.PrecioTotalControl.setValue(this.data.precio_total.toString());
      this.AbonoControl.setValue(this.data.abono.toString());
      this.ObservacionesControl.setValue(this.data.observaciones);


      if (!this.ColorimetroControl.getRawValue()) {
        this.ColorIncisalOclusalControl.disable();
        this.ColorMedioControl.disable();
        this.ColorCervicalControl.disable();
      } 
      //if(this.CotizarControl.getRawValue()) this.PrecioControl.disable();
    }
  }


  onSubmint():void{
    if(this.pedidosForm.invalid){
      alert("Por favor llene todos los campos correctamente");
    }else{
      //alert(JSON.stringify(this.pedidosForm.value));
      this.ColorIncisalOclusalControl.enable();
      this.ColorMedioControl.enable();
      this.ColorCervicalControl.enable();
      this.dialogRef.close(this.pedidosForm.value);
    }
  }

  onColorimetroChange(): void {
    if (!this.ColorimetroControl.value) {
      // Checkbox marcado: establecer el valor del campo de precio a 0 y deshabilitar
      this.ColorIncisalOclusalControl.setValue('');
      this.ColorMedioControl.setValue('');
      this.ColorCervicalControl.setValue('');
      this.ColorIncisalOclusalControl.disable();
      this.ColorMedioControl.disable();
      this.ColorCervicalControl.disable();
    } else {
      // Checkbox no marcado: habilitar el campo de precio
      this.ColorIncisalOclusalControl.enable();
      this.ColorMedioControl.enable();
      this.ColorCervicalControl.enable();
    }
  }
}

