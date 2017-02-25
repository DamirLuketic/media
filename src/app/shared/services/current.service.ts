import { Injectable } from '@angular/core';

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

  constructor() { }

}
