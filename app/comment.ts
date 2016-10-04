export class Comment {
    constructor(
        public id: string,
        public text: string,
        public rating: number,
        public userId: string,
        public dateAdded: string
    ) {}
}