export class UserReview{
    rating!: number;
    hotelId! : string;
    userName! : string;
    roomName! : string;
    travelMonth! : string;
    detailedReview! : string;


    constructor(rating : number, hotelId : string, userName : string, roomName : string, travelMonth : string, detailedReview : string)
    {
        this.rating=rating;
        this.hotelId=hotelId;
        this.userName=userName;
        this.roomName=roomName;
        this.travelMonth=travelMonth;
        this.detailedReview=detailedReview;
    }
}