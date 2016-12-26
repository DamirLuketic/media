import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserViewComponent } from "./user-view/user-view.component";

export const USERS_ROUTES: Routes = [
    {path: 'list', component: UsersListComponent},
    {path: 'view', component: UserViewComponent}
];