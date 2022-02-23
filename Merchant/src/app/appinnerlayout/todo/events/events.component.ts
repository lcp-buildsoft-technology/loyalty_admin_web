import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular: any;
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  productArr = [];
  message: any;
  new?: Object;
  lastproductArr = [];
  categoryArr = [];
  public srch = [];
  public lastproductid: any;
  image: any
  images: any
  imagetype: any
  valid: string[] = [];
  todayDate: any
  error: number = 0;


  constructor(private http: HttpClient, private modalService: NgbModal, private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.productArr];
  }
  public product = {

    name: '',
    thumbnail: '',
    description: '',
    categories: '',
    price: '',
    redemp: '',
    tnc: '',
    merchantid: '',
    outletid: ''
  };

  public editProduct = {


    name: '',
    thumbnail: '',
    description: '',
    categories: '',
    price: '',
    redemp: '',
    tnc: '',
    merchantid: '',
    outletid: ''
  };
  public category = {


    category: '',

  };
  ngOnInit(): void {
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.getcategories();

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
  }
  getcategories() {
    this.http.get('http://165.22.50.213:3001/getallcategory').subscribe((res: any) => {
      this.categoryArr = res['data'];
      console.log(this.categoryArr)
    });
  }

  backnav() {
    this.router.navigate(['/product'])
  }

  getProduct() {
    this.http.get('http://165.22.50.213:3001/getproduct').subscribe((res: any) => {
      this.productArr = res['data'];
    });
  }

  uploadProduct(product: any) {
    console.log(product);

    this.http.post('http://165.22.50.213:3001/editProduct', product).subscribe(res => {
      console.log(res);

      this.message = res;
    });

  }

  url = ("../../../../assets/img/blankimage.png");
  onselectFile(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      this.images = file;
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  sendData() {
    this.error = 0;
    console.log(this.product.categories);
    this.validation();
    if(this.error === 0){
      this.addimage()
    }
  }

  registerProduct(product: any) {
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);

    this.product.merchantid = moutlet.merchantid;
    this.product.outletid = moutlet._id;
    console.log("hi")
    this.http.post("http://165.22.50.213:3001/addproduct", product).subscribe(res => {
      this.message = res;
    });
    this.getlastproduct();
  }

  getlastproduct() {
    this.http.get('http://165.22.50.213:3001/getlastvoucher').subscribe((res: any) => {
      this.lastproductArr = res['data'];
      console.log(this.lastproductArr)
      console.log(this.lastproductArr[0]['title'])
      this.lastproductid = this.lastproductArr[0]['_id']
      this.addimage()


    });
  }
  addimage() {
    const formData = new FormData();
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    formData.append('name', this.product.name)
    formData.append('description', this.product.description)
    formData.append('categories', this.product.categories)
    formData.append('file', this.images)
    formData.append('redemp', this.product.redemp)
    formData.append('outletid', moutlet._id)
    formData.append('merchantid', moutlet.merchantid)
    formData.append('price', this.product.price)
    formData.append('tnc', this.product.tnc)
    formData.forEach(file => console.log("File: ", file));

    this.http.post('http://165.22.50.213:3001/upproductandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;

    });
    
    this.router.navigate(['/product'])
  }

  open(product: any) {


    this.editProduct = {
      merchantid: product.merchantid,
      outletid: product.outletid,
      name: product.name,
      thumbnail: product.thumbnail,
      description: product.description,
      price: product.price,
      categories: product.categories,
      redemp: product.redemp,
      tnc: product.tnc
    }



  }
  backto() {
    this.router.navigate(['/product'])
  }



  validation() {
    if (this.product.name === '') {
      this.valid['name'] = "*Please enter the product name!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    //description
    if (this.product.description === '') {
      this.valid['description'] = "*Please enter the description!";
      this.error++;
    }
    else {
      this.valid['description'] = ""
    }

    //category
    if (this.product.categories === '') {
      this.valid['categories'] = "*Please choose a category!";
      this.error++;
    }
    else {
      this.valid['categories'] = ""
    }

    //price
    if (this.product.price === '') {
      this.valid['price'] = "*Please enter the price!";
      this.error++;
    }
    
    else {
      this.valid['price'] = ""
    }
 
    //tnc
    if (this.product.tnc === '') {
      this.valid['tnc'] = "*Please enter the Terms and Conditions!";
      this.error++;
    }
    else {
      this.valid['tnc'] = ""
    }

  }

}