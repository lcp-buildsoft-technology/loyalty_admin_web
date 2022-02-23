import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as $ from "jquery";
import { ModalModule } from "ng2-modal-module" ;
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,]);
declare var angular:any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  template: `
    <swiper>
      [slidesPerView]="3"
      [spaceBetween]="50"
      observer="true
      (swiper)="onSwiper($event)"
      (slideChange)="onSlideChange()"
      <ng-template swiperSlide>Slide 1</ng-template>
      <ng-template swiperSlide>Slide 2</ng-template>
      <ng-template swiperSlide>Slide 3</ng-template>
    </swiper>
  `,
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  public isActive:boolean = true;
  searchInput : string ='';
  westernArr = [];
  spicyArr = [];
  vegeterianArr = [];
  colddrinksArr = [];
  hotdrinksArr=[];
  halalArr=[];
  categoryArr=[]
  prodcatArr=[]
  productcatArr: string[] = [];

  showDiv = {
    All:false,
    Western:false,
    Spicy: false,
    Vegetarian: false,
    ColdDrinks: false,
    HotDrinks: false,
    Halal:false

  }
  message: any;
  productArr = [];
  allArr=[];
  public srch=[];
  constructor(private modalService: NgbModal, private http: HttpClient, private _compiler: Compiler,private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.productArr];
  }
  public product={
    _id:'',
    name:'',
    thumbnail: '',
    thumbnailType: '',
    description:'',
    price:'',
    outletid:''

     };
     public prodcat:any={
      _id:'',
      name:'',
      thumbnail: '',
      thumbnailType: '',
      description:'',
      price:'',
      categories:''
      
  
       };
     public western={
      _id:'',
      name:'',
      thumbnail: '',
      description:'',
      price:'',
  
       };
       public spicy={
        _id:'',
        name:'',
        thumbnail: '',
        description:'',
        price:'',
    
         };
         public vegeterian={
          _id:'',
          name:'',
          thumbnail: '',
          description:'',
          price:'',
      
           };
           public colddrinks={
            _id:'',
            name:'',
            thumbnail: '',
            description:'',
            price:'',
        
             };
             public hotdrinks={
              _id:'',
              name:'',
              thumbnail: '',
              description:'',
              price:'',
          
               };
               public halal={
                _id:'',
                name:'',
                thumbnail: '',
                description:'',
                price:'',
            
                 };
     public deleteproduct={
      _id:'',
      name:'',
      thumbnail: '',
      description:'',
      price:'',
  
       };
       public categories={
        categories:'',
        outletid:'',
         };

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/product']);
    } else {
      localStorage.removeItem('foo') 
    }
  
 
  this.Transferall();
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove();
    this.open(this.product);;
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  
    this.getCategory();
  }

  getCategory(){
    this.http.get('http://165.22.50.213:3001/getallcategory').subscribe((res:any) => {
    this.categoryArr=res['data']
    console.log( this.categoryArr)
  });
  }

Transfer(id:any){
  var name= $("#deletebtn_" + id).attr('name')+"";
  console.log(name);
  console.log(id)
  $("#product_name").val(id);
}

Transferall(){
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  this.product.outletid = moutlet._id;
  console.log(moutlet._id)
  this.productcatArr = []
  this.http.post('http://165.22.50.213:3001/getproduct',this.product).subscribe((res:any) => {
  
   
    console.log( res);
    console.log(res['data'])
      this.prodcatArr = res['data'] ;
      this.productcatArr = []
     
      for( var i=0 ; i<this.prodcatArr.length ; i++){
        this.prodcat={
          _id:'',
          name:'',
          thumbnail: '',
          thumbnailType: '',
          description:'',
          price:'',
          categories:''
          
           };
         
           this.prodcat._id =this.prodcatArr[i]['_id']
           this.prodcat.name =this.prodcatArr[i]['name']
          
           this.prodcat.thumbnail = new Buffer(this.prodcatArr[i]['thumbnail']['data']).toString('base64');
         
           this.prodcat.thumbnailType =this.prodcatArr[i]['thumbnail']['contentType']
          
           this.prodcat.description =this.prodcatArr[i]['description']
           this.prodcat.price =this.prodcatArr[i]['price']
     console.log(this.prodcat)
     this.productcatArr.push(this.prodcat);
     console.log(this.productcatArr)
      }
    
  });

}


Transfercategory(category:any){
  this.isActive=false;
  var name= $("#categorybtn_" + category).attr('name')+"";

console.log(category)
  $("#product_name").val(name);
  this.prodcat.categories = category
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
 this.prodcat.outletid = moutlet._id
  this.productcatArr = []
  this.categories.categories = this.prodcat.categories
  this.categories.outletid = this.prodcat.outletid
  console.log(this.prodcat.categories )
  this.http.post('http://165.22.50.213:3001/getcatproduct',this.categories).subscribe((res:any) => {
    
     this.prodcatArr = res['data']
    console.log(this.prodcatArr)
    this.productcatArr = []
    for( var i=0 ; i<this.prodcatArr.length ; i++){
      this.prodcat={
        _id:'',
        name:'',
        thumbnail: '',
        thumbnailType: '',
        description:'',
        price:'',
        categories:''
        
    
         };
       
         this.prodcat._id =this.prodcatArr[i]['_id']
         this.prodcat.name =this.prodcatArr[i]['name']
        
         this.prodcat.thumbnail = new Buffer(this.prodcatArr[i]['thumbnail']['data']).toString('base64');
       
         this.prodcat.thumbnailType =this.prodcatArr[i]['thumbnail']['contentType']
        
         this.prodcat.description =this.prodcatArr[i]['description']
         this.prodcat.price =this.prodcatArr[i]['price']
   console.log(this.prodcat)
   this.productcatArr.push(this.prodcat);
    }
 
      
  });
}

  DeleteProduct(product:any){
    var id= $("#product_name").val();
    console.log(id)
    this.product._id =''+id+'';
    var data:any = {
      '_id':id
    };
    console.log(data)
    this.http.post("http://165.22.50.213:3001/deleteProduct" ,data).subscribe(res =>{
      console.log(product['name']);
      this.message = res;
  });

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/product']);
    
  }

  open(product:any) {


    this.deleteproduct = {
      _id:product._id,
    name: product.name,
    thumbnail: product.thumbnail,
    description: product.description,
    price: product.price,
    
    
  }
    

    
  }

  detail(product:any){
    const addadd = "/addaddresses?id=" + product._id;
    console.log(addadd)
    this.router.navigateByUrl(addadd)
   }
   edit(product:any){
    console.log(product);
    const editpro = "/editprod?id=" + product._id;
    console.log(editpro)
    this.router.navigateByUrl(editpro)
   }

   
  backnav() {
    this.router.navigate(['/home'])
  }



}

