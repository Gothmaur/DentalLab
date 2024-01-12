import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { InventarioService } from '../../Services/inventario-service.service';
import { Inventarios } from '../../Models/inventarios';

@Component({
  selector: 'app-inventario-details',
  templateUrl: './inventario-details.component.html',
  styleUrls: ['./inventario-details.component.scss']
})
export class InventarioDetailsComponent{
  public inventario: Inventarios | undefined;
  public inventarioId?: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!Number(id)) {
        this.router.navigate(['dashboard', 'products']);
        this.notification.showError(`${id} no es un ID válido`);
      } else {
        if(id!=null){
          this.inventarioId = +id;
          this.loadInventario();
      }
      }
    });
  }

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private notification: NotifyService, private userService:InventarioService){
    console.log("Intento imprimir el usuario");
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard','users']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID válido`);
    }else{
      this.inventarioId = +this.activatedRoute.snapshot.params['id'];
      this.userService.loadInventarios();
      this.loadInventario();
    }
  }

  loadInventario():void{
    if(this.inventarioId){
      this.userService.getInventariosById(this.inventarioId).subscribe({
        next:(data) => 
          this.inventario = data
      });
    }
  }
}
