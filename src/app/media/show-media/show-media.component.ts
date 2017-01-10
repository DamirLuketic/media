import { Component, OnInit, DoCheck } from '@angular/core';
import {CurrentService} from "../../shared/services/current.service";

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.css']
})
export class ShowMediaComponent implements OnInit, DoCheck {

  // Variable for current media type
  public currentMediaType: string;

  // Variable for current purpose
  public currentPurpose: string;

  // Variable for current media
  public currentMedia = [];

  constructor(
      private currentService: CurrentService
  ) { }

  ngOnInit() {
  }

  ngDoCheck(){
    // Set current media type and current purpose
    this.currentMediaType = this.currentService.currentMediaType;
    this.currentPurpose = this.currentService.currentPurpose;

    // Retrieve current media
    this.currentMedia = this.currentService.currentMedia;
  }

}
