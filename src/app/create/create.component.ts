import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import {   ToastrService } from 'ngx-toastr'; 
import {   Router } from '@angular/router';
@Component({
  selector: 'app-create',
  imports: [FormsModule ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  ServiceSrv = inject(ServiceService);
  isComplete : boolean = true;
  data :  any = {
    "name" : '',
    "description" :   '', 
    "userName" : this.ServiceSrv.getUserName(),
    "completed" : '',
    "notifyBefore" : '',
  };

  emailItemDto :any ;
  
 
  constructor(private router: Router , private toastr: ToastrService){
    
    
  }

  getSubmit(){
    this.emailItemDto = {
      Subject: this.data.name,
      Body: this.data.description,
      Email : this.ServiceSrv.getEmail(),
      Completed : this.data.completed,
      NotifyBefore: this.data.notifyBefore
    };
    
    this.ServiceSrv.postJob(this.emailItemDto).subscribe({
      next:(res:any)=>{
        // this.toastr.success("Done " , "success")
        console.log(res);


        this.isComplete = false;
        this.ServiceSrv.postItem(this.data).subscribe({
          next:(res:any)=>{

            console.log(res);
            this.isComplete = true;
            if(this.isComplete){
              this.toastr.success('Success', `${this.data.name} is Created`);
              this.router.navigateByUrl("home");
            }
          },
          error:(err:any)=>{
            this.toastr.error(err.error, "Error");
            console.log(err);
          }
        })
    


      },
      error:(err:any)=>{
        this.toastr.error(err.error , "error")
        console.log(err);
      }

    })





  }
 
  

  
}