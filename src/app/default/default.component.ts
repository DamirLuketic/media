import { Component, OnInit, OnDestroy } from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {AuthService} from "../shared/services/auth.service";
import {MediaService} from "../shared/services/media.service";
import {Condition} from "../shared/class/condition";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit, OnDestroy {

  // Variables for subscriptions
  private collectMediaCategoriesSubscription: Subscription = null;
  private collectConditionsSubscription: Subscription = null;

  constructor(
      private cookieService: CookieService,
      private authService: AuthService,
      private mediaService: MediaService
  ) { }

  ngOnInit() {
    // Collect user data if is set in cookie
    if(this.cookieService.getObject('auth') != null){
      this.authService.auth = this.cookieService.getObject('auth');
    }

    // Collect data for media categories and conditions
    // Collect audio i video categories
    if(this.mediaService.audioCategories == null || this.mediaService.videoCategories == null){
      this.collectMediaCategoriesSubscription = this.mediaService.collectMediaCategories().subscribe(
          (data: any) => {
            this.mediaService.audioCategories = data['audio_categories'],
                this.mediaService.videoCategories = data['video_categories']
          },
          error => console.log(error)
      );
    }

    // Collect media conditions
    if(this.mediaService.conditions == null){
      this.collectConditionsSubscription = this.mediaService.collectConditions().subscribe(
          (data: Condition[]) => this.mediaService.conditions = data,
          error => console.log(error)
      );
    }
  }

  ngOnDestroy(){
    if(this.collectMediaCategoriesSubscription != null){
      this.collectMediaCategoriesSubscription.unsubscribe();
    }
    if(this.collectConditionsSubscription != null){
      this.collectConditionsSubscription.unsubscribe();
    }
  }

}
