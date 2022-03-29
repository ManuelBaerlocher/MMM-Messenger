export class Message {
    userId1: string;
    userId2: string;







    constructor(obj?: any) {
        this.userId1 = obj ? obj.userId1 : '';
        this.userId2 = obj ? obj.userId2 : '';


    }

    public toJSON() {
        return {
            userId1: this.userId1,
            userId2: this.userId2,
        };
    }
}