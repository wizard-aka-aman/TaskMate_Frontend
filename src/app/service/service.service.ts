import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // baseUrl = 'https://localhost:7165'
  baseUrl = 'https://wizardamantaskmate.netlify.app'
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
   return  this.http.get(`${this.baseUrl}/Item?name=`+username);
  }
  postItem(item:any){
    return this.http.post(`${this.baseUrl}/Item`,item);
  }
  deleteItem(id:number){
    return this.http.delete(`${this.baseUrl}/Item/`+id);
  }
  putItem(id:number , item :any){
    return this.http.put(`${this.baseUrl}/Item/`+id,item);
  }
  getAllFavo(username:string){
    return this.http.get(`${this.baseUrl}/Item/GetAllFavo?name=`+username);
  }
  addFavo(id:number){
    return this.http.get(`${this.baseUrl}/Item/AddFavorite/`+id);
  }
  RemoveFavo(id:number){
    return this.http.get(`${this.baseUrl}/Item/RemoveFavorite/`+id);
  }
  getHistory(username:string){
    return this.http.get(`${this.baseUrl}/History/GetAllHistory?name=`+username);
  }
  clearHistory(){
    return this.http.get(`${this.baseUrl}/History/ClearAllHistory`);
  }
  login(formdata : any){
    return this.http.post(`${this.baseUrl}/login` , formdata);
  }
  register(formdata : any){
    return this.http.post(`${this.baseUrl}/register` , formdata);
  }
  logout(){
    return this.http.get(`${this.baseUrl}/logout`);
  }

  postEmail(item:any){
    return this.http.post("${this.baseUrl}/api/Email/SendEmail",item);
  }
  postSemiRegister(item:any){
    return this.http.post("${this.baseUrl}/semiregister",item);
  }
  OTP(item:any){
    return this.http.post("${this.baseUrl}/getotp",item);
  }

  postJob(item : any){
    return this.http.post("${this.baseUrl}/api/Job/CreateScheduleJob",item);
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
