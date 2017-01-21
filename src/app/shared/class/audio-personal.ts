import { Image } from "./image";
import { Identifier } from "./identifier";

export class AudioPersonal {
    constructor(public id: number, public user_id: number, public audio_category_id: number,
                public condition_id: number, public band: string, public album: string, public year: number,
                public description: string, public for_change: boolean, public allowed: boolean,
                public first_release_year: number, public personal_note: string, public cat: string,
                public label: string, public barcode_numbers: string,
                public created_at, public updated_at, public images: Image[],
                public identifiers: Identifier[]
    ){}
}
