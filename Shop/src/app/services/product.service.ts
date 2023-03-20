import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string='https://localhost:7242/api/Products';
  
  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<any>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProducts(){
    return this.http.get<any>((this.baseUrl));
  }
  UploadImage(inpudata:any){
    return this.http.post("https://localhost:7242/api/Products/Uploadimage",inpudata,{
      reportProgress:true,
      observe:'events'
    });
  }
}
