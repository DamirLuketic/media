import { Image } from "./image";

export class VideoPersonal {
    constructor(public id: number, public user_id: number, public video_category_id: number,
                public condition_id: number, public name: string, public director: string, public year: number,
                public description: string, public for_change: boolean, public allowed: boolean,
                public created_at: string, public updated_at: string, public images: Image[]
    ){}
}