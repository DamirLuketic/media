import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LanguageService } from "../shared/services/language.service";
import { AuthService } from "../shared/services/auth.service";
import { UpdateAuth } from "../shared/class/update-auth";
import {Subscription} from "rxjs";
import {RootService} from "../shared/services/root.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit, DoCheck, OnDestroy {

  // Subscription
  private updateSubscription: Subscription = null;
  private uploadImageSubscription: Subscription = null;

  // Basic value for form
  public personalForm: FormGroup;

  // Default value for form title
  public personal: string;
  public nameTitle: string;
  public newPasswordTitle: string;
  public newPasswordRepeatTitle: string;
  public update: string;
  public uploadNewImage: string;

  // Default values for form input
  public name: string;
  public newPasswordPlaceholder: string;

  constructor(
      private formBuilder: FormBuilder,
      private languageService: LanguageService,
      private authService: AuthService,
      private rootService: RootService
  ) { }

  // Set default form values
  setForm(){
    this.personalForm = this.formBuilder.group({
      'name': [this.name, Validators.required],
      'newPassword': [''],
      'newPasswordRepeat': ['']
    });
  }

  ngOnInit() {
    if(this.authService.auth != null){
      this.name = this.authService.auth.name;
    }
    this.setForm();
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
        this.uploadNewImage = 'Neues Bild hochladen';
        break;
      case 'en':
        this.personal = 'Personal';
        this.nameTitle = 'Name';
        this.newPasswordTitle = 'New password';
        this.newPasswordRepeatTitle = 'Repeat new password';
        this.update = 'Update';
        this.newPasswordPlaceholder = 'Optional (min. 6. characters)';
        this.uploadNewImage = 'Upload new image';
        break;
      case 'hr':
        this.personal = 'Osobno';
        this.nameTitle = 'Ime';
        this.newPasswordTitle = 'Nova zaporka';
        this.newPasswordRepeatTitle = 'Ponovite novu zaporku';
        this.update = 'Ažuriraj';
        this.newPasswordPlaceholder = 'Opcija (min. 6. znakova)';
        this.uploadNewImage = 'Učitaj novu sliku';
        break;
      default:
        this.personal = 'Personal';
        this.nameTitle = 'Name';
        this.newPasswordTitle = 'New password';
        this.newPasswordRepeatTitle = 'Repeat new password';
        this.update = 'Update';
        this.newPasswordPlaceholder = 'Optional (min. 6. characters)';
        this.uploadNewImage = 'Upload new image';
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

      this.updateSubscription = this.authService.update(updateAuth).subscribe(
          (data: any) => {
            console.log(data),
                this.authService.auth.name = updateAuth.name,
                this.name = updateAuth.name,
                alert('Data updated'),
                this.setForm();
          },
          error => console.log(error)
      );
    }else{
      alert("Password and repeated password don't match.");
    }
  }

  // Set user image
  userImage(){
    // Collect src from user data
    let userImage: string = this.authService.auth.image_url;
    // Variable for image src
    let imageSrc: string;

    if(userImage != null){
      imageSrc = this.rootService.apiRoute + '/images/users/' + this.authService.auth.id + '/' + userImage;
    }else{
      imageSrc = './assets/images/placeholders/userImagePlaceholder.jpg';
    }
    return imageSrc;
  }

  // Upload user image
  fileUpload(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);

      this.uploadImageSubscription = this.authService.updateImage(this.authService.auth.id, formData).subscribe(
          (data: string) => {
            this.authService.auth.image_url = data
          },
          error => console.log(error)
      );
    }
  }

  // Remove subscriptions
  ngOnDestroy(){
    if(this.updateSubscription != null){
      this.updateSubscription.unsubscribe();
    }

    if(this.uploadImageSubscription != null){
      this.uploadImageSubscription.unsubscribe();
    }
  }

}
