import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {

  public emailControl = new FormControl(
    "",[Validators.required, Validators.email]
  );
  public passControl = new FormControl(
    "",[Validators.required]
  );
  

  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passControl
  });

  constructor(private authService: AuthService){}

  login():void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      this.authService.login(this.loginForm.getRawValue());
    }
  }
}
