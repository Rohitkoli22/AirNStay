import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {

  Hotels$: any[] = [];
  allHotels: any[] = [];
  receivedData!: any;
  UserReviews! : any[];
  searchHotel!: FormGroup;
  searchFilter!: FormGroup;

  priceRange: number[] = [130, 1000]; 

  constructor(
    private userservice: UserserviceService,
    private route: Router,
    private fb: FormBuilder,
    private dataservice: DataServiceService,
    private activeRoute: ActivatedRoute
  ) {

    this.searchHotel = this.fb.group({
      destination: [''],
      check_in: [''],
      check_out: ['']
    });

    this.searchFilter = this.fb.group({
      wifi: [false],
      pool: [false],
      gym: [false],
      restaurant: [false],
      spa: [false],
      parking: [false],
      beach: [false],
      bar: [false],
      five_star: [false],
      four_star: [false],
      three_star: [false]
    });
  }

  ngOnInit() {

    // Load hotels first
    this.loadHotels();

    // Receive external form data
    // this.dataservice.currentFormData.subscribe((data) => {
    //   this.receivedData = data;
    //   this.applyFilters();
    // });

    // Patch query params properly
    this.activeRoute.queryParams.subscribe(params => {
      this.searchHotel.patchValue({
        destination: params['dest'] || '',
        check_in: params['indate'] || '',
        check_out: params['outdate'] || ''
      });

      this.applyFilters();
    });


    

  }

  loadHotels() {
    this.userservice.getHotelDetails().subscribe({
      next: (data) => {
        this.allHotels = data;
        this.Hotels$ = data;

        
        this.applyFilters();
      },
      error: (err) => console.error(err)
    });
  }

  GotoHotelDetails(Id : string) {
    let checkIn = this.searchHotel.get('check_in')?.value;
    let checkOut = this.searchHotel.get('check_out')?.value;
    this.route.navigate(["/hotel-details"], {
      queryParams : {id : Id, Indate : checkIn, Outdate : checkOut}
    });
  }

  FilteredHotels() {
    this.applyFilters();
  }

  private applyFilters() {

    if (!this.allHotels || this.allHotels.length === 0) return;

    const destination = this.searchHotel.get('destination')?.value?.toLowerCase().trim() || '';

    const selectedAmenities: string[] = [];
    Object.keys(this.searchFilter.controls).forEach(key => {
      if (this.searchFilter.get(key)?.value === true) {
        selectedAmenities.push(key.toLowerCase());
      }
    });

    const filtered = this.filterHotelData(destination, selectedAmenities, this.priceRange);
    this.Hotels$ = filtered;
  }

  filterHotelData(destination: string, selectedAmenities: string[], priceRange: number[]) {

    return this.allHotels.filter(hotel => {

      const amenities = hotel.itinerary.map((a: string) => a.toLowerCase());
      const price = hotel.price_usd;
      const city = hotel.city.toLowerCase();
      const country = hotel.country.toLowerCase();

      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      const destinationMatch =
        !destination || city.includes(destination) || country.includes(destination);

      const amenitiesMatch =
        selectedAmenities.length === 0 ||
        selectedAmenities.some(a => amenities.includes(a));

      if (!destination && selectedAmenities.length === 0) {
        return priceMatch;
      }

      return destinationMatch && amenitiesMatch && priceMatch;
    });
  }

  // For two price text inputs
  onPriceChange(event: Event, index: number) {
    const val = Number((event.target as HTMLInputElement).value);
    this.priceRange[index] = val;

    if (this.priceRange[0] > this.priceRange[1]) {
      [this.priceRange[0], this.priceRange[1]] = [this.priceRange[1], this.priceRange[0]];
    }
  }

  getReviewsById(id: string)
  {
    this.userservice.getFilteredReviews(id).subscribe({
      next : (data) => {this.UserReviews=data},
      error : (err) => {console.log(err)},
      complete : ()=> {console.log("Get Operation Complete!")}
    })
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
    return average;  
  }

}
