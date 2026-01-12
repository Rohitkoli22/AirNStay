import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserserviceService } from '../userservice.service';
import { logout } from '../store/auth/user.actions';
import { Router } from '@angular/router';
import { selectUserId } from '../store/auth/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
selectedOption: string = 'hotels';
UserDetails!: any[];
userId : any;

role : string = 'admin';
constructor(private store : Store, private userservice : UserserviceService, private route : Router)
{

}

ngOnInit()
{
  this.store.select(selectUserId).subscribe(id => {
    this.userId = id;
  })

  this.userservice.getUserById(this.userId).subscribe({
    next : (data) => {this.UserDetails=data},
    error : (err) => {console.log(err)},
    complete : () => {console.log("Get Operation Complete!")}
  })
}
SayId() {
  alert(this.userId);
}

LogOut()
{
  this.store.dispatch(logout());

  localStorage.removeItem('user');
  this.route.navigate(['/home']);
  
}

}
