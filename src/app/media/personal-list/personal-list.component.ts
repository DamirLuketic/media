import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {CurrentService} from "../../shared/services/current.service";
import {AudioPersonal} from "../../shared/class/audio-personal";
import {VideoPersonal} from "../../shared/class/video-personal";
import {Subscription} from "rxjs";
import {LanguageService} from "../../shared/services/language.service";
import {AudioService} from "../../shared/services/audio.service";
import {VideoService} from "../../shared/services/video.service";
import {AuthService} from "../../shared/services/auth.service";
import {Identifiers} from "@angular/compiler/src/identifiers";
import {Identifier} from "../../shared/class/identifier";

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {

  // Collected media for show (without deleted media)
  public audioPersonalView: AudioPersonal[] = [];
  public videoPersonalView: VideoPersonal[] = [];

  public searchTerm: string = '';

  // Default value for language
  public personal: string;
  public currentViewMedia: string;

  // Subscriptions
  private audioSubscription: Subscription = null;
  private videoSubscription: Subscription = null;

  // Current media id
  public currentAudioId: number;
  public currentVideoId: number;

  // Deleted media id
  public deletedAudioId = [];
  public deletedVideosId = [];

  // Variable for search message
  public searchMessage: string;

  constructor(
      private languageService: LanguageService,
      private currentService: CurrentService,
      private audioService: AudioService,
      private videoService: VideoService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    // Change purpose setting
    this.currentService.currentPurpose = 'Personal';

    // Collect data for all media group -> On each init collect data to update current list
    this.audioSubscription = this.audioService.collectAudioPersonal(this.authService.auth.id).subscribe(
        (data: AudioPersonal[]) => {
          this.currentService.currentAudioPersonal = data,
              console.log(data)
        },
        error => console.log(error)
    )

    this.videoSubscription = this.videoService.collectVideoPersonal(this.authService.auth.id).subscribe(
        (data: VideoPersonal[]) => {
          this.currentService.currentVideoPersonal = data,
              console.log(data)
        },
        error => console.log(error)
    )
  }

  // Function for check audio id is in deleted id array
  isInDeletedAudioArray(audioId: number) {
    if(this.deletedAudioId.indexOf(audioId) > -1){
      return true;
    }else{
      return false;
    }
  }

  // Function for check video id is in deleted id array
  isInDeletedVideoArray(videoId: number) {
    if(this.deletedVideosId.indexOf(videoId) > -1){
      return true;
    }else{
      return false;
    }
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

    // Set current media id -> must set through service to reset values,
    // when move from different media categories on same component (when set different category reset "id")
    this.currentAudioId = this.currentService.currentAudioId;
    this.currentVideoId = this.currentService.currentVideoId;

    // Part for translate
    switch (this.languageService.getLanguage()){
      case 'de':
        this.personal = 'Persönliche Liste';
          if(this.currentViewMedia == 'Audio'){
            this.searchMessage = 'Suche nach Band oder Album';
          }else{
            this.searchMessage = 'Suche nach Regisseur oder Film Name';
          }
        break;
      case 'en':
        this.personal = 'Personal list';
          if(this.currentViewMedia == 'Audio'){
            this.searchMessage = 'Search by band or album';
          }else{
            this.searchMessage = 'Search by director or movie name';
          }
        break;
      case 'hr':
        this.personal = 'Osobna lista';
          if(this.currentViewMedia == 'Audio'){
            this.searchMessage = 'Traži po grupi ili albumu';
          }else{
            this.searchMessage = 'Traži po redatelju ili imenu filma';
          }
        break;
      default:
        this.personal = 'Personal list';
          if(this.currentViewMedia == 'Audio'){
            this.searchMessage = 'Search by band or album';
          }else{
            this.searchMessage = 'Search by director or movie name';
          }
    }

    // Collect deleted media id
    this.deletedAudioId = this.currentService.deletedAudioId;
    this.deletedVideosId = this.currentService.deletedVideosId;

    // Set audio and video for view -> if not in deleted arrays, and if search term applied
    if(this.currentService.currentAudioPersonal != []){
      this.audioPersonalView = [];
      for(let audio of this.currentService.currentAudioPersonal){
        if(this.isInDeletedAudioArray(audio.id) == false){
          if(this.findMatch(audio.band, this.searchTerm) || this.findMatch(audio.album, this.searchTerm)){
            this.audioPersonalView.push(audio);
          }
        }
      }
    }

    if(this.currentService.currentVideoPersonal != []){
      this.videoPersonalView = [];
      for(let video of this.currentService.currentVideoPersonal){
        if(this.isInDeletedVideoArray(video.id) == false){
          if(this.findMatch(video.director, this.searchTerm) || this.findMatch(video.name, this.searchTerm)){
            this.videoPersonalView.push(video);
          }
        }
      }
    }

  }

  // Set current media id and current media
  setCurrentMedia(media){
      // Current new featured image id (for media->showMedia->update->newFeaturedImageId)
    this.currentService.newFeaturedImageId = 0;

      // "currentMediaUpdateDate" -> usage in media->personal->update
    this.currentService.currentMediaUpdateDate = null;
    if(this.currentViewMedia == 'Audio'){
      this.currentService.currentAudioId = media.id;
    }else if(this.currentViewMedia == 'Video'){
      this.currentService.currentVideoId = media.id;
    };

    this.currentService.currentMedia = media;
    this.currentService.currentIdentifiers = media.identifiers;
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

    // Reset deleted media id arrays
    this.currentService.deletedAudioId = [];
    this.currentService.deletedVideosId = [];
  }
}
