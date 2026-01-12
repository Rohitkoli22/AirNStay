export class FlightBooking {
    customer_Id! : string;
    flight_Id! : string;
    customer_Name! : string;
    customer_Email! : string;
    flight_Name! : string;
    total_Adults! : number;
    total_childs! : number;
    flight_Date! : string;
    flight_Time! : string;
    card_User! : string;
    card_Number! : number;
    card_Email_User!: string;
    card_Expiry_Date! : string;
    security_Code! : string;
    flight_price! : number;
    total! : number;


    constructor(customer_Id : string, flight_Id: string,customer_Name : string,customer_Email : string,flight_Name : string,total_Adults : number,total_childs : number,flight_Date : string,flight_Time : string,card_User : string,card_Number : number, card_Email_User: string,card_Expiry_Date : string,security_Code : string,flight_price : number,total : number)
    {
        this.customer_Id = customer_Id;
        this.flight_Id = flight_Id;
        this.customer_Name = customer_Name;
        this.customer_Email = customer_Email;
        this.flight_Name = flight_Name;
        this.total_Adults = total_Adults;
        this.total_childs = total_childs;
        this.flight_Date = flight_Date;
        this.flight_Time = flight_Time;
        this.card_User = card_User;
        this.card_Number = card_Number;
        this.card_Email_User = card_Email_User;
        this.card_Expiry_Date = card_Expiry_Date;
        this.security_Code = security_Code;
        this.flight_price = flight_price;
        this.total = total;
    }

}