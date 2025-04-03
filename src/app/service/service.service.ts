import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { 
   
  }

  public itemId$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public name$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  public description$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  public completed$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  public notifyBefore$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  
  // public response$ : BehaviorSubject<string> = new BehaviorSubject<string>("");


  // isResponse(){
  //   return this.response$.getValue().length > 0;
  // }
  getAllItems(username:string){
   return  this.http.get("https://localhost:7165/Item?name="+username);
  }
  postItem(item:any){
    return this.http.post("https://localhost:7165/Item",item);
  }
  deleteItem(id:number){
    return this.http.delete("https://localhost:7165/Item/"+id);
  }
  putItem(id:number , item :any){
    return this.http.put("https://localhost:7165/Item/"+id,item);
  }
  getAllFavo(username:string){
    return this.http.get("https://localhost:7165/Item/GetAllFavo?name="+username);
  }
  addFavo(id:number){
    return this.http.get("https://localhost:7165/Item/AddFavorite/"+id);
  }
  RemoveFavo(id:number){
    return this.http.get("https://localhost:7165/Item/RemoveFavorite/"+id);
  }
  getHistory(username:string){
    return this.http.get("https://localhost:7165/History/GetAllHistory?name="+username);
  }
  clearHistory(){
    return this.http.get("https://localhost:7165/History/ClearAllHistory");
  }
  login(formdata : any){
    return this.http.post("https://localhost:7165/login" , formdata);
  }
  register(formdata : any){
    return this.http.post("https://localhost:7165/register" , formdata);
  }
  logout(){
    return this.http.get("https://localhost:7165/logout");
  }

  postEmail(item:any){
    return this.http.post("https://localhost:7165/api/Email/SendEmail",item);
  }
  postSemiRegister(item:any){
    return this.http.post("https://localhost:7165/semiregister",item);
  }
  OTP(item:any){
    return this.http.post("https://localhost:7165/getotp",item);
  }

  postJob(item : any){
    return this.http.post("https://localhost:7165/api/Job/CreateScheduleJob",item);
  }


  
  getUserName()
  {
    let token=localStorage.getItem('jwt');
    
    if(token!=null){
      const decodedToken:any = jwtDecode(token);
      const username = decodedToken.UserName;
      // console.log(decodedToken);
      
      return username;
    }
    return token;
  }

  getEmail()
  {
    let token=localStorage.getItem('jwt');
    
    if(token!=null){
      const decodedToken:any = jwtDecode(token);
      const Email = decodedToken.Email;
      // console.log(decodedToken);
      
      return Email;
    }
    return token;
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('jwt');
    const isuserName = this.getUserName();


    if (token ) {
      // Additional validation logic can be added here 
      if(isuserName != null){
        return true;
      }
      return false;
    } else {
      if(token){
        location.reload();
      }
      localStorage.removeItem("jwt");
      return false;
    }
}
}
