export class LogEntry {
    constructor(
        public id: string,
        public message: string,
        public rating: number,
        public userId: string,
        public dateStamp: string
    ) {}
}