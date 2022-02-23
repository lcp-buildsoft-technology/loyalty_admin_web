import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

declare var angular:any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  message:any;
  public id:any;
  newsArr = [];
  onnewsArr:string[] = [];
  public srch =[];
  todayDate = "";

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.srch = [...this.newsArr];
   }
   
   public news = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:'',
    }; 

  public onnews:any = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:''
  }; 

  ngOnInit(): void {
    this.getPublishednew();
    this.getRegister();

    var today = new Date();
    var time = today.getHours() +":" + today.getMinutes();
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

  getPublishednew()
  {
    this.http.get('http://165.22.50.213:3001/getpublishednew').subscribe((res:any) => 
    {
      this.newsArr = res['data'];

      for(var i=0; i < this.newsArr.length; i++){
        if(this.newsArr[i]['date'] <= this.todayDate){
          this.onnewsArr.push(this.newsArr[i]);
        }
        else{}
      }
    });
  }

  open(newsArr:any)
  {
    const ndurl = "/notificationdetails?id=" + newsArr['_id'];
    console.log(ndurl)
    this.router.navigateByUrl(ndurl)
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
