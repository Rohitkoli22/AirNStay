import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FlightsComponent } from './flights/flights.component';
import { PackagesComponent } from './packages/packages.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { auditTime } from 'rxjs';
import { authReducer } from './store/auth/user.reducer';


export function localStorageSyncReducer(reducer: any):any {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true
  })(reducer);
}

const metaReducers : MetaReducer[] = [localStorageSyncReducer];


@NgModule({
  declarations: [
   AppComponent,
   HomeComponent,
   HotelDetailsComponent,
   HotelsComponent,
   FlightsComponent,
   SupportComponent,
   PackagesComponent,
   PaymentComponent,
   LoginRegisterComponent,
   FooterComponent,
   NavbarComponent,
   ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forRoot(
      {user : authReducer},
      { metaReducers }
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
