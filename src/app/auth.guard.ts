import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from './service/service.service';

export const authGuard: CanActivateFn = (route, state) => {

    
  const routes = inject(Router);
  const ServiceSrv = inject(ServiceService)

  const userName = ServiceSrv.getUserName();

  if(userName !=null){
    return true;
  }
  else{
    routes.navigateByUrl('/login');
    return false;
  }




  
};
