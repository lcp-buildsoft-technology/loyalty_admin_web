import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pointstransaction',
  templateUrl: './pointstransaction.component.html',
  styleUrls: ['./pointstransaction.component.scss']
})
export class PointstransactionComponent implements OnInit {
  selectedValue!: string;

  message:any;  
  public id:any;
  userpointsredeemedArr=[];

  pointsgivenArr = [];
  prizespts = [];
  recprizespts = [];
  hisprizespts =[];

  userpointscollectedArr=[];

  searchTransaction: string = '';
  todayDate = "";

  recpointsgivenArr = [];
  hispointsgivenArr = [];
  expointsgivenArr =[];

  recuserpointsredeemedArr = [];
  hisuserpointsredeemedArr = [];
  exuserpointsredeemedArr = [];
  
  registerArr=[];

  public register = {
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

  public userpointsredeemed = {
    name:'',
    createddate:'',
    points:'',
    userredeemedid:'',
    memberid:'',
    merchant:''
  }

  public userpointscollected ={
    memberid:'',
    pointsget:'',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:''
  }

  public hisuserpointsredeemed = {
    name:'',
    createddate:'',
    points:'',
    userredeemedid:'',
    memberid:'',
    merchant:''
  }

  public recuserpointsredeemed = {
    name:'',
    createddate:'',
    points:'',
    userredeemedid:'',
    memberid:'',
    merchant:''
  }
  public exuserpointsredeemed = {
    name:'',
    createddate:'',
    points:'',
    userredeemedid:'',
    memberid:'',
    merchant:''
  }

  public pointsgiven = {
    _id:'',
    memberid:'',
    pointsget:'',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:''
  }

  public hispointsgiven = {
    _id:'',
    memberid:'',
    pointsget:'',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:''
  }

  public expointsgiven = {
    _id:'',
    memberid:'',
    pointsget:'',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:''
  }

  public recpointsgiven = {
    _id:'',
    memberid:'',
    pointsget:'',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:''
  }

  public prizepoints =
  {
    _id:'',
    points:'',
    createdDate:'',
    memberid:'',
    type:'',
    expireddate:''
  }

  public recprizepoints =
  {
    _id:'',
    points:'',
    createdDate:'',
    memberid:'',
    type:'',
    expireddate:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserpointsredeemed();
    this.getPointsgiven();
    this.getRegister();

    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];

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

  getUserpointsredeemed() {
    this.http.get('http://165.22.50.213:3001/getuserpointsredeemed').subscribe((res:any)=> {
      this.userpointsredeemedArr = res['data'];

      var today = new Date();
      var endday = (today.getFullYear()-1)+'-'+(today.getMonth()+1)+'-'+today.getDate();

      for(var i=0; i < this.userpointsredeemedArr.length; i++){
        if(this.userpointsredeemedArr[i]['memberid'] == this.id){
          if(this.userpointsredeemedArr[i]['createddate'] === this.todayDate) {
          this.recuserpointsredeemedArr.push(this.userpointsredeemedArr[i]);          
          }
          else if(this.userpointsredeemedArr[i]['createddate'] <= endday){
            this.exuserpointsredeemedArr.push(this.userpointsredeemedArr[i]);
          }
          else{
            this.hisuserpointsredeemedArr.push(this.userpointsredeemedArr[i]);
          }
        } else{}      
      }
    });    
  }
  
  getPointsgiven() {
    this.http.get('http://165.22.50.213:3001/getpointsgiven').subscribe((res:any)=> {
      this.pointsgivenArr = res['data'];
      console.log(this.pointsgivenArr);
      

      var today = new Date();
      var endday = (today.getFullYear()-1)+'-'+(today.getMonth()+1)+'-'+today.getDate();

      for(var i=0; i < this.pointsgivenArr.length; i++){
        if(this.pointsgivenArr[i]['memberid'] == this.id){
          if(this.pointsgivenArr[i]['createddate'] === this.todayDate) {
          this.recpointsgivenArr.push(this.pointsgivenArr[i]); 
          console.log(this.recpointsgivenArr)         
          }
          else if(this.pointsgivenArr[i]['createddate'] <= endday){
            this.expointsgivenArr.push(this.pointsgivenArr[i]);
          }
          else{
            this.hispointsgivenArr.push(this.pointsgivenArr[i]);
          }
        }  
        else{}      
      }
  });
}

getPrizehistory() {
  this.http.get('http://165.22.50.213:3001/getprizehistory/'+this.currentmemberid).subscribe((res: any) => {
    this.prizespts = res['data'];

    for(var i=0; i<this.prizespts.length; i++)
    {
      if(this.prizespts[i]['memberid'] == this.id)
      {
        if(this.prizespts[i]['createdDate'] === this.todayDate)
        {
          this.recprizespts.push(this.prizespts[i]);
        }
        else
        {
          this.hisprizespts.push(this.prizespts[i])
        }
      }
      else{}
    }
  })
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
      this.currentmemberid = memberid[0]._id
      this.getPrizehistory() 
    });
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}