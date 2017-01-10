import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LanguageService } from "../shared/services/language.service";
import { AuthService } from "../shared/services/auth.service";
import { UpdateAuth } from "../shared/class/update-auth";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, DoCheck, OnDestroy {

  // Subscription
  private subscription: Subscription = null;

  // Basic value for form
  public personalForm: FormGroup;

  // Default value for form title
  public personal: string;
  public nameTitle: string;
  public newPasswordTitle: string;
  public newPasswordRepeatTitle: string;
  public update: string;

  // default values for form input
  public name: string;
  public newPasswordPlaceholder: string;

  constructor(
      private formBuilder: FormBuilder,
      private languageService: LanguageService,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.auth != null){
      this.name = this.authService.auth.name;
    }

    // set default form values
    this.personalForm = this.formBuilder.group({
      'name': [this.name, Validators.required],
      'newPassword': [''],
      'newPasswordRepeat': ['']
    });
  }

  ngDoCheck(){
    switch(this.languageService.getLanguage()) {
      case 'de':
        this.personal = 'Persönlich';
        this.nameTitle = 'Name';
        this.newPasswordTitle = 'Neues Kennwort';
        this.newPasswordRepeatTitle = 'Wiederhole das neue Passwort';
        this.update = 'Aktualisieren';
        this.newPasswordPlaceholder = 'Optional (mindestens 6 Zeichen)';
        break;
      case 'en':
        this.personal = 'Personal';
        this.nameTitle = 'Name';
        this.newPasswordTitle = 'New password';
        this.newPasswordRepeatTitle = 'Repeat new password';
        this.update = 'Update';
        this.newPasswordPlaceholder = 'Optional (min. 6. characters)';
        break;
      case 'hr':
        this.personal = 'Osobno';
        this.nameTitle = 'Ime';
        this.newPasswordTitle = 'Nova zaporka';
        this.newPasswordRepeatTitle = 'Ponovite novu zaporku';
        this.update = 'Ažuriraj';
        this.newPasswordPlaceholder = 'Opcija (min. 6. znakova)';
        break;
      default:
        this.personal = 'Personal';
        this.nameTitle = 'Name';
        this.newPasswordTitle = 'New password';
        this.newPasswordRepeatTitle = 'Repeat new password';
        this.update = 'Update';
        this.newPasswordPlaceholder = 'Optional (min. 6. characters)';
    }
  }

  // Show "repeat password" if "password" length is minimum 6 symbols
  passwordLength(){
    if(this.personalForm.value.newPassword != null){
      if(this.personalForm.value.newPassword.length >= 6){
        return true;
      }else{
        return false;
      }
    }
  }

  // if new password is written must be at lest 6 characters
  checkNewPasswordError(password: string){
    if(password != ''){
      if(password.length < 6){
        return true;
      }
    }else{
      return false;
    }
  }

  // disabled form submit on "not valid form" or "form is un-touched"
  disabledForm(){
      if(!this.personalForm.valid || this.personalForm.pristine || this.checkNewPasswordError(this.personalForm.value.newPassword)){
          return true;
      }
  }

  onSubmit(){

    // Collect form data
    const formValue = this.personalForm.value;

    // If password and repeat password not match stop (if password is set is tested earlier for form)
    if(formValue.newPassword == formValue.newPasswordRepeat){
      // remove part that not need for "PUT" request
      delete formValue['newPasswordRepeat'];

      const updateAuth: UpdateAuth = this.personalForm.value;
      updateAuth.id = this.authService.auth.id;

      this.subscription = this.authService.update(updateAuth).subscribe(
          (data: any) => {
            console.log(data),
                this.authService.auth.name = updateAuth.name,
                this.name = updateAuth.name,
                alert('Data updated'),
                this.router.navigate(['/home']);
          },
          error => console.log(error)
      );
    }else{
      alert("Password and repeated password don't match.");
    }
  }

  // Remove subscription
  ngOnDestroy(){
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

}
