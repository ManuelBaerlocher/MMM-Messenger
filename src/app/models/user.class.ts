export class User {
    name: string;
    id: string;
    email: string;
    isOnline: boolean;
  length: number;


    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.id = obj ? obj.id : '';
        this.email = obj ? obj.email : '';
        this.isOnline = obj ? obj.isOnline : '';
    }

    public toJSON() {
        return {
            name: this.name,
            id: this.id,
            email: this.email,
            isOnline: this.isOnline
        };
    }
}