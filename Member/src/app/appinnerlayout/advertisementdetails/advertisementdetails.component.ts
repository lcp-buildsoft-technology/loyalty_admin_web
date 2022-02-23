import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advertisementdetails',
  templateUrl: './advertisementdetails.component.html',
  styleUrls: ['./advertisementdetails.component.scss']
})
export class AdvertisementdetailsComponent implements OnInit {
  message: any;  
  advertisementArr = [];
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public advertisement = {
    _id:'',
    merchant:'',
    title:'',
    sdate:'',
    edate:'',
    thumbnail:'',
    detail:'',
    pdate:'',
    ptime:''
  }

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAdvertisement(); 

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id); 
  }

  getAdvertisement()
  {
    this.http.get('http://165.22.50.213:3001/getpublishedad').subscribe((res:any) => 
    {
      var data = res['data'];
      console.log(data);

      for(var i=0; i<data.length; i++){
        console.log(data[i]['_id']);
        console.log(this.id);
             if(data[i]['_id'] == this.id ){
              this.advertisement = {
                _id:data[i]['_id'],
                merchant:data[i]['merchant'],
                title:data[i]['title'],
                sdate:data[i]['sdate'],
                edate:data[i]['edate'],
                thumbnail:data[i]['thumbnail'],
                detail:data[i]['detail'],
                pdate:data[i]['pdate'],
                ptime:data[i]['ptime']
              }  
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
      
              this.imagetypeArr = data[i]['thumbnail']['contentType'];           
              console.log(this.advertisement)          
             }
             else{}
      }
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
