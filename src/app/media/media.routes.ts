import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { PersonalListComponent } from "./personal-list/personal-list.component";
import { AllowedListComponent } from "./allowed-list/allowed-list.component";
import { NewMediaComponent } from "./new-media/new-media.component";
import { UpdateMediaComponent } from "./update-media/update-media.component";

export const MEDIA_ROUTES: Routes = [
    {path: 'list', component: ListComponent},
    {path: 'personalList', component: PersonalListComponent},
    {path: 'allowedList', component: AllowedListComponent},
    {path: 'newMedia', component: NewMediaComponent},
    {path: 'updateMedia', component: UpdateMediaComponent},
];


