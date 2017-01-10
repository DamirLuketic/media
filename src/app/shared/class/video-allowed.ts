export class VideoAllowed {
    constructor(public id: number, public user_id: number, public video_category_id: number,
                public condition_id: number, public name: string, public director: string, public year: number,
                public description: string, public for_change: boolean, public owner_name: string
    ){}
}
