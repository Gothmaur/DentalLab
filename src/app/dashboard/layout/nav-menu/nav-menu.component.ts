import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { selectAuthRole } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {


  public rol:string|undefined;


  constructor(private router: Router, private authService: AuthService,private store:Store){
    store.select(selectAuthRole).subscribe((userRole) => this.rol = userRole);
  }

  LogOut():void{
    this.router.navigate(['auth','login'],{});
    this.authService.logOut();
  }

  goTo(ruta:string):void{
    this.router.navigate(['dashboard',ruta],{})
  } 

}


