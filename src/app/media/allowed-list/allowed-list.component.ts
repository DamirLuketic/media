import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { CurrentService } from "../../shared/services/current.service";
import { AudioService } from "../../shared/services/audio.service";
import { VideoService } from "../../shared/services/video.service";
import { AudioAllowed } from "../../shared/class/audio-allowed";
import { VideoAllowed } from "../../shared/class/video-allowed";
import {Subscription} from "rxjs";
import {LanguageService} from "../../shared/services/language.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-allowed-list',
  templateUrl: './allowed-list.component.html',
  styleUrls: ['./allowed-list.component.css']
})
export class AllowedListComponent implements OnInit, DoCheck, OnDestroy {

  // Collected data from media
  public audioAllowed: AudioAllowed[];
  public videoAllowed: VideoAllowed[];

  // Default value for language
  public allowed: string;
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
    this.currentService.currentPurpose = 'Allowed';

    // Collect data for all media group -> On each init collect data to update current list
    this.audioSubscription = this.audioService.collectAudioAllowed(this.authService.auth.id).subscribe(
        (data: AudioAllowed[]) => {
          this.audioAllowed = data,
              console.log(data)
        },
        error => console.log(error)
    )

    this.videoSubscription = this.videoService.collectVideoAllowed(this.authService.auth.id).subscribe(
        (data: VideoAllowed[]) => {
          this.videoAllowed = data,
              console.log(data)
        },
        error => console.log(error)
    )
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
        this.allowed = 'Zulässige Liste';
        break;
      case 'en':
        this.allowed = 'Allowed list';
        break;
      case 'hr':
        this.allowed = 'Dozvoljene liste';
        break;
      default:
        this.allowed = 'Allowed list';
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
