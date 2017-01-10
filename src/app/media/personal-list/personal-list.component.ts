import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {CurrentService} from "../../shared/services/current.service";
import {AudioPersonal} from "../../shared/class/audio-personal";
import {VideoPersonal} from "../../shared/class/video-personal";
import {Subscription} from "rxjs";
import {LanguageService} from "../../shared/services/language.service";
import {AudioService} from "../../shared/services/audio.service";
import {VideoService} from "../../shared/services/video.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {

  // Collected data from media
  public audioPersonal: AudioPersonal[];
  public videoPersonal: VideoPersonal[];

  // Default value for language
  public personal: string;
  public currentViewMedia: string;

  // Subscriptions
  private audioSubscription: Subscription = null;
  private videoSubscription: Subscription = null;

  // Current media id
  public currentAudioId: number;
  public currentVideoId: number;

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
          this.audioPersonal = data,
              console.log(data)
        },
        error => console.log(error)
    )

    this.videoSubscription = this.videoService.collectVideoPersonal(this.authService.auth.id).subscribe(
        (data: VideoPersonal[]) => {
          this.videoPersonal = data,
              console.log(data)
        },
        error => console.log(error)
    )
  }

  ngDoCheck(){
    // Set current view media from "current" service
    this.currentViewMedia = this.currentService.currentMediaType;

    // Part for translate
    switch (this.languageService.getLanguage()){
      case 'de':
        this.personal = 'Persönliche Liste';
        break;
      case 'en':
        this.personal = 'Personal list';
        break;
      case 'hr':
        this.personal = 'Osobna lista';
        break;
      default:
        this.personal = 'Personal list';
    }
  }

  // Set current media id and current media
  setCurrentMedia(media){
    if(this.currentViewMedia == 'Audio'){
      this.currentAudioId = media.id;
    }else if(this.currentViewMedia == 'Video'){
      this.currentVideoId = media.id;
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
