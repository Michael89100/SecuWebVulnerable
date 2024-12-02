export default class User{
    _id?:string;
    name?: string;
    firstname?: string;
    credit: number;
    mail?: string;
    pseudo?: string;
    password?: string;
    role?: string[];
    speciality: any[];
    comments: any[];
    averageNote?: number|string;
    token?: string;
    img_url?: string;

    constructor(){
        this.credit = 0
        this.speciality = []
        this.comments = []
    }
}
