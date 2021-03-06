import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { DefaultComponent } from "./default/default.component";
import { RegisterLoginComponent } from "./register-login/register-login.component";
import { PersonalComponent } from "./personal/personal.component";
import { MediaComponent } from "./media/media.component";
import { ContactComponent } from "./contact/contact.component";

import { MEDIA_ROUTES } from "./media/media.routes";
import { USERS_ROUTES } from "./users/users.routes";
import { NewMediaComponent } from "./new-media/new-media.component";

import { CanLeaveGuard } from "./shared/guardiens/canLeave.guard";
import { AuthAccessGuard } from "./shared/guardiens/authAccess.guard";

// Basic routes is not necessary with Child Routes, if Child routes defaults routes is set

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: DefaultComponent},
    {path: 'registerLogin', component: RegisterLoginComponent},
    {path: 'personal', component: PersonalComponent, canActivate: [AuthAccessGuard], canDeactivate: [CanLeaveGuard]},
    {path: 'newMedia', component: NewMediaComponent, canActivate: [AuthAccessGuard], canDeactivate: [CanLeaveGuard]},
        {path: 'media', redirectTo: '/media/changeList', pathMatch: 'full'},
    // {path: 'media', component: MediaComponent},
        {path: 'media', component: MediaComponent, children: MEDIA_ROUTES, canActivate: [AuthAccessGuard]},
        {path: 'users', redirectTo: '/users/list', pathMatch: 'full'},
    // {path: 'users', component: UsersComponent},
        {path: 'users', component: UsersComponent, children: USERS_ROUTES, canActivate: [AuthAccessGuard]},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const routes = RouterModule.forRoot(APP_ROUTES);