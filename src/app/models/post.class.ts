export class Post {
    userId: unknown;
    userName: unknown;
    userImg: unknown;
    content: string;
    img: string;
    code: string;
    time: number;
    date: string;
    postId: string;
    edit: string
    lastAnswer: string;
    answers: number;
    imgPath:string;




    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.userImg = obj ? obj.userImg : '';
        this.content = obj ? obj.content : '';
        this.img = obj ? obj.img : '';
        this.code = obj ? obj.code : '';
        this.time = obj ? obj.time : '';
        this.date = obj ? obj.date : '';
        this.postId = obj ? obj.postId : '';
        this.edit = obj ? obj.edit : '';
        this.lastAnswer = obj ? obj.lastAnswer : '';
        this.answers = obj ? obj.answers : '';
        this.imgPath = obj ? obj.imgPath : '';

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
            date: this.date,
            postId: this.postId,
            edit: this.edit,
            lastAnswer: this.lastAnswer,
            answers: this.answers,
            imgPath: this.imgPath,
        };
    }
}