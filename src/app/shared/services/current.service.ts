import { Injectable } from '@angular/core';
import {AudioForChange} from "../class/audio-for-change";
import {VideoForChange} from "../class/video-for-change";

@Injectable()
export class CurrentService {

  // Current media type value -> With default value
  public currentMediaType: string = 'Audio';

  // Current purpose -> "Change", "Allowed", "Personal" -> With default value
  public currentPurpose: string = 'Change';

  // Current media
  public currentMedia = [];

  // Current media id
  public currentAudioId: number;
  public currentVideoId: number;

  constructor() { }

}
