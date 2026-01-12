import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store : Store, private router : Router)
  {
    
  }
  canActivate() : Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn => {
        if(isLoggedIn)
        {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
  
}
