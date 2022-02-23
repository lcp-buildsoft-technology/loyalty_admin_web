import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-onlinestorehome',
  templateUrl: './onlinestorehome.component.html',
  styleUrls: ['./onlinestorehome.component.scss']
})
export class OnlinestorehomeComponent implements OnInit {

  public isActive:boolean = true;

  categoryArr =[];
  prodcatArr =[];
  productcatArr: string[] = [];

  message: any;
  productArr = [];
  allArr=[];

  public product={
    _id:'',
    name:'',
    thumbnail: '',
    thumbnailType: '',
    description:'',
    price:'',
    outletid:'',
    merchantid:'',
    categories:'',
    redemp:'',
    tnc:'',
  };

  public category = {
    _id:'',
    category:'',
  }

  public prodcat:any=
  {
    _id:'',
    name:'',
    thumbnail: '',
    thumbnailType: '',
    description:'',
    price:'',
    outletid:'',
    merchantid:'',
    categories:'',
    redemp:'',
    tnc:'',
  };
  public id:any;

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategory();
    this.Transferall();
    this.getRegister();

    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }  

  open(onlinestore:any)
  {
    const onurl = "/onlinestoredetails?id=" + onlinestore._id;
    console.log(onurl)
    this.router.navigateByUrl(onurl)
  }

  getCategory(){
    this.http.get('http://165.22.50.213:3001/getproductcategory').subscribe((res:any) => {
    this.categoryArr=res['data']
  });
  }

  Transfer(id:any)
  {
    var name= $("#categorybtn_" + this.category).attr('name')+"";
  $("#product_name").val(name);
  }

Transferall()
{

  this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=>
  {
    this.productArr = res['data'];
    this.productcatArr = []
    for(var i=0; i<this.productArr.length; i++)
    {
      if(this.productArr[i]['outletid'] == this.id)
      {
        if(this.productArr[i]['status'] == "Active")
        {
          console.log("Success");
        this.prodcat = {
          _id:'',
          name:'',
          thumbnail: '',
          thumbnailType: '',
          description:'',
          price:'',
          outletid:'',
          merchantid:'',
          categories:'',
          redemp:'',
          tnc:'',
        };
        this.prodcat._id = this.productArr[i]['_id']
        this.prodcat.name = this.productArr[i]['name']
        this.prodcat.description = this.productArr[i]['description']
        this.prodcat.price = this.productArr[i]['price']
        this.prodcat.outletid = this.productArr[i]['outletid']
        this.prodcat.merchantid = this.productArr[i]['merchantid']
        this.prodcat.redemp = this.productArr[i]['redemp']
        this.prodcat.tnc = this.productArr[i]['tnc']
        this.prodcat.thumbnail = new Buffer(this.productArr[i]['thumbnail']['data']).toString('base64');
        this.prodcat.thumbnailType = this.productArr[i]['thumbnail']['contentType']
        this.productcatArr.push(this.prodcat);
        }
        
      }
    }
  });
}

Transfercategory(category:any)
{
  this.isActive = false;
  var name= $("#categorybtn_" + category).attr('name')+"";
  this.prodcat.categories = category
  this.productcatArr = []
  this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=>
  {
    this.productcatArr = []
    this.prodcatArr = res['data'];

    for(var i=0; i<this.prodcatArr.length; i++)
    {
      
      if(this.prodcatArr[i]['categories'] == this.prodcat.categories)
      {
        if(this.prodcatArr[i]['outletid'] === this.id)
        {
          if(this.prodcatArr[i]['status'] == "Active")
          {
            console.log("Successcat");
          this.prodcat = {
            _id:'',
            name:'',
            thumbnail: '',
            thumbnailType: '',
            description:'',
            price:'',
            outletid:'',
            merchantid:'',
            categories:'',
            redemp:'',
            tnc:'',
          };
          this.prodcat._id = this.prodcatArr[i]['_id']
          this.prodcat.name = this.prodcatArr[i]['name']
          this.prodcat.description = this.prodcatArr[i]['description']
          this.prodcat.price = this.prodcatArr[i]['price']
          this.prodcat.outletid = this.prodcatArr[i]['outletid']
          this.prodcat.merchantid = this.prodcatArr[i]['merchantid']
          this.prodcat.redemp = this.prodcatArr[i]['redemp']
          this.prodcat.tnc = this.prodcatArr[i]['tnc']
          this.prodcat.thumbnail = new Buffer(this.prodcatArr[i]['thumbnail']['data']).toString('base64');
          this.prodcat.thumbnailType = this.prodcatArr[i]['thumbnail']['contentType']
          this.productcatArr.push(this.prodcat);
          }
          
        }
        
      }
    }
  });
}

registerArr = [];
    
  public register ={
    _id:'',
    phonenumber:'', 
    name:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    username:'',
    thumbnail:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    status:'',
    createdat:'',
    totalpoints:''
  }

  lol = [];
  public currentmemberid: any;

  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
    });
  }
  
  backnav() {
    const sdurl = "/locatestoredetails?id=" + this.prodcat.outletid;
    console.log(sdurl)
    this.router.navigateByUrl(sdurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}