export class Post {
    channelId: string;
    userId: string;
    content: string;
    img: string;
    code: string;
    time: number;




    constructor(obj?: any) {
        this.channelId = obj ? obj.channelId : '';
        this.userId = obj ? obj.userId : '';
        this.content = obj ? obj.content : '';
        this.img = obj ? obj.img : '';
        this.code = obj ? obj.code : '';
        this.time = obj ? obj.time : '';

    }

    public toJSON() {
        return {
            channelId: this.channelId,
            userId: this.userId,
            content: this.content,
            img: this.img,
            code: this.code,
            time: this.time
        };
    }
}