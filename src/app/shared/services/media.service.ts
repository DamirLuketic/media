import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { RootService } from "./root.service";
import 'rxjs/Rx';
import { UpdateMedia } from "../class/update-media";
import {DeleteImageData} from "../class/delete-image-data";
import {SetNewFeaturedImageData} from "../class/set-new-featured-image-data";

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
    return this.http.post(this.rootService.apiRoute + '/api/media', body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

  // Delete "Audio" or "Video" with separate functions
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

  // Update media ("Audio" or "Video") through one function
    // Send also media id for adjust to Laravel update protocol (but media id is also in "media")
    updateMedia(media: UpdateMedia){
        const body = JSON.stringify(media);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.rootService.apiRoute + '/api/media/' + media.id, body, {headers: headers}).
            map((response: Response) => response.json()).
            catch(this.handleError);
    }

    // Delete media image
    deleteImage(deleteImageData: DeleteImageData){
      const body = JSON.stringify(deleteImageData);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/delete_image', body, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }

    // Set new featured image
    setNewFeaturedImage(setNewFeaturedImageData: SetNewFeaturedImageData){
      const body = JSON.stringify(setNewFeaturedImageData);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.rootService.apiRoute + '/api/set_new_featured_image', body, {headers: headers}).
          map((response: Response) => response.json()).
          catch(this.handleError);
    }

}
