export class Post {
    userId: string;
    userName: string;
    userImg: string;
    content: string;
    img: string;
    code: string;
    time: number;
    date:string;




    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.userImg = obj ? obj.userImg : '';
        this.content = obj ? obj.content : '';
        this.img = obj ? obj.img : '';
        this.code = obj ? obj.code : '';
        this.time = obj ? obj.time : '';
        this.date = obj ? obj.date : '';

    }

    public toJSON() {
        return {
            userId: this.userId,
            userName: this.userName,
            userImg: this.userImg,
            content: this.content,
            img: this.img,
            code: this.code,
            time: this.time,
            date: this.date
        };
    }
}