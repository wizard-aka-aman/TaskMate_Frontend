import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {

   favoId :number = 0;
data : any[] = []; 
isGetData : boolean = false;
constructor(   private ServiceSrv : ServiceService  ) { 
  const username = this.ServiceSrv.getUserName();
  this.isGetData = true;
  this.ServiceSrv.getAllFavo(username).subscribe((res:any)=>{
    this.data = res;
    this.isGetData = false;
    console.log(res);
    
  })
 


}


}
