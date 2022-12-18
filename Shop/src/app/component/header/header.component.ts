import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalcartitem:number=0;
  searchKey:string='';
  public searchTerm :string='';
  

  constructor(private auth:AuthService,private cartService:CartService) { }

  ngOnInit(): void {
  this.cartService.getProducts().
  subscribe(res=>{
  this.totalcartitem=res.length;
  })
  }

  logOut(){
    this.auth.signOut();
  }
  search(event:any){
    this.searchTerm= (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    
    }
}
