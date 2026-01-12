import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
 PackagesDetails! : any[];

  constructor(private userservice : UserserviceService, private activeroute : ActivatedRoute) {}

  ngOnInit(){
    this.userservice.getPackagesDetails().subscribe({
      next : (data) => {this.PackagesDetails=data},
      error : (err) => console.log(err),
      complete : () => console.log("Package Details Get Operation Successfull!")
    });


    this.activeroute.queryParams.subscribe(params => {
        
    });

  }
}
