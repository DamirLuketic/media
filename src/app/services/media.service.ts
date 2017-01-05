import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { RootService } from "./root.service";
import { MediaForChange } from "../class/media-for-change";

@Injectable()
export class MediaService {

  // Set basic category for view / 1 => all / 2 => audio / 3 => video
  public currentCategory: number = 1;

  constructor(
      private http: Http,
      private root: RootService
  ) { }

  // Media For Change -> Start

  getMediaForChange(){
    return this.http.get(this.root.apiRoute + 'media').
        map((response: Response) => response.json());
  }

  // Collected media data
  public mediaForChange: MediaForChange[];

  // Filtered media for showing
  public selectedMediaForChange: MediaForChange[];

  // Show all category
  setForChangeAllCategory(){
      this.currentCategory = 1;
      this.selectedMediaForChange = this.mediaForChange;
  }

  // Show only audio -> show category 1 & 2
  setForChangeAudioCategory(){
    this.currentCategory = 2;
    this.selectedMediaForChange = [];
    for(let media of this.mediaForChange){
      if(media != null){
        if(media.category_id == 1 || media.category_id == 2){
          this.selectedMediaForChange.push(media);
        }
      }
    }
  }

  // Show only video -> media 2 -> show category 1 & 2
  setForChangeVideoCategory(){
    this.currentCategory = 3;
    this.selectedMediaForChange = [];
    for(let media of this.mediaForChange){
      if(media != null){
        if(media.category_id == 3 || media.category_id == 4){
          this.selectedMediaForChange.push(media);
        }
      }
    }
  }

  // Media For Change -> End

}
