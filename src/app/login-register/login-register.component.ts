import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import Users from '../Users';


import { Store } from '@ngrx/store';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgStyle } from "../../../node_modules/@angular/common/index";
import { login } from '../store/auth/user.actions';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
 
})
export class LoginRegisterComponent {
  selectedOption: any = 'Sign-In';
SignUpForm! : FormGroup;
SignInForm! : FormGroup

constructor(private fb : FormBuilder, private userservice : UserserviceService, private store : Store, private activeRoute : ActivatedRoute, private route : Router)
{
  this.SignUpForm = this.fb.group({
    first_name : ['', Validators.required],
    last_name : ['', Validators.required],
    email : ['', Validators.required],
    password : ['', [Validators.required, Validators.minLength(8)]],
    role : ['user']
  });
  
  this.SignInForm = this.fb.group({
    logemail : ['', [Validators.required]],
    pwd : ['', [Validators.required, Validators.minLength(8)]]
  });
}

 
registerUser(){
  let fname = this.first_name;
  let lname = this.last_name;
  let user_email = this.SignUpForm.get('email')?.value;
  let user_pwd = this.SignUpForm.get('password')?.value;
  let role = this.role;

  let newObj = new Users(fname,lname,user_email,user_pwd,role);
  this.userservice.addUser(newObj).subscribe({
    next : (data)=> {alert("User data Added.")},
    error :(err)=> {alert(err)},
    complete : ()=> alert("operation Successfull.")
  })
}

obj! : any[];
getUser()
{
  let userEmail = this.SignInForm.get('logemail')?.value;
  
  this.userservice.getFilteredUser(userEmail).subscribe({
    next: (data)=> {this.obj=data},
    error : (err)=> {console.log(err)},
    complete : () => {console.log("Get email Operation Complete!")}
  })
  
}

Login()
{
  let userPass = this.SignInForm.get('pwd')?.value;
  this.getUser();
  let dbpass = this.obj[0].password;
  if(userPass === dbpass)
  {
    this.store.dispatch(login({userId : this.obj[0].id}))
    this.route.navigate(['/home']);
    
  }
}

get first_name()
{
  return this.SignUpForm.get('first_name')?.value;
}
get last_name()
{
  return this.SignUpForm.get('last_name')?.value;
}

get email()
{
  return this.SignUpForm.get('email');
}
get password()
{
  return this.SignUpForm.get('password');
}
get role()
{
  return this.SignUpForm.get('role')?.value;
}

get logemail()
{
  return this.SignInForm.get('logemail');
}
get pwd()
{
  return this.SignInForm.get('pwd');
}
}
