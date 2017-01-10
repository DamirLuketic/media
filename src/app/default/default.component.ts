import { Component, OnInit } from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(
      private cookieService: CookieService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    if(this.cookieService.getObject('auth') != null){
      this.authService.auth = this.cookieService.getObject('auth');
    }
  }

}
