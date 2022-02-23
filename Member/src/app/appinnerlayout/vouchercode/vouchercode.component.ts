import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var angular:any;
 
@Component({
  selector: 'app-vouchercode',
  templateUrl: './vouchercode.component.html',
  styleUrls: ['./vouchercode.component.scss']
})
export class VouchercodeComponent implements OnInit {
  message: any;
  voucherArr = [];  
  public id:any;
  dataToString:any;
  public voucher = {
    _id:'',
    code:'',
    title:'',
    thumbnail:'',
    detail:'',
    quantity:'',
    discount:'',
    minspend:'',
    sdate:'',
    edate:'',
  }
 
  constructor(private http: HttpClient) { }
 
  ngOnInit(): void {
    this.getVoucher();
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
  }
  getVoucher()
  {
    this.http.get('http://165.22.50.213:3001/getvoucher').subscribe((res:any) =>
    {
      var data = res['data'];
      console.log(data);
     
      for(var i=0; i<data.length; i++){
        console.log(data[i]['_id']);
        console.log(this.id);
             if(data[i]['_id'] == this.id ){
              this.voucher = {
                _id:data[i]['_id'],
                code:data[i]['code'],
                title:data[i]['title'],
                thumbnail:data[i]['thumbnail'],
                detail:data[i]['detail'],
                quantity:data[i]['quantity'],
                discount:data[i]['discount'],
                minspend:data[i]['minspend'],
                sdate:data[i]['sdate'],
                edate:data[i]['edate'],
              }
              this.dataToString = JSON.stringify(this.voucher);
              console.log(this.voucher)  
               
             }
             else{
             }
      }  
     
     
      var app = angular.module("myModule",[])
      .controller("myController", function($scope:any){});
    });
  }
 
}
 
 

