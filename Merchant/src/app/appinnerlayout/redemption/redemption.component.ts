import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})

export class redemptionComponent implements OnInit {
  searchInput : string ='';
  message: any;
  id:any;
  rlength:any;
  plength:any;
  registerlength:any;
  public UserproductArr = [];
  todayArr: string[] = [];
  yesterdayArr: string[] = [];
  monthArr: string[] = [];
  allArr: string[] = [];
  rArr = [];
  pArr = [];
  registerArr = [];
  redeemArr=[]
  MemberArr=[]
  testArr=[]
  AllMemberArr=[]
  public srch=[];

  constructor(private modalService: NgbModal, private http: HttpClient, private _compiler: Compiler,private form: FormBuilder,
    private router:Router,
    private route: ActivatedRoute) { 
    this.srch = [...this.UserproductArr];
  }

  public userproduct={
    id:'',
    name:'',
    description:'',
    price:'',
    onlinestoreid:'',
    status:'',
    memberid:'',
    merchantid:'',
    redemp:0,
    tnc:'',
    outletid:'',
    codetype:'',
    createddate:'' 
  };

  public productanduserproduct: any={
    createddate:'',
    thumbnail: '',
    thumbnailType:'',
    productname:'',
    membername:'',
    points:''
  }

  public today={
    name: '',
    createddate:'',
    points:'',
    memberid:'',
    membername:''
  };

  public yesterday={
    name: '',
    createddate:'',
    points:'',
    memberid:'',
    membername:''
  }; 

  public monthly={
    name: '',
    createddate:'',
    points:'',
    memberid:'',
    membername:''
  };

  public all={
    name: '',
    createddate:'',
    points:'',
    memberid:'',
    membername:''    
  };

  ngOnInit(): void {
    
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getUserproduct();
    this.getMember();
  }

  backnav() {
    this.router.navigate[('/home')]
  }

  getUserproduct(){
    console.log(this.id) 
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.userproduct.outletid = moutlet._id
   
    console.log(this.userproduct)
    this.http.post('http://165.22.50.213:3001/getproductanduserproduct',this.userproduct).subscribe((res:any) => {
      this.rArr = res['data'];
      this.pArr = res['data1'];
      this.registerArr = res['data2'];
      console.log(this.rArr)
      console.log(this.pArr)
      this.rlength = res['data'].length;
      this.plength = res['data1'].length;
      this.registerlength = res['data2'].length;
      console.log(this.UserproductArr)

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() - 1);
      var monthly = today.getFullYear()+'-'+(today.getMonth())+'-'+(today.getDate() );
      var year = today.getFullYear()
      var month = today.getMonth()+1
       
 for(var i=0; i < this.rlength;i++){
  for (var m = 0; m < this.plength; m++) {
   this.productanduserproduct ={
      createddate:'',
      thumbnail: '',
      thumbnailType:'',
      productname:'',
      membername:'',
      points:'',
     };

     console.log( res['data'][i])
     this.productanduserproduct.memberid = res['data'][i]['memberid'];
     this.productanduserproduct.membername = res['data'][i]['membername'];
     this.productanduserproduct.createddate = res['data'][i]['createddate'];
     this.productanduserproduct.points = res['data'][i]['points'];
     this.productanduserproduct.productname =res['data'][i]['name'];

     console.log(this.pArr[m]['_id'])

            if (this.rArr[i]['onlinestoreid'] == this.pArr[m]['_id']) {
              this.productanduserproduct.thumbnail = new Buffer(
                res['data1'][m]['thumbnail']['data']
              ).toString('base64');

              this.productanduserproduct.thumbnailType =
                res['data1'][m]['thumbnail']['contentType'];
              this.allArr.push(this.productanduserproduct)
                if (res['data'][i]['createddate'] == date) {
                  this.todayArr.push(this.productanduserproduct) ;
                } 
                if (res['data'][i]['createddate'] == yesterday) {
                  this.yesterdayArr.push(this.productanduserproduct) ;
                  console.log(this.yesterdayArr)
                }
                if (res['data'][i]['createddate'] > monthly) {
                  this.monthArr.push(this.productanduserproduct) ;
                }
            }

  }
}

for(var m=0; m<this.todayArr.length ; m++){
 for(var i=0 ; i<this.registerlength ; i++){
   console.log(this.registerArr[i])
   console.log(this.todayArr[m])
  if(this.todayArr[m]['memberid'] == this.registerArr[i]['_id']){
    this.todayArr[m]['membername'] = this.registerArr[i]['username']
  }
}
}

for(var m=0; m<this.monthArr.length ; m++){
  for(var i=0 ; i<this.registerlength ; i++){
    console.log(this.registerArr[i])
    console.log(this.monthArr[m])
   if(this.monthArr[m]['memberid'] == this.registerArr[i]['_id']){
     this.monthArr[m]['membername'] = this.registerArr[i]['username']
   }
  }
}

 for(var m=0; m<this.yesterdayArr.length ; m++){
  for(var i=0 ; i<this.registerlength ; i++){
    console.log(this.registerArr[i])
    console.log(this.yesterdayArr[m])
   if(this.yesterdayArr[m]['memberid'] == this.registerArr[i]['_id']){
     this.yesterdayArr[m]['membername'] = this.registerArr[i]['username']
   }
  }
}

 for(var m=0; m<this.allArr.length ; m++){
  for(var i=0 ; i<this.registerlength ; i++){
    console.log(this.registerArr[i])
    console.log(this.allArr[m])
   if(this.allArr[m]['memberid'] == this.registerArr[i]['_id']){
     this.allArr[m]['membername'] = this.registerArr[i]['username']
   }
  }
 }
    console.log(this.todayArr)
 
  });
}

getMember(){
  this.http.get('http://165.22.50.213:3001/getmember').subscribe((res:any) => {
  this.AllMemberArr = res['data'] ;
  console.log(this.UserproductArr)
  console.log(this.AllMemberArr)
  });
}

}
