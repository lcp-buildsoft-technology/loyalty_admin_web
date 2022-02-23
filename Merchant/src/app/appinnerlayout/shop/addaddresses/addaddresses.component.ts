import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;
@Component({
  selector: 'app-addaddresses',
  templateUrl: './addaddresses.component.html',
  styleUrls: ['./addaddresses.component.scss']
})
export class AddaddressesComponent implements OnInit {
  
  message:any;
  productArr=[];
  image1arr:any;
  imagetypeArr:any;
  imagesArr = []
  public srch =[];

  constructor(private modalService: NgbModal, private http: HttpClient,private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.productArr];
  }

  ngOnInit(): void {
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getProduct();
  }

  public product={
    name:'',
    thumbnail: '',
    description:'',
    price:'',
    thumbnailType:'',
    tnc:'',
    outletid:''
  };

  public  id:any;

getProduct() {
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  this.product.outletid = moutlet._id
  this.http.post('http://165.22.50.213:3001/getproduct',this.product).subscribe((res:any) => {
  
     console.log( res);
      var data = res['data'] ;
      console.log(this.productArr)
      for(var i=0; i<data.length; i++){
  
        if(data[i]['_id'] == this.id ){

          this.productArr = data[i];
          console.log(data[i])
          console.log('sadasdd')
          this.product={
            name:data[i]['name'],
            thumbnail:new Buffer(data[i]['thumbnail']['data']).toString('base64'),
            thumbnailType:data[i]['thumbnail']['contentType'],
            description: data[i]['description'],
            price: data[i]['price'],
            tnc:data[i]['tnc'],
            outletid:data[i]['outletid']
          };
            this.image1arr=this.product.thumbnail
            this.imagetypeArr=this.product.thumbnailType
        }
        else{
          this.productArr.splice(i);
          console.log(this.productArr)
        }
        this.router.navigate[('/product')]
        }
  });
}

backnav() {
  this.router.navigate[('/product')]
}

}
