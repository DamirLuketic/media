import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { MediaService } from "../../services/media.service";
import { MediaForChange } from "../../class/media-for-change";
import {Subscription} from "rxjs";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-list',
  templateUrl: 'change-list.component.html',
  styleUrls: ['change-list.component.css']
})
export class ChangeListComponent implements OnInit, DoCheck, OnDestroy {

    // Default value for language
    public forChange: string;
    public currentViewCategory: string;

    // Subscription
    private subscription: Subscription = null;

    // Current category
    public currentCategory: number;

    // Media for showing
    public showMedia: MediaForChange[];

  constructor(
      private mediaService: MediaService,
      private languageService: LanguageService
  ) { }

  // Each time collect media data from server (if media is changed show no more)
  ngOnInit() {
        // Set default category for view ("All")
      this.mediaService.setForChangeAllCategory();

      this.mediaService.getMediaForChange().subscribe(
          (data: MediaForChange[]) => {
            this.mediaService.mediaForChange = data,
                console.log(data)
          }
      );
  }

  ngDoCheck(){

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

      // Part for collect media data for showing
      this.currentCategory = this.mediaService.currentCategory;
      this.showMedia = [];

      if(this.currentCategory == 1){

          // Transalte category title
          switch (this.languageService.getLanguage()){
              case 'de':
                  this.currentViewCategory = 'Alle';
                  break;
              case 'en':
                  this.currentViewCategory = 'All';
                  break;
              case 'hr':
                  this.currentViewCategory = 'Sve';
                  break;
              default:
                  this.currentViewCategory = 'All';
          }

          this.showMedia = this.mediaService.selectedMediaForChange;
      }else if(this.currentCategory == 2){

          this.currentViewCategory = 'Audio';

          for(let media of this.mediaService.selectedMediaForChange){
              if(media.category_id == 1 || media.category_id == 2){
                  this.showMedia.push(media);
              }
          }
      }else if(this.currentCategory == 3){

          this.currentViewCategory = 'Video';

          for(let media of this.mediaService.selectedMediaForChange){
              if(media.category_id == 3 || media.category_id == 4){
                  this.showMedia.push(media);
              }
          }
      }
  }

  // Remove subscription
    ngOnDestroy(){
      if(this.subscription != null){
          this.subscription.unsubscribe();
      }
    }
}
