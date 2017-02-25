import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { RootService } from "./root.service";
import 'rxjs/Rx';

@Injectable()
export class MediaService {

  constructor(
      private http: Http,
      private rootService: RootService
  ) { }

  private handleError(error: any){
    return Observable.throw(error.json());
  }

  newMediaImages(media_type: string, media_id: number, newMediaImages){
      const headers = new Headers({'Accept': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/new_media_images/' + media_type + '/' + media_id,
          newMediaImages, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }

  newMedia(newMedia){
    const body = JSON.stringify(newMedia);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiRoute + '/api/media', newMedia, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

    deleteAudio(id: number){
        return this.http.delete(this.rootService.apiRoute + '/api/audio/' + id).
        map((response: Response) => response.json()).
        catch(this.handleError);
    }

    deleteVideo(id: number){
        return this.http.delete(this.rootService.apiRoute + '/api/video/' + id).
        map((response: Response) => response.json()).
        catch(this.handleError)
    }

}
