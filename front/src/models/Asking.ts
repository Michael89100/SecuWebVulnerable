export default class Asking{
    title?: string;
    description?: string;
    mentor_id?: string;
    user_id?: string
    start_date?: string;
    state?: boolean
    end_date?: string;

    constructor(){
        this.title = ""
        this.description = ""
        this.mentor_id = ""
        this.start_date = ""
    }
}