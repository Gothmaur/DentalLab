import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
goToInventarios() {
  this.router.navigate(['dashboard','inventarios'],{
    //relativeTo: this.activatedRoute,
  });
}
goToPedidos() {
  this.router.navigate(['dashboard','pedidos'],{
    //relativeTo: this.activatedRoute,
  });
}

  constructor(private router: Router, private authService: AuthService){}

  LogOut():void{
    this.router.navigate(['auth','login'],{});
    this.authService.logOut();

  }

  goToUsers():void{
    this.router.navigate(['dashboard','users'],{
      //relativeTo: this.activatedRoute,
    });
  }

  goToProducts():void{
    this.router.navigate(['dashboard','products'],{
      //relativeTo: this.activatedRoute,
    });
  }

  goToHome():void{
    this.router.navigate(['dashboard','home'],{
      //relativeTo: this.activatedRoute,
    });
  }

  
  goToPerfil():void{
    this.router.navigate(['dashboard','perfil'],{
      //relativeTo: this.activatedRoute,
    });
  }

}


