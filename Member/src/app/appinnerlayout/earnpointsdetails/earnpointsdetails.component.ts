import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
declare var angular:any;
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-earnpointsdetails',
  templateUrl: './earnpointsdetails.component.html',
  styleUrls: ['./earnpointsdetails.component.scss']
})
export class EarnpointsdetailsComponent implements OnInit {

  message: any;
  public id:any;
  dataToString:any;
  todayDate = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any; 
  publishedrewardArr =[];
  registerArr=[];
  totalArr:any;
  points:number=0;

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

  public publishedreward = {
    _id:'',
    title:'',
    detail:'',
    reward:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:''
  }

  public userreward = {
    title:'',
    detail:'',
    type:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    status:'',
    rewardid:'',
    createddate:'',
    memberid:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getPublishedreward();
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

  getPublishedreward()
  {
    this.http.get('http://165.22.50.213:3001/getpublishreward').subscribe((res:any)=>
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id)
        {
          this.publishedreward =
          {
            _id: data[i]['_id'],
            title: data[i]['title'],
            detail: data[i]['detail'],
            reward: data[i]['reward'],
            termsandcondition: data[i]['termsandcondition'],
            expireddate: data[i]['expireddate'],
            available: data[i]['available'],
            memberid: data[i]['memberid'],
            rewardid: data[i]['rewardid'],
          }
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];
        }
        else{}
      }
    });
  }

  editrewardstatus(publishedreward:any) {
    this.publishedreward.available = 'Claimed';
    this.http.post('http://165.22.50.213:3001/editpublishedreward', publishedreward).subscribe((res:any) => {
      this.message = res;      
    });  
    this.getpoints();
  }



  getpoints()
  { 
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any)=>
    {
      this.registerArr = res['data']

      for(var i=0; i<this.registerArr.length; i++)
      {
        if(this.registerArr[i]['_id'] == this.publishedreward.memberid)
        {
          var recpoints = parseInt(this.registerArr[i]['totalpoints'])
          var total = recpoints + parseInt(this.publishedreward.reward);
          var currentpoints = parseInt(this.registerArr[i]['pointscollect'])
          var newpointscollect = currentpoints + parseInt(this.publishedreward.reward)

          this.register._id = this.registerArr[i]['_id']
          this.register.totalpoints = total.toString();
          this.register.pointscollect = newpointscollect.toString();

          if(this.register.totalpoints != '0'){
          this.http.post('http://165.22.50.213:3001/editpoints', this.register).subscribe((res:any)=>
          {
            this.message = res;
            $("#claimed").show();
            $("#pending").hide();
          })
        }
        }         
      }
    });  
  }  
  
  isShows: boolean=true;
  toggleShow(){
    this.isShows = !this.isShows;
    
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
    const empurl = "/earnmorepoints?id=" + this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}
