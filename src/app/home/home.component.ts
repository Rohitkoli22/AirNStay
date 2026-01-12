import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedOption: string = 'hotels'; 
  searchForm!: FormGroup;
  flightsForm!: FormGroup;
  packagesForm!: FormGroup;
  
  

 constructor(private fb: FormBuilder, private dataservice : DataServiceService, private router : Router) {
  this.searchForm = this.fb.group({
      destination: [''],
      checkIn: [''],
      checkOut: [''],
      guests: ['']
    });

    this.flightsForm = this.fb.group({
      from: [''],
      to: [''],
      departure: [''],
      return: ['']
    });

    this.packagesForm = this.fb.group({
      destination: [''],
      startDate: [''],
      endDate: [''],
      travelers: ['']
    });
 }

 getHotels()
 {
  let finalDest = this.searchForm.get('destination')?.value;
  let InDate = this.searchForm.get('check_in')?.value;
  let OutDate = this.searchForm.get('check_out')?.value;
  this.router.navigate(['/hotels'], {
    queryParams: { dest: finalDest, indate: InDate, outdate: OutDate }
  });
 }

 getFlights()
 {
  let depart = this.flightsForm.get('departure')?.value;
  let arv = this.flightsForm.get('arrival')?.value;
  let depart_date = this.flightsForm.get('departure-date')?.value;
  let pass = this.flightsForm.get('passengers')?.value;

  this.router.navigate(['/flights'], { 
    queryParams : {departure : depart, arrival : arv, departure_date : depart_date, passengers : pass}
  });
 }

 getPackages()
 {
  let dest = this.packagesForm.get('destination')?.value;
  let travel_date = this.packagesForm.get('travel-dates')?.value;
  let trvpass = this.packagesForm.get('travelers')?.value;

  this.router.navigate(['/packages'], {
    queryParams : {destination : dest, tdate : travel_date, tpass : trvpass}
  });


 }
}
