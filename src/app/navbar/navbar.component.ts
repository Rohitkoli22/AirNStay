import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/auth/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private store : Store)
    {

    }

    IsUserLoggedIn()
    {
      let UserStatus;
      this.store.select(selectIsLoggedIn).subscribe(status => {
        UserStatus=status;
      } );
      return UserStatus;
    }
}
