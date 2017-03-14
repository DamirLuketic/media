import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { LanguageService } from "../../shared/services/language.service";
import { AudioService } from "../../shared/services/audio.service";
import { VideoService } from "../../shared/services/video.service";
import { CurrentService } from "../../shared/services/current.service";
import { AudioForChange } from "../../shared/class/audio-for-change";
import { VideoForChange } from "../../shared/class/video-for-change";
import { Subscription } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";
import {MediaService} from "../../shared/services/media.service";

@Component({
  selector: 'app-list',
  templateUrl: 'change-list.component.html',
  styleUrls: ['change-list.component.css']
})
export class ChangeListComponent implements OnInit, DoCheck, OnDestroy {

    // Variable for user id
    public userId: number = 0;

    // Variable for personal media mark
    public personal: string;

    // Variable for media data
    public audioForChange: AudioForChange[] = null;
    public videoForChange: VideoForChange[] = null;

    // Variables for term, and media with applied term
    public searchTerm: string = '';
    public audioForChangeWithTerm: AudioForChange[] = [];
    public videoForChangeWithTerm: VideoForChange[] = [];

    // Default value for language
    public forChange: string;
    public currentViewMedia: string;

    // Subscriptions
    private audioSubscription: Subscription = null;
    private videoSubscription: Subscription = null;

    // Current media id
    public currentAudioId: number;
    public currentVideoId: number;

    // Variable for search message
    public searchMessage: string;

  constructor(
      private languageService: LanguageService,
      private audioService: AudioService,
      private videoService: VideoService,
      private currentService: CurrentService,
      private authService: AuthService,
  ) { }

  ngOnInit() {
      // Collect user id
      this.userId = this.authService.auth.id;

      // Change purpose setting
      this.currentService.currentPurpose = 'Change';

      // Collect data for all media group -> On each init collect data to update current list
      this.audioSubscription = this.audioService.getAudioForChange().subscribe(
          (data: AudioForChange[]) => this.audioForChange = data,
          error => console.log(error)
      )

      this.videoSubscription = this.videoService.getVideoForChange().subscribe(
          (data: VideoForChange[]) => this.videoForChange = data,
          error => console.log(error)
      )
  }

    // function for testing term
    findMatch(name: string, term: string){
        // Modify search for upper and lower case
        let nameLowerCase = name.toLowerCase();
        let termLowerCase = term.toLowerCase();

        if(nameLowerCase.indexOf(termLowerCase) !== -1){
            return true;
        }else{
            return false;
        }
    }

  ngDoCheck(){

      // Set current view media from "current" service
      this.currentViewMedia = this.currentService.currentMediaType;

      this.audioForChangeWithTerm = [];
      this.videoForChangeWithTerm = [];

      if(this.audioForChange != null){
          if(this.searchTerm != ''){
              for(let audio of this.audioForChange){
                  if(this.findMatch(audio.band, this.searchTerm) || this.findMatch(audio.album, this.searchTerm)){
                      this.audioForChangeWithTerm.push(audio);
                  }
              }
          }else{
              this.audioForChangeWithTerm = this.audioForChange;
          }
      }

      if(this.videoForChange != null){
          if(this.searchTerm != ''){
              for(let video of this.videoForChange){
                  if(this.findMatch(video.director, this.searchTerm) || this.findMatch(video.name, this.searchTerm)){
                      this.videoForChangeWithTerm.push(video);
                  }
              }
          }else{
              this.videoForChangeWithTerm = this.videoForChange;
          }
      }

      // Set current media id -> must set through service to reset values,
      // when move from different media categories on same component (when set different category reset "id")
      this.currentAudioId = this.currentService.currentAudioId;
      this.currentVideoId = this.currentService.currentVideoId;

      // Part for translate
      switch (this.languageService.getLanguage()){
          case 'de':
              this.forChange = 'Austausch';
              this.personal = 'Meine';
                  if(this.currentViewMedia == 'Audio'){
                      this.searchMessage = 'Suche nach Band oder Album';
                  }else{
                      this.searchMessage = 'Suche nach Regisseur oder Film Name';
                  }
              break;
          case 'en':
              this.forChange = 'Exchange';
              this.personal = 'My';
                  if(this.currentViewMedia == 'Audio'){
                      this.searchMessage = 'Search by band or album';
                  }else{
                      this.searchMessage = 'Search by director or movie name';
                  }
              break;
          case 'hr':
              this.forChange = 'Razmjena';
              this.personal = 'Moje';
                  if(this.currentViewMedia == 'Audio'){
                      this.searchMessage = 'Traži po grupi ili albumu';
                  }else{
                      this.searchMessage = 'Traži po redatelju ili imenu filma';
                  }
              break;
          default:
              this.forChange = 'Exchange';
              this.personal = 'My';
                  if(this.currentViewMedia == 'Audio'){
                      this.searchMessage = 'Search by band or album';
                  }else{
                      this.searchMessage = 'Search by director or movie name';
                  }
      }

  }

    // Set current media id and current media
    setCurrentMedia(media){
        if(this.currentViewMedia == 'Audio'){
            this.currentService.currentAudioId = media.id;
        }else if(this.currentViewMedia == 'Video'){
            this.currentService.currentVideoId = media.id;
        };

        this.currentService.currentMedia = media;
    }

    ngOnDestroy() {
      // Remove subscriptions
        if(this.audioSubscription != null){
            this.audioSubscription.unsubscribe();
        }

        if(this.videoSubscription != null){
            this.videoSubscription.unsubscribe();
        }

      // Reset current media
        this.currentService.currentMedia = [];
    }
}
