import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { Buffer } from 'buffer';
import * as $ from 'jquery';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { LogoutdialogComponent } from 'src/app/appinnerlayout/logoutdialog/logoutdialog.component';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  message:any;
  public id:any;
  registerArr = [];
  tierlevelArr=[];
  remainingpoints: number=0;
  onregisterArr: string[] = []

  public tierlevel ={
    _id:'',
    Silver:'',
    Gold:''
  }

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

  public onregister: any = {
    _id: '',
    phonenumber: '',
    name: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    confirmpwd: '',
    email: '',
    username: '',
    thumbnail: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: '',
    totalpoints: '',
    thumbnailType: ''
  }
  
  constructor(private http: HttpClient, public dialog: MatDialog, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getremainingpoints();    
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getTierlevel(){
    this.http.get('http://165.22.50.213:3001/gettierlevel').subscribe((res:any)=> {
      this.tierlevelArr = res['data'];
    });
  }

  lol = [];
  public currentmemberid: any;
  
  getremainingpoints()
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
      
      for(var i=0; i<this.registerArr.length; i++){
        if(this.registerArr[i]['_id'] == this.id)
        {
          if((parseInt(this.registerArr[i]['pointscollect']) <= parseInt(res['datatierlevel'][0]['Silver']))){
            this.current = this.registerArr[i]['pointscollect'];
            this.remainingpoints = res['datatierlevel'][0]['Silver'] - this.current
            this.max = res['datatierlevel'][0]['Silver']
            $("#level").html("Silver");
          $("#Bronze").show();
          $("#Silver").hide();
          $("#Gold").hide();
          }
          else if(((parseInt(this.registerArr[i]['pointscollect'])) > parseInt(res['datatierlevel'][0]['Silver'])) && (parseInt(this.registerArr[i]['pointscollect']) <= parseInt(res['datatierlevel'][0]['Silver'])))
          {
            this.current = this.registerArr[i]['pointscollect'] - res['datatierlevel'][0]['Silver']
            this.remainingpoints = res['datatierlevel'][0]['Gold'] - this.registerArr[i]['pointscollect']
            this.max = res['datatierlevel'][0]['Gold']
            $("#level2").html("Gold");
            $("#Bronze").hide();
            $("#Silver").show();
            $("#Gold").hide();
          } 
          else
          {
            this.current = this.registerArr[i]['pointscollect']
            $("#Bronze").hide();
            $("#Silver").hide();
            $("#Gold").show();
          }      
        }    
        else{

        }      
      }
    });
  }  

  points()
  {
    const empurl = "/earnmorepoints?id=" + this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

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
      for (var i = 0; i < this.registerArr.length; i++) {
        this.onregister =
        {
          _id: '',
          phonenumber: '',
          name: '',
          password: '',
          birthdate: '',
          tierlevel: '',
          pointscollect: '',
          pointsredeem: '',
          confirmpwd: '',
          email: '',
          username: '',
          thumbnail: '',
          address1: '',
          address2: '',
          address3: '',
          state: '',
          city: '',
          postcode: '',
          status: '',
          createdat: '',
          totalpoints: '',
          thumbnailType: ''
        };
        this.onregister._id = this.registerArr[i]['_id']
        this.onregister.phonenumber = this.registerArr[i]['phonenumber']
        this.onregister.name = this.registerArr[i]['name']
        this.onregister.password = this.registerArr[i]['password']
        this.onregister.birthdate = this.registerArr[i]['birthdate']
        this.onregister.tierlevel = this.registerArr[i]['tierlevel']
        this.onregister.pointscollect = this.registerArr[i]['pointscollect']
        this.onregister.pointsredeem = this.registerArr[i]['pointsredeem']
        this.onregister.confirmpwd = this.registerArr[i]['confirmpwd']
        this.onregister.email = this.registerArr[i]['email']
        this.onregister.username = this.registerArr[i]['username']
        this.onregister.address1 = this.registerArr[i]['address1']
        this.onregister.address2 = this.registerArr[i]['address2']
        this.onregister.address3 = this.registerArr[i]['address3']
        this.onregister.state = this.registerArr[i]['state']
        this.onregister.city = this.registerArr[i]['city']
        this.onregister.postcode = this.registerArr[i]['postcode']
        this.onregister.status = this.registerArr[i]['status']
        this.onregister.createdat = this.registerArr[i]['createdat']
        this.onregister.totalpoints = this.registerArr[i]['totalpoints']
        this.onregister.thumbnail = new Buffer(this.registerArr[i]['thumbnail']['data']).toString('base64');
        this.onregister.thumbnailType = this.registerArr[i]['thumbnail']['contentType']
        this.onregisterArr.push(this.onregister);
      }
    });
  }

  current:number=0;
  max: number =0;
  stroke: number = 15;
  radius: number = 70;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#dec074';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: Array<string> = [
    'linearEase',
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce',
  ];
  gradient: boolean = false;
  realCurrent: number = 0;

  getOverlayStyle() {
    const isSemi = this.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': this.radius / 3.5 + 'px',
    };
  }

  getpointscollected(){
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
      
      for(var i=0; i<this.registerArr.length; i++){
        if((this.registerArr[i]['pointscollect'] < res['datatierlevel'][0]['Silver'])){
          this.current = this.registerArr[i]['pointscollect'];
          this.max = res['datatierlevel'][0]['Silver']
          $("#Bronze").show();
          $("#Silver").hide();
          $("#Gold").hide();
        }
        else if(((this.registerArr[i]['pointscollect'] >=res['datatierlevel'][0]['Silver']) && (this.registerArr[i]['pointscollect'] < res['datatierlevel'][0]['Gold'])))
        {
          this.current = this.registerArr[i]['pointscollect'] - res['datatierlevel'][0]['Silver']
          this.max = res['datatierlevel'][0]['Gold']
          $("#Bronze").hide();
          $("#Silver").show();
          $("#Gold").hide();
        } 
        else
        {
          this.current = this.registerArr[i]['pointscollect'] - res['datatierlevel'][0]['Gold']
          $("#Bronze").hide();
          $("#Silver").hide();
          $("#Gold").show();
        }       
      }
    });
  }
  
  open(){    
    const myurl = "/myaccount?id=" + this.registerArr[0]['_id'];
    console.log(myurl)
    this.router.navigateByUrl(myurl)
  }

  go(){  
    const pturl = "/pointstransaction?id=" + this.registerArr[0]['_id'];
    console.log(pturl)
    this.router.navigateByUrl(pturl)
  }

  direct(){
    const mvurl = "/myvoucher?id=" + this.registerArr[0]['_id'];
    console.log(mvurl)
    this.router.navigateByUrl(mvurl)
  }

  goto()
  {
    const bhurl = "/bookinghistory?id="+ this.registerArr[0]['_id'];
    console.log(bhurl)
    this.router.navigateByUrl(bhurl)
  }

  list()
  {
    const empurl = "/earnmorepoints?id="+ this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

  openDialog() {
    this.dialog.open(LogoutdialogComponent);
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
  }

  acc() {
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

  logout(){
    localStorage.clear();
    const lurl = "/login"
    console.log(lurl)
    this.router.navigateByUrl(lurl)
  }

  home() {
    const hurl = "/home"
    console.log(hurl)
    this.router.navigateByUrl(hurl)
  }

}
