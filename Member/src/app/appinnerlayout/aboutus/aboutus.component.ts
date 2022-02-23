import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  message:any;
  public id:any;
  aboutusArr =[];
  onaboutusArr:any[] = [];
  contactinfoArr = [];
  public srch =[];
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public onaboutus:any ={
    _id:'',
    picture:'',
    description:'',
    thumbnailType:''
  }
  public aboutus ={
    _id:'',
    picture:'',
    description:'',
    thumbnailType:''
  }

  public contactinfo = {
    _id:'',
    label:'',
    content:''
  }

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.getAboutus();
    this.getContactinfo();
    this.getRegister();
  }

  getAboutus(){
    this.http.get('http://165.22.50.213:3001/getaboutus').subscribe((res:any) => 
    {
      this.aboutusArr = res['data'];

      for(var i=0; i<this.aboutusArr.length; i++)
      {
        this.onaboutus = {
          _id:'',
          picture:'',
          description:'',
          thumbnailType:''
        }
        this.onaboutus._id = this.aboutusArr[i]['_id']
        this.onaboutus.description = this.aboutusArr[i]['description']
        this.onaboutus.picture = new Buffer(this.aboutusArr[i]['picture']['data']).toString('base64');
        this.onaboutus.thumbnailType = this.aboutusArr[i]['picture']['contentType']
        this.onaboutusArr.push(this.onaboutus);
      }
    });
  }

  getContactinfo(){
    this.http.get('http://165.22.50.213:3001/getcontactinfo').subscribe((res:any) => 
    {
      this.contactinfoArr = res['data'];
    });
  }

  registerArr = [];
    
  public register ={
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

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}

