import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { PedidoService } from '../../Services/pedidos-service.service';
import { Pedidos } from '../../Models/pedidos';

@Component({
  selector: 'app-pedido-details',
  templateUrl: './pedido-details.component.html',
  styleUrls: ['./pedido-details.component.scss']
})
export class PedidoDetailsComponent {
  
  public pedido: Pedidos | undefined;
  public pedidoId?: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!Number(id)) {
        this.router.navigate(['dashboard', 'products']);
        this.notification.showError(`${id} no es un ID válido`);
      } else {
        if(id!=null){
          this.pedidoId = +id;
          this.loadProduct();
      }
      }
    });
  }

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private notification: NotifyService, private userService:PedidoService){
    console.log("Intento imprimir el usuario");
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard','users']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID válido`);
    }else{
      this.pedidoId = +this.activatedRoute.snapshot.params['id'];
      this.userService.loadPedidos();
      this.loadProduct();
    }
  }

  loadProduct():void{
    if(this.pedidoId){
      this.userService.getPedidosById(this.pedidoId).subscribe({
        next:(data) => 
          this.pedido = data
      });
    }
  }
}
