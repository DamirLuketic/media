import { Identifier } from "./identifier";

export class UpdateMedia {
    constructor(public media_category: string, public id: number, public category_id: number,
                public condition_id: number, public bandDirector: string, public albumName: string, public year: number,
                public description: string, public for_change: boolean,
                public first_release_year: number, public personal_note: string, public cat: string,
                public label: string, public barcode_numbers: string, public identifiers: Identifier[]
){}
}

