import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { LanguageService } from "../shared/services/language.service";
import { CurrentService } from "../shared/services/current.service";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, DoCheck, OnDestroy {

  // Default values for menu title
  public forChange: string;
  public allowedList: string;
  public personalList: string;
  public newMedia: string;

  constructor(
      private languageService: LanguageService,
      private currentService: CurrentService
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
          break;
        case 'en':
          this.forChange = 'For change';
          this.allowedList = 'Allowed list';
          this.personalList = 'Personal list';
          this.newMedia = 'New media';
          break;
        case 'hr':
          this.forChange = 'Za razmjenu';
          this.allowedList = 'Dozvoljene liste';
          this.personalList = 'Osobna lista';
          this.newMedia = 'Novi medij';
          break;
        default:
          this.forChange = 'For change';
          this.allowedList = 'Allowed list';
          this.personalList = 'Personal list';
          this.newMedia = 'New media';
      }
  }

  // Set current media to 'Audio'
  setMediaToAudio(){
    this.currentService.currentMediaType = 'Audio';
    this.currentService.currentMedia = [];
    this.currentService.currentAudioId = 0;
    this.currentService.currentVideoId = 0;
  }

  // Set current media to 'Video'
  setMediaToVideo(){
    this.currentService.currentMediaType = 'Video';
    this.currentService.currentMedia = [];
    this.currentService.currentVideoId = 0;
    this.currentService.currentAudioId = 0;
  }

  ngOnDestroy(){
    this.currentService.currentVideoId = 0;
    this.currentService.currentAudioId = 0;
  }
}
