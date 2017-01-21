import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {RootService} from "./root.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { VideoForChange } from "../class/video-for-change";

@Injectable()
export class VideoService {

  constructor(
      private http: Http,
      private rootService: RootService
  ) { }

  private handleError(error: any){
    return Observable.throw(error.json());
  }

  // Get video categories -> available data for all user so we use "GET" method
  getVideoCategories(){
    return this.http.get(this.rootService.apiRoute + '/api/video_categories').
        map((response: Response) => response.json()).
        catch(this.handleError);;
  }

  // Get Video for change -> available data for all user so we use "GET" method
  getVideoForChange(){
    return this.http.get(this.rootService.apiRoute + '/api/video_for_change').
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

    // Collect allowed video
    collectVideoAllowed(user_id: number){
        const body = JSON.stringify(user_id);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.rootService.apiRoute + '/api/video_allowed/' + user_id, body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
    }

    // Collect personal videos
    collectVideoPersonal(user_id: number){
      const body = JSON.stringify(user_id);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/video_personal/' + user_id, body, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }
}
