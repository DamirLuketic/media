import { Injectable } from '@angular/core';

@Injectable()
export class RootService {

  // route for local api
  apiRoute: string = 'http://localhost/media_api/public/api/';

  // route for local api
  // apiRoute: string = 'http://www.consilium-europa.com/pages/media_api/public/api/';

  constructor() { }

}
