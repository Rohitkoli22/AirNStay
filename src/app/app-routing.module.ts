import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { FlightsComponent } from './flights/flights.component';
import { PackagesComponent } from './packages/packages.component';
import { SupportComponent } from './support/support.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { AuthGuard } from './authguard/auth.guard';

const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'hotels', component: HotelsComponent},
    {path: 'flights', component: FlightsComponent},
    {path: 'packages', component: PackagesComponent},
    {path: 'support', component:SupportComponent},
    {path: 'login', component: LoginRegisterComponent},
    {path: 'hotel-details', component: HotelDetailsComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
