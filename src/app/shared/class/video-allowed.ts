import { Image } from "./image";
import { Identifier } from "./identifier";

export class VideoAllowed {
    constructor(public id: number, public user_id: number, public video_category_id: number,
                public condition_id: number, public name: string, public director: string, public year: number,
                public first_release_year: number, public barcode_numbers: string,
                public description: string, public for_change: boolean, public owner_name: string,
                public images: Image[], public identifiers: Identifier[]
    ){}
}
