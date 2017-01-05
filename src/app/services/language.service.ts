import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  // get default Language (work for "Chrome" browser on "Windows", and "Chromebook")
  language: string = navigator.language;

  constructor() {
    if(this.language != 'de'){
      if(this.language != 'hr'){
        this.language = 'en';
      }
    }
  }

  getLanguage(){
    return this.language;
  }
}
