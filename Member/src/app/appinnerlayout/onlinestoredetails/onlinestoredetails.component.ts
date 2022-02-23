import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var angular:any;

@Component({
  selector: 'app-onlinestoredetails',
  templateUrl: './onlinestoredetails.component.html',
  styleUrls: ['./onlinestoredetails.component.scss']
})
export class OnlinestoredetailsComponent implements OnInit {

  message: any;
  onlinestoreArr = [];
  reconlinestoreArr: any[] = [];
  image1arr: any;
  imagetypeArr: any;
  imagesArr: any;

  public id:any;

  public onlinestore = {
    _id: '',
    merchantid:'',
    outletid:'',
    name:'',
    thumbnail:'',
    description: '',
    categories:'',
    redemp:'',
    price:'',
    tnc:'',
  }

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOnlinestore();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getOnlinestore()
  {
    this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any) => 
    {
      var data = res['data'];

      for(var i=0; i < data.length; i++){
        if(data[i]['_id'] == this.id) {
          this.onlinestore = {
            _id:data[i]['_id'],
            merchantid:data[i]['merchantid'],
            outletid:data[i]['outletid'],
            name:data[i]['name'],
            thumbnail:data[i]['thumbnail'],
            description:data[i]['description'],
            categories:data[i]['categories'],
            redemp:data[i]['redemp'],
            price:data[i]['price'],
            tnc:data[i]['tnc']
          }
          this.image1arr= new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr= data[i]['thumbnail']['contentType'];
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
  
  backnav() {
    const shurl = "/onlinestorehome?id=" + this.onlinestore.outletid;
    console.log(shurl)
    this.router.navigateByUrl(shurl)
  }

  acc(){    
    const purl  = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}