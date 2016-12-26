import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  // get default Language (work for "Chrome" browser on "Windows", and "Chromebook")
  language: string = navigator.language;

  constructor() {
    if(this.language != 'de' || this.language != 'hr'){
      this.language = 'en';
    }
  }

  changeToGerman(){
    this.language = 'de';
  };

  changeToEnglisch(){
    this.language = 'en';
  };

  changeToCroatian(){
    this.language = 'hr';
  };

  getLanguage(){
    return this.language;
  }
}
