import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserserviceService } from '../userservice.service';
import { selectUserId } from '../store/auth/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelBooking } from '../HotelBooking';
import { FooterComponent } from "../footer/footer.component";
import { FlightBooking } from '../FlightBooking';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
paymentForm!: FormGroup;

guestCount : number = 0;
userId : any;

roomCount : number = 0;

hotelId : any;
checkIn : any;
checkOut : any;
perNightPrice : any;
diffDays : any;
total : number = 0;
flight_total : any;
flight_Id : any;
flight_date : any;
flight_price : any;
flight_time : any;
flight_name : any;

type : string = "hotel";
constructor(private fb : FormBuilder,private store : Store, private userservice : UserserviceService, private route : Router, private activeRoute : ActivatedRoute)
{
    this.paymentForm = this.fb.group({
      fname : ['', Validators.required],
      lname : ['', Validators.required],
      email : ['', Validators.required],
      check_in : ['', Validators.required],
      check_out : ['', Validators.required],
      roomtype : ['Please Select',Validators.required],
      NoGuest : ['', Validators.required],
      NoRooms : ['', Validators.required],
      cardUname : ['', Validators.required],
      cardNo : ['', Validators.required],
      cardEmail : ['', Validators.required],
      expDate : ['', Validators.required],
      code : ['', Validators.required]

    })



}

ngOnInit()
{
  this.store.select(selectUserId).subscribe(id =>{
      this.userId=id;
  })

  this.activeRoute.queryParams.subscribe(params => {
    this.type = params['type'],
    this.hotelId = params['hotelId'],
    this.checkIn = params['checkInDate'],
    this.checkOut = params['checkOutDate']
  })


  this.activeRoute.queryParams.subscribe(params =>{
    this.type = params['type'],
    this.flight_Id = params['flightId'],
    this.flight_date = params['date'],
    this.flight_time = params['time'],
    this.flight_price = params['price'],
    this.flight_name = params['airline']
  })
  this.userservice.getUserById(this.userId).subscribe({
    next : (data)=> {
      this.paymentForm.patchValue({
        fname : data[0].first_name,
        lname : data[0].last_name,
        email : data[0].email,
        check_in : this.checkIn,
        check_out : this.checkOut

      })
    }
  })

  this.userservice.getFilteredHotelDetails(this.hotelId).subscribe({
    next : (data) => {this.perNightPrice = data[0].price_usd},
    error : (err)=> {console.log(err)},
    complete : () => {console.log("Get Hotel Price Complete!")}
  })

 

}

ngDoCheck()
{
  let flight_discount = this.flight_price * 0.10;
  this.flight_total = ((this.guestCount * this.flight_price)+(this.roomCount * (this.flight_price/2)))-flight_discount;
  this.checkIn=this.paymentForm.get('check_in')?.value;
  this.checkOut=this.paymentForm.get('check_out')?.value;

  let discount = this.perNightPrice * 0.10;
  this.total= (this.getDaysBetweenDates() * this.perNightPrice) - discount;

  

}
GuestDec(){
  if(this.guestCount<=0)
  {
    this.guestCount=0
  }
  else{
    this.guestCount--;
  }
}

GuestInc(){
  this.guestCount++;
}

RoomDec(){
  if(this.roomCount<=0)
  {
    this.roomCount=0
  }
  else{
    this.roomCount--;
  }
}

RoomInc(){
  this.roomCount++;
}

getDaysBetweenDates(): number {
  if (!this.checkIn || !this.checkOut) return 0;

  const start = new Date(this.checkIn);
  const end = new Date(this.checkOut);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}


addBooking()
{
  let UserName = this.paymentForm.get('fname')?.value + this.paymentForm.get('lname')?.value;
  let userEmail = this.paymentForm.get('email')?.value;
  let room  = this.paymentForm.get('roomtype')?.value;
  let Check_In_Date = this.paymentForm.get('check_in')?.value;
  let Check_Out_Date = this.paymentForm.get('check_out')?.value;
  let Card_User = this.paymentForm.get('cardUname')?.value;
  let Card_Number = this.paymentForm.get('cardNo')?.value;
  let Card_User_Email = this.paymentForm.get('cardEmail')?.value;
  let exp_Date = this.paymentForm.get('expDate')?.value;
  let Security_Code = this.paymentForm.get('code')?.value;
  let total_Nights = this.getDaysBetweenDates();
  
  let obj = new HotelBooking(this.userId,this.hotelId,UserName,userEmail,room,this.guestCount,this.roomCount,Check_In_Date,Check_Out_Date,Card_User,Card_Number,Card_User_Email,exp_Date,Security_Code,total_Nights,this.perNightPrice,this.total);

  this.userservice.addHotelBookings(obj).subscribe({
    next : (data)=> {console.log(data)},
    error : (err) => {console.log(err)},
    complete : () => {console.log("Add Booking Complete!")}
  })
}


addFlightBooking()
{
  let UserName = this.paymentForm.get('fname')?.value + this.paymentForm.get('lname')?.value;
  let userEmail = this.paymentForm.get('email')?.value;
  let Card_User = this.paymentForm.get('cardUname')?.value;
  let Card_Number = this.paymentForm.get('cardNo')?.value;
  let Card_User_Email = this.paymentForm.get('cardEmail')?.value;
  let exp_Date = this.paymentForm.get('expDate')?.value;
  let Security_Code = this.paymentForm.get('code')?.value;

  let obj = new FlightBooking(this.userId,this.flight_Id,UserName,userEmail,this.flight_name,this.guestCount,this.roomCount,this.flight_date,this.flight_time,Card_User,Card_Number,Card_User_Email,exp_Date,Security_Code,this.flight_price,this.flight_total);


  this.userservice.addFlightBooking(obj).subscribe({
    next : (data)=> {console.log(data)},
    error : (err)=> {console.log(err)},
    complete : ()=> {console.log("Flight Booking Completed")}
  })
}

}


