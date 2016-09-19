export class Dream {
    constructor(
        public id: string,
        public title: string,
        public text: string,
        public rating: number,
        public userId: string,
        public dateAdded: string
    ) {}
}