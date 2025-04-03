import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {

  formvalue : FormGroup = new FormGroup({
    Otp : new FormControl('', [Validators.required]),
    email : new FormControl(localStorage.getItem("email"))
  })
   
  formData : any ;
  formEmail: any ;

  fromRegister : any = {
    email : localStorage.getItem("email"), 
    username : localStorage.getItem("username"), 
    password : localStorage.getItem("password") 
  }
  constructor(private ServiceSrv : ServiceService,private toastr: ToastrService , private router : Router ) {
    
   }
  
  onSubmit(){
   this.formEmail = this.formvalue.value;
    console.log("this.fromRegister.value : "+this.formEmail.Otp);
    this.ServiceSrv.OTP(this.formEmail).subscribe( { 
      next: (response:any) => {
        console.log('OTP Response', response); 
        this.toastr.success(response.result , "Success")
        const naam = this.ServiceSrv.getUserName();
        
        this.ServiceSrv.register(this.fromRegister).subscribe( { 
          next: (response:any) => {
            console.log('Register Successful', response); 
            this.toastr.success("Register Successfull" , "Success")   
            const naam = this.ServiceSrv.getUserName();
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            this.router.navigate(['/login'], { queryParams: { name: naam } });
          },
          error: (error) => {
            this.toastr.error(error.error , "Error")
            console.log(error.error);  
          }
        })

 
      },
      error: (error) => {
        console.log(error);
        
        this.toastr.error(error.error.result , "Error")
        // console.log(error.error);  
      }
    })

  }

}
