import { Component, DoCheck } from '@angular/core';
import { LanguageService } from "./shared/services/language.service";
import { AuthService } from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{

  // Menu name variables
  public home: string = 'Home';
  public registerLogin: string = 'Register\Login';
  public logout: string = 'Logout';
  public personal: string = 'Personal';
  public newMedia: string = 'New Media';
  public media: string = 'Media';
  public users: string = 'Users';
  public contact: string = 'Contact';

  constructor(
      private languageService: LanguageService,
      private authService: AuthService,
      private router: Router
  ){}

  ngDoCheck(){

        // adopt menu name variable for user language
    if(this.languageService.getLanguage() == 'de'){
      this.home = 'Startseite';
      this.registerLogin = 'Registrieren \\ Anmelden';
      this.logout = 'Ausloggen';
      this.personal = 'Persönlich';
      this.newMedia = 'Neue Medien';
      this.media = 'Medien';
      this.users = 'Benutzer';
      this.contact = 'Kontakt';
    }else if(this.languageService.getLanguage() == 'hr'){
      this.home = 'Početna stranica';
      this.registerLogin = 'Registracija \\ Prijava';
      this.logout = 'Odjava';
      this.personal = 'Privatno';
      this.newMedia = 'Novi Medij';
      this.media = 'Mediji';
      this.users = 'Korisnici';
      this.contact = 'Kontakt';
    }else {
      this.home = 'Home';
      this.registerLogin = 'Register \\ Login';
      this.logout = 'Logout';
      this.personal = 'Personal';
      this.newMedia = 'New Media';
      this.media = 'Media';
      this.users = 'Users';
      this.contact = 'Contact';
    }
  }

  // change language to German
  changeToGerman(){
    this.languageService.language = 'de';
  };

  // change language to Englisch
  changeToEnglisch(){
    this.languageService.language = 'en';
  };

  // change language to Croatian
  changeToCroatian(){
    this.languageService.language = 'hr';
  };

  // Check if user is auth
  isAuth(){
    if(this.authService.auth == null){
      return false;
    }else{
      return true;
    }
  }

  // Function for Logout
  logoutFunction(){
    this.authService.auth = null;
    this.router.navigate(['/home']);
  }
}
