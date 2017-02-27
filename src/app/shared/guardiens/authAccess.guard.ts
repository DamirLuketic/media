import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthAccessGuard implements CanActivate{

    constructor(private authService: AuthService){}

    canActivate(){
        if(this.authService.auth != null){
            return true;
        }else {
            return false;
        }
    }
}

