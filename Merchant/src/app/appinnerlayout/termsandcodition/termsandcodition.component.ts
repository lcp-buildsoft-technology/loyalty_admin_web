import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-onlinestorehome',
  templateUrl: './termsandcodition.component.html',
  styleUrls: ['./termsandcodition.component.scss']
})
export class TermsandcoditionComponent implements OnInit {
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

  constructor(private http: HttpClient, private form: FormBuilder) { }

  ngOnInit(): void {
    this.getCategory();
    this.Transferall();

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
  }  

  open(onlinestore:any)
  {
    console.log(onlinestore);
    window.location.href="/onlinestoredetails?id=" + onlinestore._id;
  }

  getCategory(){

    this.http.get('http://165.22.50.213:3001/getproductcategory').subscribe((res:any) => {
    this.categoryArr=res['data']
    console.log( this.categoryArr)
     
  });
  }

  Transfer(id:any)
  {
    var name= $("#categorybtn_" + this.category).attr('name')+"";
  console.log(name);
console.log(id)
  $("#product_name").val(name);
  }

  Transferall()
{
  console.log("All")

  this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=>
  {
    this.productArr = res['data'];
    console.log(this.productArr);
    this.productcatArr = []
    for(var i=0; i<this.productArr.length; i++)
    {
      if(this.productArr[i]['outletid'] == this.id)
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
        console.log(this.prodcat);
        this.productcatArr.push(this.prodcat);
        console.log(this.productcatArr)
      }
    }
  });
}

Transfercategory(category:any)
{
  this.isActive = false;
  var name= $("#categorybtn_" + category).attr('name')+"";
  this.prodcat.categories = category
  console.log("Category")
  this.productcatArr = []
  this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=>
  {
    this.productcatArr = []
    this.prodcatArr = res['data'];
    console.log(this.productcatArr);

    for(var i=0; i<this.prodcatArr.length; i++)
    {
      
      if(this.prodcatArr[i]['categories'] == this.prodcat.categories)
      {
        if(this.prodcatArr[i]['outletid'] === this.id)
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
          console.log(this.prodcat);
          this.productcatArr.push(this.prodcat);
        }
        
      }
    }
  });

}

}

