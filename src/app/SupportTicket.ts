export class SupportTicket{
    fname! : string;
    email! : string;
    subject! : string;
    message! : string;

    constructor(fname : string, email : string, subject : string, message : string)
    {
        this.fname=fname;
        this.email=email;
        this.subject=subject;
        this.message=message;
    }

}