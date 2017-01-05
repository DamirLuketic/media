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
import { NewMediaComponent } from "./media/new-media/new-media.component";
import { UpdateMediaComponent } from "./media/update-media/update-media.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { LanguageService } from "./services/language.service";
import { AuthService } from "./services/auth.service";
import { RootService } from "./services/root.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ContactService } from "./services/contact.service";
import { MediaService } from "./services/media.service";
import { DropdownDirective } from "./directives/dropdown.directive";


@NgModule({
  declarations: [
    AppComponent,
      ContactComponent,
      DefaultComponent,
      RegisterLoginComponent,
      PersonalComponent,
      UsersComponent,
      MediaComponent,
      // "media" children
        ChangeListComponent,
        PersonalListComponent,
        AllowedListComponent,
        NewMediaComponent,
        UpdateMediaComponent,
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
      routes
  ],
  providers: [LanguageService, AuthService, RootService, CookieService, ContactService, MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
