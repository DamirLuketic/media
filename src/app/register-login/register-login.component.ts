import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { LoginData } from "../class/login-data";
import { Auth } from "../class/auth";
import { RegistrationData } from "../class/registration-data";

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent {

  // test if LogIn or Register component is active
  public isLogin: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private cookieService: CookieService
  ) { }

  passwordLength(){
    if(this.registerForm.value.password != null){
      if(this.registerForm.value.password.length >= 6){
        return true;
      }else{
        return false
      }
    }
  }

  toLogin(){
    this.isLogin = true;
  }

  toRegister() {
    this.isLogin = false;
  }

    // login part

  public loginform = this.formBuilder.group({
      email:  ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: []
    });

    onSubmitLogin(){

      let formValue = this.loginform.value;
      let remember = formValue['remember'];
      delete formValue['remember'];
      let loginData: LoginData = formValue;

      this.authService.login(loginData).subscribe(
          (data: Auth) => {

            if(data['id']){
              // remove previus user cookies
              this.cookieService.removeAll(),
                  console.log(data),
                  // check if remember check in login is checked
                  // add data to user or to cookies
                  // if add data to cookies, also add in userData
                  remember != null ? this.cookieService.putObject('auth', data) : this.authService.auth = data,
                  this.cookieService.getObject('auth') != null ? this.authService.auth = data : this.router.navigate(['/home']),
                  this.router.navigate(['/home']);
            }else {
              alert(data),
                  (error: any) => console.log(error)
            }
          }
      );
    };

    // register part

  public registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email:  ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    onSuccess(value: any){
      alert(value);
      this.router.navigate(['/home'])
    }

    onSubmitRegister(){
      if(this.registerForm.value.password == this.registerForm.value.repeatPassword){

        let formValue = this.registerForm.value;
        delete formValue['repeatPassword'];
        let registrationData: RegistrationData = formValue;

        this.authService.register(registrationData).subscribe(
            (answer: any) => {
              answer == 'Confirm e-mail to activate account' ? this.onSuccess(answer) : alert(answer);
            },
            error => console.log(error)
        );
      }else{
        alert("Password and repeated password don't match.")
      }
    }

    onCancel(){
      this.registerForm.reset();
    }

}
