export class HotelBooking {
    Customer_Id! : string;
    Hotel_Id! : string;
    Customer_Name! : string;
    Customer_Email! : string;
    Room! : string;
    Guests! : number;
    Total_Rooms! : number;
    Check_In! : string;
    Check_Out! : string;
    Card_User! : string;
    Card_Number! : number;
    Card_User_Email! : string;
    Card_Expiry_Date! : string;
    Security_Code! : number;
    Total_Nights! : number;
    Per_Night_Price! : number;
    Total! : number;

    constructor(customerId : string, hotelId : string, CustomerName : string, CustomerEmail : string, Room : string, Guests : number, Total_Rooms : number, check_in : string, check_out : string, Card_User : string, CardNo : number, CardUserEmail : string, cardExp : string, SecurityCode : number, total_nights : number, perNights_Price : number, Total : number)
    {
        this.Customer_Id=customerId;
        this.Hotel_Id=hotelId;
        this.Customer_Name=CustomerName;
        this.Card_User_Email=CustomerEmail;
        this.Room = Room;
        this.Guests =Guests;
        this.Total_Rooms=Total_Rooms;
        this.Check_In=check_in;
        this.Check_Out=check_out;
        this.Card_User=Card_User;
        this.Card_Number=CardNo;
        this.Card_User_Email=CardUserEmail;
        this.Card_Expiry_Date=cardExp;
        this.Security_Code=SecurityCode;
        this.Total_Nights=total_nights;
        this.Per_Night_Price=perNights_Price;
        this.Total=Total;
    }
}