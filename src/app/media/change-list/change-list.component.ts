import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {LanguageService} from "../../shared/services/language.service";
import {AudioService} from "../../shared/services/audio.service";
import {VideoService} from "../../shared/services/video.service";
import { CurrentService } from "../../shared/services/current.service";
import {AudioForChange} from "../../shared/class/audio-for-change";
import {VideoForChange} from "../../shared/class/video-for-change";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: 'change-list.component.html',
  styleUrls: ['change-list.component.css']
})
export class ChangeListComponent implements OnInit, DoCheck, OnDestroy {

    // Collected data from media
    public audioForChange: AudioForChange[];
    public videoForChange: VideoForChange[];

    // Default value for language
    public forChange: string;
    public currentViewMedia: string;

    // Subscriptions
    private audioSubscription: Subscription = null;
    private videoSubscription: Subscription = null;

    // Current media id
    public currentAudioId: number;
    public currentVideoId: number;

  constructor(
      private languageService: LanguageService,
      private audioService: AudioService,
      private videoService: VideoService,
      private currentService: CurrentService
  ) { }

  ngOnInit() {
      // Change purpose setting
      this.currentService.currentPurpose = 'Change';

      // Collect data for all media group -> On each init collect data to update current list
          this.audioSubscription = this.audioService.getAudioForChange().subscribe(
              (data: AudioForChange[]) => {
                  this.audioForChange = data,
                  console.log(data)
              },
              error => console.log(error)
          )

          this.videoSubscription = this.videoService.getVideoForChange().subscribe(
              (data: VideoForChange[]) => {
                      this.videoForChange = data,
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
              this.forChange = 'Austausch';
              break;
          case 'en':
              this.forChange = 'Exchange';
              break;
          case 'hr':
              this.forChange = 'Razmjena';
              break;
          default:
              this.forChange = 'Exchange';
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
