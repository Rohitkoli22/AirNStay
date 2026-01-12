import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserReview } from '../UserReview';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent {


  HotelDetails! : any;
  UserReviews! : any[];
  CurrentHotelId! : string;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  ReviewForm! : FormGroup;
  Hotel_average_rating! : number;
  checkIn! : Date;
  checkOut! : Date;




  constructor(private userservice : UserserviceService, private activeRoute : ActivatedRoute, private fb:FormBuilder, private route : Router)
  {
    this.ReviewForm = this.fb.group({
      Uname : ['', Validators.required],
      room : ['', Validators.required],
      review_text : ['', Validators.required],
      travel_month : ['', Validators.required]
    })
  }
  ngOnInit()
  {
      this.activeRoute.queryParams.subscribe(params => {
        this.CurrentHotelId = params['id']
        this.checkIn = params['Indate']
        this.checkOut = params['Outdate']
    })
    
    this.userservice.getFilteredHotelDetails(this.CurrentHotelId).subscribe({
      next : (data)=> {this.HotelDetails=data},
      error : (err)=> {console.log(err)},
      complete : ()=> {console.log("Get operation complete!")}

    })
    
    
    this.getReviews(); 
    this.loadMap();
    
      
  }


  loadMap(): void {
    // Default location: Taj Hotel, Pune
    const location = { lat: 18.5204, lng: 73.8567 };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: location,
      zoom: 14,
    });

    new google.maps.Marker({
      position: location,
      map: map,
      title: 'Taj Hotel, Pune',
    });
  }


  averageRating()
  {
    let n=this.UserReviews.length;
    if(n==0) return 0;
    let sum = 0;
    
    for(let i=0;i<n;i++)
    {
      sum+=this.UserReviews[i].rating;
    }

    let average = sum/n;

    if(average<1)
    {
      return 0;
    }
    this.Hotel_average_rating=average;
    return average;  
  }

  getTotalRating()
  {
    let size = this.UserReviews.length;
    let sum = 0;
    for(let i=0;i<size;i++)
    {
      sum+=this.UserReviews[i].rating;
    }

    return sum;
  }
  getEachStarAvg(star : number)
  {
      let total = this.UserReviews.length;
      if(total == 0) return 0; 
      let cntStar = 0;
      for(let i=0;i<total;i++)
      {
        if(this.UserReviews[i].rating === star)
        {
          cntStar++;
        }
      }

      let avg = (cntStar/total) * 100;
      if(avg < 1)
      {
        return 0;
      }

      return avg;
  }



  setRating(value: number) {
    this.rating = value;
  }

  getReviews()
  {
    this.userservice.getFilteredReviews(this.CurrentHotelId).subscribe({
      next : (data) => {this.UserReviews=data,  this.Hotel_average_rating=this.averageRating();
        
        this.UpdateAvg();
      },
      error : (err) => {console.log(err)},
      complete : ()=> {console.log("Get Operation Complete!")}
    })
    
    
   
   
    this.averageRating();

  }

  UpdateAvg()
  {
    this.userservice.updateAverageRating(this.CurrentHotelId, this.Hotel_average_rating)
    .subscribe({
      next: (data) => {console.log(data)},
      error: (err) => console.log(err),
      complete: () => console.log("PUT Operation Complete")
    });
  }

  addReview()
  {
      let Name = this.ReviewForm.get('Uname')?.value;
      let Room =this.ReviewForm.get('room')?.value;
      let Month = this.ReviewForm.get('travel_month')?.value;
      let DetailedReview = this.ReviewForm.get('review_text')?.value;

      alert(this.ReviewForm.get('Uname')?.value);

      let newObj = new UserReview(this.rating,this.CurrentHotelId,Name,Room,Month,DetailedReview);

      this.userservice.addReviewToDB(newObj).subscribe({
        next : (data)=> {console.log(data)},
        error : (err)=> {console.log(err)},
        complete : ()=> {console.log("Post Operation Complete!")}
      });

      this.ReviewForm.reset();
      this.rating=0;

      this.getReviews();
  }

  ResetForm()
  {
    this.ReviewForm.reset();
    this.rating=0;
  }

  GotoPayment(){
    // let roomtype = this.ReviewForm
      this.route.navigate(['/payment'], {
        queryParams : {type : "hotel",hotelId : this.CurrentHotelId, checkInDate: this.checkIn, checkOutDate : this.checkOut}
      })
  }
}
