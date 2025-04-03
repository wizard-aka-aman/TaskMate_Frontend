import { Component } from '@angular/core'; 
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink ,ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formvalue : FormGroup = new FormGroup({
    username : new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)]),
  })
   
  formData : any ;
  fromEmail : any;
  isCompleted :boolean = false ;
  constructor(private ServiceSrv : ServiceService,private toastr: ToastrService , private router : Router ) {

    const user = this.ServiceSrv.getUserName();
    if(user!= null){
     this.router.navigateByUrl('home')
    }
 
   }
  
   sendEmail(){
    this.formData = this.formvalue.value
    console.log("this.formData.email : "+this.formData.email); 
    localStorage.setItem("email" , this.formData.email) 
    this.ServiceSrv.postSemiRegister(this.formData).subscribe({
      next: (res:any) => {
        console.log("postSemiRegister()  heelo" , res);
        
        
        this.fromEmail = this.formvalue.value ;
        
        console.log("postSemiRegister k under"+this.fromEmail.email);
        this.isCompleted = true;
        this.ServiceSrv.postEmail(this.fromEmail).subscribe({
          next: (response:any) => {
            this.toastr.success("Email Send Successfully","Success"); 
            localStorage.setItem("username" , this.formData.username)
            localStorage.setItem("password" , this.formData.password)
            this.isCompleted = false;
            this.router.navigate(['/verify'], { queryParams: { email: this.fromEmail.email } });
          },
          error:(err:any)=>{
            console.log("postSemiRegister()  heelo" , err);
            
            this.toastr.success("Email Can't Send","Error");
          }
           
        })
      },
      error:(err:any)=>{
        this.toastr.error(err.error,"Error");
        console.log("err : " + err.error);
        
      }
      
    })
     
     
   }

  onSubmit(){
    this.formData = this.formvalue.value

  
    console.log(this.formData);
    this.ServiceSrv.register(this.formData).subscribe( { 
      next: (response:any) => {
        console.log('Register Successful', response); 
        this.toastr.success("Register Successfull" , "Success")
        localStorage.setItem("email" , response.email)
        localStorage.setItem("userName" , response.userName)
        this.sendEmail();
        console.log("formdata email  : "+this.formData.email);
        
        this.router.navigateByUrl('/verify')
      },
      error: (error) => {
        this.toastr.error(error.error , "Error")
        console.log(error.error);  
      }
    })
  }

}
