import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import {   ToastrService } from 'ngx-toastr';   
@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
formvalue : FormGroup = new FormGroup({
  userName: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)]),
})

formData : any ; 
constructor(private ServiceSrv : ServiceService ,private toastr: ToastrService , private router: Router){
 
}

ngOnInit(): void {
  const naam = this.ServiceSrv.getUserName();
  if(localStorage.getItem('jwt') && this.ServiceSrv.checkAuthentication()){
    this.router.navigate(['/home'], { queryParams: {  name: naam } });
  }
}

onSubmit(){
  this.formData = this.formvalue.value
  console.log(this.formData);
  this.ServiceSrv.login(this.formData).subscribe( { 
    next: (response:any) => {
      console.log('Login Successful', response);  
      this.toastr.success("Login Successfull" , "Success") 
      localStorage.setItem("jwt" , response.token) 
      const naam = this.ServiceSrv.getUserName();
      this.router.navigate(['/home'], { queryParams: { name: naam } });
    },
    error: (error) => {
      this.toastr.error(error.error , "Error")
      console.log(error.error); // "Invalid Credentials!!"
    }
  })
}

}
