export class Channel {
    name: string;
    nameCase: string;


    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.nameCase = obj ? obj.nameCase : '';

    }

    public toJSON() {
        return {
            name: this.name,
            nameCase: this.nameCase,
        };
    }
}