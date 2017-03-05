import { Injectable } from '@angular/core';
import { Identifier } from "../class/identifier";
import {VideoPersonal} from "../class/video-personal";
import {AudioPersonal} from "../class/audio-personal";

@Injectable()
export class CurrentService {

  // Current media type value -> With default value
  public currentMediaType: string = 'Audio';

  // Current purpose -> "Change", "Allowed", "Personal" -> With default value
  public currentPurpose: string = 'Change';

  // Current media
  public currentMedia = [];

  // Current media id
  public currentAudioId: number = 0;
  public currentVideoId: number = 0;

  // Deleted media id
  public deletedAudioId = [];
  public deletedVideosId = [];

  // Deleted images id
  public deletedImagesId = [];

  // Variable for current new featured image id
  public newFeaturedImageId: number = 0;

  // Variable for identifiers (usage in media->personal->update)
  public currentIdentifiers: Identifier[];

  // Variable for current media update date (usage in media->personal->update)
  public currentMediaUpdateDate: string = null;

  // Collected data from media
  public currentAudioPersonal: AudioPersonal[] = [];
  public currentVideoPersonal: VideoPersonal[] = [];

  constructor() { }

}
