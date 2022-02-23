import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notificationdetails',
  templateUrl: './notificationdetails.component.html',
  styleUrls: ['./notificationdetails.component.scss']
})
export class NotificationdetailsComponent implements OnInit {

  message: any;  
  newsArr = [];
  onnewsArr = [];
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public news = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:''
  }; 

  public onnews = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:''
  }; 

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getNews(); 
    this.getRegister();
    
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getNews()
  {
    this.http.get('http://165.22.50.213:3001/getpublishednew').subscribe((res:any) => 
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.news = {
                _id:data[i]['_id'],
                title:data[i]['title'],
                date: data[i]['date'],
                time:data[i]['time'],
                description: data[i]['description'],
                caption:data[i]['caption'],
                thumbnail:data[i]['thumbnail']
              } 
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
      
              this.imagetypeArr = data[i]['thumbnail']['contentType'];            
             }
             else{
             }
      }
    });
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
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
