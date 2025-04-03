import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-pagenotfound',
  imports: [RouterLink],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {

  ServiceSrv = inject(ServiceService);
  username :string =""; 
  constructor(){
   this.username = this.ServiceSrv.getUserName();
  }
}
