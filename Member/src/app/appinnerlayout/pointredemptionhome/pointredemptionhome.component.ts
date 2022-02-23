import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';
interface date {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pointredemptionhome',
  templateUrl: './pointredemptionhome.component.html',
  styleUrls: ['./pointredemptionhome.component.scss']
})
export class PointredemptionhomeComponent implements OnInit {
  selectedValue!: string;
  message: any;

  onlinestoreArr = [];
  canonlinestoreArr=[];
  pastonlinestoreArr=[];

  userproductArr = [];
  onuserproductArr = [];

  tierlevelArr=[];
  registerArr = [];
  remainingpoints: number=0;

  public id: any;
  
  searchRedemption: string = ''; 
  totalpoints ="";

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

  public onlinestore = {
    _id:'',
    name:'',
    description:'',
    price:'',
    merchantid:'',
    outletid:'',
    redemp:'',
    tnc:'',
  }

  public canonlinestore= {
    _id:'',
    name:'',
    description:'',
    price:'',
    merchantid:'',
    outletid:'',
    redemp:'',
    tnc:'',
  }

  public pastonlinestore= {
    _id:'',
    name:'',
    description:'',
    price:'',
    merchantid:'',
    outletid:'',
    redemp:'',
    tnc:'',
  }

  public userproduct = {
    _id:'',
    name:'',
    description:'',
    price:'',
    onlinestoreid:'',
    status:'',
    totalpoints:'',
    merchantid:'',
    redemp:'',
    tnc:'',
    outletid:'',
    thumbnail:'',
    codetype:'',
    memberid:''
  }  

  dates: date[] = [
    {value: 'This-month', viewValue: 'This Month'},
    {value: 'This Week', viewValue: 'This Week'},
  ];
  pointsredeem: any;

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getremainingpoints();
    
    this.getUserproduct();
    this.gettotalpoints();

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
            this.current = this.registerArr[i]['pointscollect'] - parseInt(res['datatierlevel'][0]['Gold'])
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

  gettotalpoints()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
          this.totalpoints = this.lol[i]['totalpoints']
        }
      }
      this.getOnlinestore();
    });
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

  getOnlinestore() {
    this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=> {
      this.onlinestoreArr = res['data'];
      for (let i = 0; i < this.onlinestoreArr.length; i++) {
        if(this.onlinestoreArr[i]['redemp'] != ""){
          if(parseInt(this.onlinestoreArr[i]['redemp']) <= parseInt(this.totalpoints))
          {
           this.canonlinestoreArr.push(this.onlinestoreArr[i]);
          }
          else{
            this.pastonlinestoreArr.push(this.onlinestoreArr[i]);
          }
        }
        else{}          
      }   
    });    
  }

  getUserproduct(){
    this.http.get('http://165.22.50.213:3001/getuserproduct').subscribe((res:any) => 
    {
      this.userproductArr = res['data'];
      for(var i=0; i<this.userproductArr.length; i++)
      {
        if(this.userproductArr[i]['memberid'] == this.id)
        {
          this.onuserproductArr.push(this.userproductArr[i]);
        }
      }
    });    
  }

  open(onlinestore:any)
  {
    const rdurl = "/redemptiondetails?id=" + onlinestore._id;
    console.log(rdurl)
    this.router.navigateByUrl(rdurl)
  }

  go(onlinestore:any)
  {
    const urdurl = "/upredeemdetails?id=" + onlinestore._id;
    console.log(urdurl)
    this.router.navigateByUrl(urdurl)
  }

  goto(userproduct:any)
  {
    if(userproduct.status=="Pending") {
      const rpurl = "/redemptionpending?id=" + userproduct.onlinestoreid;
      console.log(rpurl)
      this.router.navigateByUrl(rpurl)
    } 
    else {
      const rrurl = "/redemptionredeemed?id=" + userproduct.onlinestoreid;
      console.log(rrurl)
      this.router.navigateByUrl(rrurl)
    } 
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

  points()
  {
    const empurl = "/earnmorepoints?id=" + this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

}
