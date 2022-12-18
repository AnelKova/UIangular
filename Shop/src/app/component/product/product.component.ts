import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList:any ;
  public filterCategory:any;
  public totalcartitem:number=0;
  searchKey:string='';
  public searchTerm :string='';
  public fullName:string="";
  public role!: string;


  constructor(private api:ProductService,private cartService:CartService,private router:Router,private auth:AuthService,
    private userStore:UserStoreService )  { }

  ngOnInit(): void {
    this.api.getProduct().
    subscribe(res=>{
      this.productList=res;
      this.filterCategory=res;
      // test over my api 
      this.api.getProducts().
      subscribe(val=>{
        this.productList=val;
       
        
      })

      this.productList.forEach((a:any) => {
        if(a.category==="women's clothing" || a.category=== "men's clothing"){
          a.category='fashion'
        }
     Object.assign(a,{qantity:1,total:a.price})       
      });

    });
    this.cartService.getProducts().
    subscribe(res=>{
    this.totalcartitem=res.length;
    });
    
    this.cartService.search.subscribe(val =>{
    this.searchKey=val;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken= this.auth.getFullNameFromToken();
      this.fullName=val || fullNameFromToken;
      

    });
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken= this.auth.getRoleFromToken();
      this.role=val || roleFromToken; 
    });

   

  }
  addToCart(product:any){
  this.cartService.addToCart(product)
  }
  allProducts(){
    this.router.navigate(['product'])
    }
    
  logOut(){
    this.auth.signOut();
  }

  search(event:any){
  this.searchTerm= (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.cartService.search.next(this.searchTerm);
  }

  filter(category:string){
  this.filterCategory=this.productList.
  filter((a:any)=>{
     if(a.category==category || category==''){
      return a;
     }
  })
  }
  uploadImage(){
    
  }
}
 