import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-vdetail',
  templateUrl: './vdetail.component.html',
  styleUrls: ['./vdetail.component.scss']
})
export class VdetailComponent implements OnInit {
  message: any;


   image1arr:any;
   imagetypeArr:any;

   voucherArr = [];
   selectedArr= [];
  imagesArr = []
 
  public srch =[];

  constructor(private modalService: NgbModal, private http: HttpClient,private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.voucherArr];
    
  }
  public voucher={
    _id:'',
    title:'',
    sdate: '',
    edate:'',
    thumbnail:'',
    thumbnailType:'',
    quantity:'',
    discount:'',
    code:'',
    minspend:'',
    termsandcondition:'',
    status:'',
    detail:'',
    merchantid:''
     };
     public selected={

      title:'',
      sdate: '',
      edate:'',
      thumbnail:'',
      quantity:'',
      discount:'',
      code:'',
      minspend:'',
      termsandcondition:'',
      status:'',
      detail:''
       };
  public  id:any;
  ngOnInit(): void {
   
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove()
    
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getVoucher(this.id);
  
  }
 

     getVoucher(id:any) {

        this.voucher._id = this.id
        console.log(this.id)
        var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
       this.voucher.merchantid = this.id
       console.log(this.voucher)
      this.http.post('http://165.22.50.213:3001/getonevoucher',this.voucher).subscribe((res:any) => {
      
       
         console.log( res);
         console.log(res['data']);
         this.voucherArr = res['data'];
          var data = res['data'] ;
         
          for(var i=0; i<this.voucherArr.length; i++){
      
            if(data[i]['_id'] == this.id ){
             
              this.voucherArr = data[i];
              console.log(data[i])
              console.log('sadasdd')
              this.voucher={
                _id:data[i]['_id'],
                title:data[i]['title'],
                sdate: data[i]['sdate'],
                edate:data[i]['edate'],
                thumbnail:new Buffer(data[i]['thumbnail']['data']).toString('base64'),
                thumbnailType:data[i]['thumbnail']['contentType'],
                quantity:data[i]['quantity'],
                discount:data[i]['discount'],
                code:data[i]['code'],
                minspend:data[i]['minspend'],
                termsandcondition:data[i]['termsandcondition'],
                status:data[i]['status'],
                detail:data[i]['detail'],
                merchantid:data[i]['merchantid']
             
                 };
                 this.image1arr=this.voucher.thumbnail
                 this.imagetypeArr=this.voucher.thumbnailType
            }
            else{
              this.voucherArr.splice(i);
              console.log(this.voucherArr)
            }
            }
 
           
  
        
      });
    }

backnav() {
  this.router.navigate(['/payment'])
}

 
}
