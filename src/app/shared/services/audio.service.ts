import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {RootService} from "./root.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class AudioService {

  constructor(
      private http: Http,
      private rootService: RootService
  ) { }

  private handleError(error: any){
    return Observable.throw(error.json());
  }

  // Get audio categories -> available data for all user so we use "GET" method
  getAudioCategories(){
    return this.http.get(this.rootService.apiRoute + '/api/audio_categories').
        map((response: Response) => response.json()).
        catch(this.handleError);;
  }

  // Get Audio for change -> available data for all user so we use "GET" method
  getAudioForChange(){
    return this.http.get(this.rootService.apiRoute + '/api/audio_for_change').
        map((response: Response) => response.json()).
        catch(this.handleError);;
  }

  // Collect allowed audio
    collectAudioAllowed(user_id: number){
      const body = JSON.stringify(user_id);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/audio_allowed/' + user_id, body, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }

  // Collect personal audio
    collectAudioPersonal(user_id: number){
      const body = JSON.stringify(user_id);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/audio_personal/' + user_id, body, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }

}
