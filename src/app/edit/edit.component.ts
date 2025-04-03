import { Component, inject } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import {   ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  
  ServiceSrv = inject(ServiceService);
  itemId : number = 0;
   isComplete : boolean = true;
 data :  any = {
    "name" : '',
    "description" :   '',
    "userName" : this.ServiceSrv.getUserName(),
    "completed": '',
    "notifyBefore":''
  };
  constructor(private route : ActivatedRoute ,private router: Router , private toastr: ToastrService){
    this.ServiceSrv.itemId$.subscribe((role:number)=>{
      console.log(role);
      this.itemId = role;
    })
    this.ServiceSrv.name$.subscribe((role:string)=>{
      console.log(role);
      this.data.name = role;
    })
    this.ServiceSrv.description$.subscribe((role:string)=>{
      console.log(role);
      this.data.description = role;
    })
    this.ServiceSrv.completed$.subscribe((role:string)=>{
      console.log(role);
      this.data.completed = role;
    })
    this.ServiceSrv.notifyBefore$.subscribe((role:string)=>{
      console.log(role);
      this.data.notifyBefore = role;
    })
  }

  // get id form the Url  // method 1
  // ngOnInit() {
  //   this.route.paramMap.subscribe((params:any) => {
  //     this.itemId = Number(params.get('id'));
  //     console.log('Editing item with ID:', this.itemId);
  //   });
  // }

  // get id from the BehaviorSubject // method 2


    putSubmit(id:number){
      this.isComplete = false;
      this.ServiceSrv.putItem(id,this.data).subscribe((res:any)=>{
      console.log(res);
      this.isComplete = true;
      if(this.isComplete){
        this.toastr.success('Success', `${this.data.name} is Updated`);
        this.router.navigateByUrl("home");
      }
    })
  }
}
