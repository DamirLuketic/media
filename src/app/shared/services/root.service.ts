import { Injectable } from '@angular/core';

@Injectable()
export class RootService {

  // Route for local api
  // apiRoute: string = 'http://localhost/media_api/public';

  // Route for remote api
  apiRoute: string = 'http://www.consilium-europa.com/pages/media_api/public';

  constructor() { }

}
