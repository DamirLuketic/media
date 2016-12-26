import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactComponent } from "./contact/contact.component";
import { UsersComponent } from "./users/users.component";
import { DefaultComponent } from "./default/default.component";
import { routes } from "./app.routes";
import { RegisterLoginComponent } from "./register-login/register-login.component";
import { PersonalComponent } from "./personal/personal.component";
import { MediaComponent } from "./media/media.component";
import { ListComponent } from "./media/list/list.component";
import { PersonalListComponent } from "./media/personal-list/personal-list.component";
import { AllowedListComponent } from "./media/allowed-list/allowed-list.component";
import { NewMediaComponent } from "./media/new-media/new-media.component";
import { UpdateMediaComponent } from "./media/update-media/update-media.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserViewComponent } from "./users/user-view/user-view.component";
import { LanguageService } from "./services/language.service";

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
        ListComponent,
        PersonalListComponent,
        AllowedListComponent,
        NewMediaComponent,
        UpdateMediaComponent,
      // "users" children
        UsersListComponent,
        UserViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      routes
  ],
  providers: [LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
