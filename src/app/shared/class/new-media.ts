import {IdentifierForNewMedia} from "./identifier-for-new-media";
export class NewMedia {
    constructor(public category: number, public condition: number, public bandDirector: string,
                public albumName: string, public year: number, public firstReleaseYear: number,
                public description: string, public personalNote: string, public label: string,
                public barcodeNumber: string, public cat: string, public change: boolean, public type: string,
                public user_id: number, public identifiers: IdentifierForNewMedia[]
    ) {}
}
