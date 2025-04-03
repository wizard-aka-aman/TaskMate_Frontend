import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core'; 
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import {   ToastrService } from 'ngx-toastr';  
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';
@Component({
  selector: 'app-home',
  imports: [CommonModule ,RouterLink, FormsModule ,FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  
  isComplete : boolean = true;
data : any[] = []; 
isEmpty : boolean = true;
isGetData : boolean = false;
search :string = ''; 
constructor( private router: Router,private route: ActivatedRoute , private ServiceSrv : ServiceService, private toastr: ToastrService    ) { 
  this.isGetData = true;
  const username = this.ServiceSrv.getUserName();
  console.log(username);
  this.ServiceSrv.getAllItems(username).subscribe((res:any)=>{
    this.data = res;
    if(this.data.length>0){
      this.isEmpty = false;
    }
    this.isGetData = false;
    console.log(res); 
  })
  this.router.navigate([], {
    queryParams: {name: username }, // Set parameters
    queryParamsHandling: 'merge' // Merge with existing params
  });
  
}
 

getAllItems(){
  const user :string= this.ServiceSrv.getUserName(); 
  this.isGetData = true;
  this.ServiceSrv.getAllItems(user).subscribe((res:any)=>{
    this.data = res;
    if(this.data.length>0){
      this.isEmpty = false;
    }
    this.isGetData = false;
    console.log(res);
    
  })
}
delete(id:number){
  this.isComplete = false;
  const isconfirm = confirm("You Complete this Task?");
  if(isconfirm){

    this.ServiceSrv.deleteItem(id).subscribe((res:any)=>{
      console.log(res);
      this.getAllItems();
      this.isComplete = true;
      if(this.isComplete){
        this.toastr.success('Item deleted successfully', 'Success');
      }
    })
  }
}
edit(id:number){
  this.ServiceSrv.putItem(id,this.data).subscribe((res:any)=>{
    console.log(res);
   
  })
}
getId(id:number , name:string,description:string,completed:string,notifyBefore:string){
   this.ServiceSrv.itemId$.next(id); 
   this.ServiceSrv.name$.next(name); 
   this.ServiceSrv.description$.next(description); 
   this.ServiceSrv.completed$.next(completed); 
   this.ServiceSrv.notifyBefore$.next(notifyBefore); 
} 


favorite(id:number){
  this.ServiceSrv.addFavo(id).subscribe((res:any)=>{
    console.log(res);    
    this.getAllItems();
  })
}
Removefavorite(id:number){
  this.ServiceSrv.RemoveFavo(id).subscribe((res:any)=>{
    console.log(res);    
    this.getAllItems();
  })
}

 
}
