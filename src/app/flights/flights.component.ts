import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserserviceService } from '../userservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
   Flights$! : any[]; 
  AllFlights: any[] = [];
  searchFlights!: FormGroup;

  constructor(private userservice: UserserviceService, private fb: FormBuilder,private activeRoute: ActivatedRoute, private route : Router) {
    this.searchFlights = this.fb.group({
      trip_way: [''],
      from: [''],
      to: [''],
      departure: [''],
      return: [''],
      passengers: ['']
    });
  }

  ngOnInit() {
    this.loadFlights();

    
    this.searchFlights.get('trip_way')?.valueChanges.subscribe(value => {
      if (value === "One Way") {
        this.searchFlights.get('return')?.disable();
      } else {
        this.searchFlights.get('return')?.enable();
      }
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.searchFlights.patchValue({
        from : params['departure'] || '',
        to : params['arrival'] || '',
        departure : params['departure_date'] || '',
        passengers : params['passengers'] || ''

      });
      this.filterFlights();
    });
  }

  
  loadFlights() {
    this.userservice.getFlightDetails().subscribe({
      next: (data) => {
        this.AllFlights = data;
        this.Flights$=data; 
        this.filterFlights();
      },
      error: (err) => console.error("Error loading flights:", err),
      complete: () => console.log("Flight Get operation successful")
    });
  }

 
  filterFlights() {
    const from = this.searchFlights.get('from')?.value?.trim().toLowerCase() || '';
    const to = this.searchFlights.get('to')?.value?.trim().toLowerCase() || '';
    const depart = this.searchFlights.get('departure')?.value;
    const passengers = this.searchFlights.get('passengers')?.value;

    const filtered = this.AllFlights.filter(flight => {
      const matchesFrom = !from || flight.from_city.toLowerCase().includes(from);
      const matchesTo = !to || flight.to_city.toLowerCase().includes(to);
      const matchesDepart = !depart || flight.depart_date === depart;
      const matchesPassengers = !passengers || flight.seats_left >= passengers;
      return matchesFrom && matchesTo && matchesDepart && matchesPassengers;
    });

    this.Flights$=filtered; 
    console.log("Filtered Flights:", filtered);
  }

  GotoPayment(id : String,date : String, price : number, time : String, airline : String)
  {
    this.route.navigate(['/payment'],
      {
        queryParams : {
          type : "flight",
          flightId : id,
          date : date,
          price : price,
          time : time,
          airline : airline
        }
      }
    )
  }
}
