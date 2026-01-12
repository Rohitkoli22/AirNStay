import { Component } from '@angular/core';
import { SupportTicket } from '../SupportTicket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  FAQs! : any[];
  supportForm! : FormGroup;
  constructor(private userservice : UserserviceService, private fb : FormBuilder) {
    this.supportForm = this.fb.group({
      fname : ['', Validators.required],
      email : ['', Validators.required],
      subject : ['', Validators.required],
      message : ['', Validators.required]
    })
  }

  ngOnInit()
  {
    this.userservice.getFAQs().subscribe({
      next : (data: any[])=> {this.FAQs=data},
      error : (err: any)=> {console.log(err)},
      complete : ()=> console.log("FAQ Get Operation Complete!")
    })
  }

  addSupportTicketData()
  {
    alert("hi")
   let user_name = this.supportForm.get('fname')?.value;
   let user_email = this.supportForm.get('email')?.value;
   let issue_subject = this.supportForm.get('subject')?.value;
   let issue_message = this.supportForm.get('message')?.value;

   let newObj = new SupportTicket(user_name,user_email,issue_subject,issue_message);

   this.userservice.saveSupportTicketData(newObj).subscribe({
    next : (data)=> {console.log("Support Data adding"+data)},
    error : (err)=> {console.log(err)},
    complete : ()=> console.log("Support Ticket Data adding Operation Successfull")
   })

   this.supportForm.reset();

  }
}
