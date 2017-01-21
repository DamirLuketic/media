import { Image } from "./image";
import { Identifier } from "./identifier";

export class AudioForChange {
    constructor(public id: number, public user_id: number, public audio_category_id: number,
                public condition_id: number, public band: string, public album: string, public year: number,
                public first_release_year: number, public cat: string,
                public label: string, public barcode_numbers: string,
                public description: string, public owner_name: string, public images: Image[],
                public identifiers: Identifier[]
    ){}
}