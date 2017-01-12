import { Image } from "./image";

export class AudioAllowed {
    constructor(public id: number, public user_id: number, public audio_category_id: number,
                public condition_id: number, public band: string, public album: string, public year: number,
                public description: string, public for_change: boolean, public owner_name: string,
                public images: Image[]
    ){}
}