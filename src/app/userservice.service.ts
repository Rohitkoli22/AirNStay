import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Users from './Users';
import { SupportTicket } from './SupportTicket';
import { HttpClient } from '@angular/common/http';
import { UserReview } from './UserReview';
import { HotelBooking } from './HotelBooking';
import { FlightBooking } from './FlightBooking';


@Injectable({
   providedIn: 'root'
})
export class UserserviceService {

   constructor(private http: HttpClient) { }
   adduserurl: string = "http://localhost:3000/Users";
   addUser(user: Users): Observable<any> {
      return this.http.post(this.adduserurl, user);
   }

   hotelurl: string = "http://localhost:3000/Hotels";
   getHotelDetails(): Observable<any[]> {
      return this.http.get<any[]>(this.hotelurl)
   }

   getFilteredHotelDetails(id: string): Observable<any> {
      return this.getHotelDetails().pipe(
         map((hotels: any[]) => hotels.filter(hotel => hotel.id === id))
      );
   }

   flighturl: string = "http://localhost:3000/flights";
   getFlightDetails(): Observable<any[]> {
      return this.http.get<any[]>(this.flighturl);
   }

   packagesurl: string = "http://localhost:3000/packages";
   getPackagesDetails(): Observable<any[]> {
      return this.http.get<any[]>(this.packagesurl);
   }

   FAQurl: string = "http://localhost:3000/faqs";
   getFAQs(): Observable<any> {
      return this.http.get(this.FAQurl);
   }

   SupportTicketurl: string = "http://localhost:3000/SupportTicket";
   saveSupportTicketData(obj: SupportTicket): Observable<any> {
      return this.http.post(this.SupportTicketurl, obj);
   }

   ReviewsUrl: string = "http://localhost:3000/reviews";
   getReviews(): Observable<any[]> {
      return this.http.get<any[]>(this.ReviewsUrl);
   }

   getFilteredReviews(id: string): Observable<any[]> {
      return this.getReviews().pipe(
         map((reviews: any[]) => reviews.filter(review => review.hotelId === id))
      )
   }

   updateAverageRating(id: string, rating: number): Observable<any> {
      const url = `http://localhost:3000/Hotels/${id}`;
      return this.http.patch(url, { average_rating: rating }); 
   }

   addReviewToDB(obj: UserReview): Observable<any> {
      return this.http.post(this.ReviewsUrl, obj);
   }


   userUrl = "http://localhost:3000/Users"
   getUserData(): Observable<any[]> {
      return this.http.get<any[]>(this.userUrl);
   }

   getFilteredUser(userEmail: string): Observable<any> {
      return this.getUserData().pipe(
         map((Users: any[]) => Users.filter(user => user.email === userEmail))
      );
   }
   getUserById(id: string): Observable<any> {
      return this.getUserData().pipe(
         map((Users: any[]) => Users.filter(user => user.id === id))
      );
   }

   HotelBookingURL = "http://localhost:3000/HotelBooking";
   addHotelBookings(obj : HotelBooking) : Observable<any>
   {
      return this.http.post(this.HotelBookingURL, obj);
   }

   FlightBookingURL = "http://localhost:3000/FlightBooking";
   addFlightBooking(obj : FlightBooking) : Observable<any>
   {
      return this.http.post(this.FlightBookingURL, obj);
   }
}
