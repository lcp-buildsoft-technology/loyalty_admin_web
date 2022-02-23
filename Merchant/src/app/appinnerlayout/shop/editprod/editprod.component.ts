import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WindowScrollController } from '@fullcalendar/common';
import { ThrowStmt } from '@angular/compiler';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

declare var angular: any;

@Component({
  selector: 'app-editprod',
  templateUrl: './editprod.component.html',
  styleUrls: ['./editprod.component.scss']
})

export class EditprodComponent implements OnInit {
  productArr = [];
  selectedArr = [];
  categoryArr = [];
  message: any;
  new?: Object;
  public srch = [];
  data_id = '';
  error: number = 0;
  valid: string[] = [];
  todayDate: any

  pricePattern = "^[0-9.]{1,8}";

  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private router: Router, private form: FormBuilder) {
    this.srch = [...this.productArr];
  }

  public product = {
    _id: '',
    name: '',
    thumbnail: '',
    description: '',
    price: '',
    redemp: '',
    categories: '',
    tnc: '',
    outletid: '',
    merchantid: ''
  };

  public editProduct = {
    _id: '',
    name: '',
    thumbnail: '',
    description: '',
    price: '',
    redemp: '',
    categories: '',
    tnc: '',
    outletid: '',
    merchantid: ''
  };
  public id: any;

  ngOnInit(): void {
    this.open(this.product);

    var url = document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    this.data_id = this.id;
    this.getcategories();
    this.getProduct(this.id);
  }

  public images: any;
  public ogthumb:any;
  url: any;
  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
        var maxFileSize = 1024 * 1024; 
    
        const file = event.target.files[0];
        
        if(this.images.size > maxFileSize){
          alert('Image too large. Maximum file size is 1MB');
          this.editProduct.thumbnail = this.ogthumb;
          console.log(this.ogthumb)
          console.log(this.editProduct.thumbnail)
        }
        else{
          this.images=file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.ogthumb =this.editProduct.thumbnail;
        }
      }
  
      }
    }
  }

  imagesArr =[];
  public image:any;
  public imagetype:any;

  getProduct(id: any) {
    this.product._id = this.id
    this.http.post('http://165.22.50.213:3001/getoneproduct', this.product).subscribe((res: any) => {


      console.log(res);
      console.log(res['data'])
      this.productArr = res['data'];

      console.log(this.productArr);

      this.editProduct.name = res['data']['name']
      this.editProduct.redemp = res['data']['redemp']
      this.editProduct.description = res['data']['description']
      this.editProduct.price = res['data']['price']
      this.editProduct.categories = res['data']['categories']
      this.editProduct.tnc = res['data']['tnc']
      this.editProduct.redemp = res['data']['redemp']

      $('#newimg').hide();
      this.image = new Buffer(this.productArr['thumbnail']['data']).toString('base64');
      this.imagetype = this.productArr['thumbnail']['contentType'];
      this.images = this.productArr['thumbnail'];
      this.ogthumb = this.productArr['thumbnail'];

    });
  }

  getcategories() {
    this.http.get('http://165.22.50.213:3001/getallcategory').subscribe((res: any) => {
      this.categoryArr = res['data'];
      console.log(this.categoryArr)


    });
  }

  uploadProduct(product: any) {
    this.error = 0;
    this.valid = this.validation();

    console.log(this.error)
    if (this.error < 1) {
      const formData = new FormData();
      var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
      console.log(this.id)
      console.log(moutlet._id)
      formData.append('_id', this.id)
      formData.append('name', product.name)
      formData.append('redemp', product.redemp)
      formData.append('description', product.description)
      formData.append('file', this.images)
      formData.append('price', product.price)
      formData.append('categories', product.categories)
      formData.append('merchantid', moutlet.merchantid)
      formData.append('outletid', moutlet._id)
      formData.append('tnc', product.tnc)

      formData.forEach(file => console.log("File: ", file));
      console.log(product)
      console.log(formData)
      this.http.post('http://165.22.50.213:3001/editproductandimage', formData).subscribe(res => {
        console.log(res);
        this.message = res;
      });
      this.router.navigate[('/product')]
    }
  }

  open(product: any) {

    this.editProduct = {
      _id: product._id,
      redemp: product.redemp,
      name: product.name,
      thumbnail: product.thumbnail,
      description: product.description,
      price: product.price,
      categories: product.categories,
      tnc: product.tnc,
      outletid: product.outletid,
      merchantid: product.merchantid
    }
  }
  backnav() {
  this.router.navigate[('/product')]
  }
  backto() {
    this.router.navigate[('/product')]
  }
  validation() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1

    var day = "";
    var month = "";

    var yyyy = today.getFullYear();
    if (dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }
    if (mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }
    this.todayDate = yyyy + '-' + month + '-' + day;

    //title
    if (this.editProduct.name === '') {
      this.valid['name'] = "*Please enter the product name!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    //detail
    if (this.editProduct.description === '') {
      this.valid['description'] = "*Please enter the description!";
      this.error++;
    }
    else {
      this.valid['description'] = ""
    }

    if (this.editProduct.price === '') {
      this.valid['price'] = "*Please enter the price!";
      this.error++;
    }
    else if (!this.editProduct.price.match(this.pricePattern)) {
      this.error++;
    }
    else {
      this.valid['price'] = ""
    }

    if (this.editProduct.tnc === '') {
      this.valid['tnc'] = "*Please enter terms and condition!";
      this.error++;
    }
    else {
      this.valid['tnc'] = ""
    }

    return this.valid;
  }


}


