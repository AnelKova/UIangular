import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ProductToCreate } from 'src/app/interfaces/ProductToCreate';
import { Product } from 'src/app/interfaces/user.model.ts';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  [x: string]: any;

  public productList:any ;
  public filterCategory:any;
  public totalcartitem:number=0;
  public searchKey:string='';
  public searchTerm :string='';
  public fullName:string="";
  public role!: string;
 
  public  productImage: any;
  public EditProductCode = '';
  public file!: File; // Variable to store file
  public progressvalue = 0;
  public modalService: any;
  public Result: any;
  progress:number=0;
  message!: string;
  isCreate!:boolean;
  name!:string;
  response!: {dbPath:''};
  product!:ProductToCreate;
  products:Product[]=[];
  price!:number;


  @Output() public onUploadFinished=new EventEmitter();
    
  constructor(private api:ProductService,private cartService:CartService,private router:Router,private auth:AuthService,
    private userStore:UserStoreService,private http:HttpClient )  { }

  ngOnInit(): void {
    this.isCreate=true;
  
    this.api.getProduct().
    subscribe(res=>{
      this.productList=res;
      this.filterCategory=res;
      // test over my api 
      this.api.getProducts().
      subscribe(val=>{
        this.products=val;
        
       
        
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
   // for upload
  onCreate = () => {
    this.productList={
      name:this.name,
      price:this.price,
      imgPath:this.response.dbPath

    }
      
  }
    
  uploadFinished = (event: any) => { 
    this.response = event; 
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7242/${serverPath}`; 
  }

  UploadImage(code: any, image: any) {
    this.open();
    this.productImage = image;
    this.EditProductCode = code;

}

RemoveImage(code:any, name:any){

}
ProceedUpload(){

}

open() {
  this.modalService.open(this['addview'], { ariaLabelledBy: 'modal-basic-title' }).result.then((_result: any) => {
  }, (_reason: any) => {
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
onchange(event: any) {
  let reader = new FileReader();
  this.file = event.target.files[0];
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = () => {
    this.productImage = reader.result;
  };

}
uploadFile=(files:any)=>{
  if(files.length===0){
    return;
  }
  let fileToUpload=<File>files[0];
  const formData=new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);

  this.http.post('https://localhost:7242/api/Images',formData,{reportProgress:true,observe:'events'})
  .subscribe({
    next:(event)=>{
      if(event.type===HttpEventType.UploadProgress)
      this.progress=Math.round(100*event.loaded /event.total! );
      else if (event.type===HttpEventType.Response){
        this.message='Upload success';
        this.onUploadFinished.emit(event.body);
      }
    },
    error:(err:HttpErrorResponse)=>console.log(err)
  });
}

}
