import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var angular:any;
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberdata',
  templateUrl: './memberdata.component.html',
  styleUrls: ['./memberdata.component.scss']
})

export class MemberdataComponent implements OnInit {
  searchInput : string ='';
  message:any;
  usedArr=[];
  totalused: number =0;
  collectArr=[];
  totalcollect: number =0;
  pointsgivenArr=[];
  temp = 0;
  id:any;
  memberid:any;
  public srch =[];
  public memberID:any = [];
  registerArr=[];
  totalget: number=0;
  totaluse: number=0;
  image1arr:any;
  imagetypeArr:any;
  imagesArr:any;
  images = [];

  constructor(private modalService: NgbModal, private http: HttpClient,private router: Router, private route:ActivatedRoute) {
    this.srch = [...this.pointsgivenArr];
  }
  
  public register = {
    _id:'',
    codetype:'',
    phonenumber:'',
    name: '',
    password:'',
    birthdate:'',
    tierlevel:'',
    totalpoints:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    username:'',
    createdat:'',
    thumbnail:'',
    city:'',
    postcode:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
  }

  public pointsgiven:any={
    memberid:'',
    pointsget: '',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:'',
    outletid:'',
    voucherid:''
  };
     
  public pointsgivenArray:any = [];

  ngOnInit() {
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getName();
  }

  backnav() {
    this.router.navigate(['/home'])
  }

  getName() {
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.pointsgiven.outletid = moutlet._id
    console.log(this.pointsgiven.outletid)

    this.http.post('http://165.22.50.213:3001/getpointsgivens', this.pointsgiven).subscribe((res:any) => {
      this.pointsgivenArr = res['data'];
      console.log(this.pointsgivenArr)
      for(var i=0; i< this.pointsgivenArr.length;i++){
        var id = this.pointsgivenArr[i]['memberid'];
        var filteredValue = this.memberID.filter(function (item:any) {
          return item ==id;
    });
   
      console.log("halo",filteredValue)
        if(filteredValue.length == []){
           this.memberID.push(this.pointsgivenArr[i]['memberid']);
        }
      }
      
      for (var i=0; i< this.memberID.length;i++){
        var totalget: number= 0;
        var totaluse: number= 0;
        var membername: any;
        for (var j=0; j< this.pointsgivenArr.length;j++){
            if(this.memberID[i] === this.pointsgivenArr[j]['memberid']){
             totalget += parseFloat(this.pointsgivenArr[j]['pointsget'])
             totaluse += parseFloat(this.pointsgivenArr[j]['pointsused'])
             membername = this.pointsgivenArr[j]['membername'];
          }
        
      }
        this.pointsgivenArray.push({'memberID': this.memberID[i], 'totalget': totalget, 'totalused': totaluse, 'membername': membername});
    
      }
      console.log(this.pointsgivenArray)
    
    });
  }
}