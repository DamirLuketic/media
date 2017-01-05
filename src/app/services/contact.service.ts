import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http, Headers, Response} from "@angular/http";
import { Observable } from "rxjs";
import {Contact} from "../class/contact";
import {RootService} from "./root.service";

@Injectable()
export class ContactService {

  constructor(
      private http: Http,
      private rootService: RootService
  ) { }

  // error handler
  handleError(error: any) {
    return Observable.throw(error.json());
  }

  // send e-mail from contact
  contactSend(contact: Contact) {
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiRoute + 'send_email/' + contact, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }
}
