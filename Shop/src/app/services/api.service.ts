import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getProduct() {
    throw new Error('Method not implemented.');
  }
  private baseUrl:string='https://localhost:7242/api/UserAuth';
 
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  
  }
}
