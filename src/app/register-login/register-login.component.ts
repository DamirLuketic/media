import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { LoginData } from "../shared/class/login-data";
import { Auth } from "../shared/class/auth";
import { RegistrationData } from "../shared/class/registration-data";
import {LanguageService} from "../shared/services/language.service";
import {log} from "util";

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit{

  // Test if LogIn or Register component is active
  public isLogin: boolean = true;

  // Default register form (need to be set up on start -> for future usage of basic values)
  public registerForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private cookieService: CookieService,
      private languageService: LanguageService
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

    // Login part

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
      loginData['language'] = this.languageService.getLanguage();

      this.authService.login(loginData).subscribe(
          (data: Auth) => {

            if(data['id']){
              // remove previous user cookies
              this.cookieService.removeAll(),
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

    // Register part

  // Basic register form values
  public registerName: string = '';
  public registerEmail: string = '';

  setRegisterForm(){
      this.registerForm = this.formBuilder.group({
          name: [this.registerName, [Validators.required, Validators.minLength(2)]],
          email:  [this.registerEmail, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
  }

  ngOnInit(){
    this.setRegisterForm();
  }

    // Collect and show response, and if is success redirect
    onAnswer(answer: string){

      const language = this.languageService.getLanguage();
      let message: string;

      if(answer == '1'){
        if(language == 'de'){
          message = 'name de';
        }else if(language == 'en'){
          message = 'name en';
        }else if(language == 'hr'){
          message = 'name hr';
        }else {
          message = 'name en';
        }
      }else if(answer == '2'){
        if(language == 'de'){
          message = 'e-mail de';
        }else if(language == 'en'){
          message = 'e-mail en';
        }else if(language == 'hr'){
          message = 'e-mail hr';
        }else {
          message = 'e-mail en';
        }
      }else if(answer == '3'){
        if(language == 'de'){
          message = 'name & e-mail de';
        }else if(language == 'en'){
          message = 'name & e-mail en';
        }else if(language == 'hr'){
          message = 'name & e-mail hr';
        }else {
          message = 'name & e-mail en';
        }
      }else if(answer == '4'){
        if(language == 'de'){
          message = 'success de';
        }else if(language == 'en'){
          message = 'success en';
        }else if(language == 'hr'){
          message = 'success hr';
        }else {
          message = 'success en';
        }
      }

      alert(message);

      if(answer == '4'){
        this.router.navigate(['/home']);
      }
    }

    onSubmitRegister(){
      this.registerName = this.registerForm.value.name;
      this.registerEmail = this.registerForm.value.email;

      if(this.registerForm.value.password == this.registerForm.value.repeatPassword){
        let formValue = this.registerForm.value;
        delete formValue['repeatPassword'];
        let registrationData: RegistrationData = formValue;
        registrationData['language'] = this.languageService.getLanguage();

        this.authService.register(registrationData).subscribe(
            (answer: string) => {
              this.onAnswer(answer);
              this.setRegisterForm();
            },
            error => console.log(error)
        );
      }else{
        this.setRegisterForm();
        alert("Password and repeated password don't match.");
      }
    }

    onCancel(){
      this.registerForm.reset();
    }

}
