import { Routes } from "@angular/router";
import {ChangeListComponent} from "./change-list/change-list.component";
import { PersonalListComponent } from "./personal-list/personal-list.component";
import { AllowedListComponent } from "./allowed-list/allowed-list.component";
import { UpdateMediaComponent } from "./update-media/update-media.component";


export const MEDIA_ROUTES: Routes = [
    {path: 'changeList', component: ChangeListComponent},
    {path: 'personalList', component: PersonalListComponent},
    {path: 'allowedList', component: AllowedListComponent},
    {path: 'updateMedia', component: UpdateMediaComponent},
];


