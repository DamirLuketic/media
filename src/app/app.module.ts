import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactComponent } from "./contact/contact.component";
import { UsersComponent } from "./users/users.component";
import { DefaultComponent } from "./default/default.component";
import { routes } from "./app.routes";
import { RegisterLoginComponent } from "./register-login/register-login.component";
import { PersonalComponent } from "./personal/personal.component";
import { MediaComponent } from "./media/media.component";
import { ChangeListComponent } from "./media/change-list/change-list.component";
import { PersonalListComponent } from "./media/personal-list/personal-list.component";
import { AllowedListComponent } from "./media/allowed-list/allowed-list.component";
import { NewMediaComponent } from "./new-media/new-media.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { LanguageService } from "./shared/services/language.service";
import { AuthService } from "./shared/services/auth.service";
import { RootService } from "./shared/services/root.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ContactService } from "./shared/services/contact.service";
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { AudioService } from "./shared/services/audio.service";
import { VideoService } from "./shared/services/video.service";
import { CurrentService } from "./shared/services/current.service";
import { ShowMediaComponent } from "./media/show-media/show-media.component";
import { MediaService } from "./shared/services/media.service";
import { CanLeaveGuard } from "./shared/guardiens/canLeave.guard";
import { AuthAccessGuard } from "./shared/guardiens/authAccess.guard";
import {Ng2PaginationModule} from "ng2-pagination";


@NgModule({
  declarations: [
    AppComponent,
      ContactComponent,
      DefaultComponent,
      RegisterLoginComponent,
      PersonalComponent,
      UsersComponent,
      MediaComponent,
      ShowMediaComponent,
      NewMediaComponent,
      // "media" children
        ChangeListComponent,
        PersonalListComponent,
        AllowedListComponent,
      // "users" children
        UsersListComponent,
        UserViewComponent,
      // directives
        DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      ReactiveFormsModule,
      routes,
    Ng2PaginationModule
  ],
  providers: [LanguageService, AuthService, RootService, CookieService, ContactService, AudioService, VideoService,
    CurrentService, MediaService, CanLeaveGuard, AuthAccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
