import { Component, OnInit, DoCheck } from '@angular/core';
import { LanguageService } from "../services/language.service";
import {MediaService} from "../services/media.service";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, DoCheck {

  // Default values for menu title
  public forChange: string;
  public allowedList: string;
  public personalList: string;
  public newMedia: string;

  // Default value for menu component
  public allMedia: string;

  // Current category
  public currentCategory: number;

  constructor(
      private languageService: LanguageService,
      private mediaService: MediaService
  ) { }

  ngOnInit() {
  }

  ngDoCheck(){
      switch (this.languageService.getLanguage()){
        case 'de':
          this.forChange = 'Für die Austausch';
          this.allowedList = 'Zulässige Liste';
          this.personalList = 'Persönliche Liste';
          this.newMedia = 'Neue Medien';
          this.allMedia = 'Alle';
          break;
        case 'en':
          this.forChange = 'For change';
          this.allowedList = 'Allowed list';
          this.personalList = 'Personal list';
          this.newMedia = 'New media';
          this.allMedia = 'All';
          break;
        case 'hr':
          this.forChange = 'Za razmjenu';
          this.allowedList = 'Dozvoljene liste';
          this.personalList = 'Osobna lista';
          this.newMedia = 'Novi medij';
          this.allMedia = 'Sve';
          break;
        default:
          this.forChange = 'For change';
          this.allowedList = 'Allowed list';
          this.personalList = 'Personal list';
          this.newMedia = 'New media';
          this.allMedia = 'All';
      }
  }

  // For "for change" -> Start

  selectForChangeAll(){
    this.mediaService.setForChangeAllCategory();
  }

  selectForChangeAudio(){
    this.mediaService.setForChangeAudioCategory();
  }

  selectForChangeVideo(){
    this.mediaService.setForChangeVideoCategory();
  }

  // For "for change" -> Start


}
