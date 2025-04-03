import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [CommonModule , DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  data : any = []; 
  isData : boolean = false;
  
  status : string = '';

  constructor(   private ServiceSrv : ServiceService ,private router : Router ) { 
    const username = this.ServiceSrv.getUserName();
    this.ServiceSrv.getHistory(username).subscribe((res:any)=>{ 
      this.data = [...res].reverse();
      this.status = res.status;
      if(this.data.length > 0){
        this.isData = true;
      }
      console.log(this.data);
      
    })
    
    
  }
  
  getHistoryy(){ 
    const username = this.ServiceSrv.getUserName();
    this.ServiceSrv.getHistory(username).subscribe((res:any)=>{ 
    this.data = [...res].reverse();
    if(this.data.length > 0){
      this.isData = true;
    }
    this.status = res.status;
  
  })
}
clear(){

    this.ServiceSrv.clearHistory().subscribe((res:any)=>{

    })
    this.getHistoryy();
    this.router.navigateByUrl("home");
}

}
