import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { LoginData } from "../class/login-data";
import { RootService} from "./root.service";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { RegistrationData } from "../class/registration-data";
import { UpdateAuth } from "../class/update-auth";

@Injectable()
export class AuthService {

  public auth;

  constructor(
      private http: Http,
      private rootService: RootService
  ) {}

  // function for handle error
  private handleError(error: any){
    return Observable.throw(error.json());
  }

  login(loginData: LoginData){
    const body = JSON.stringify(loginData);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiRoute + 'login/' + loginData, body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

  register(registrationData: RegistrationData){
    const body = JSON.stringify(registrationData);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiRoute + 'register/' + registrationData, body, {headers: headers}).
    map((response: Response) => response.json()).
    catch(this.handleError);
  }

  update(updateData: UpdateAuth){
    const body = JSON.stringify(updateData);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.rootService.apiRoute + 'users/' + updateData, body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }
}
