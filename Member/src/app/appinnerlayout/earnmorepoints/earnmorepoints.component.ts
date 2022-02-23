import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var angular:any;
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-earnmorepoints',
  templateUrl: './earnmorepoints.component.html',
  styleUrls: ['./earnmorepoints.component.scss']
})
export class EarnmorepointsComponent implements OnInit {

  message: any;
  todayDate = "";
  public srch = [];
  public id:any;

  publishedrewardArr = [];  
  onpublishedrewardArr:any[] = [];
  expublishedrewardArr:any[] = [];
  hispublishedrewardArr:any[] =[];

  publishedrewardvoucherArr = [];
  onpublishedrewardvoucherArr:any[] =[];
  expublishedrewardvoucherArr:any[] =[];
  hispublishedrewardvoucherArr:any[] =[];


  registerArr = [];
  tierlevelArr =[];

  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  remainingpoints: number=0;
  points:number=0;

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

  public publishedreward = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    codetype:'',
    reward:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  public onpublishedreward:any = 
  {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    reward:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  public expublishedreward:any = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:'',
    reward:''
  }

  public hispublishedreward:any = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:'',
    reward:''
  }

  public publishedrewardvoucher = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    vtype:'',
    discount:'',
    minspend:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  public expublishedrewardvoucher:any = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    vtype:'',
    discount:'',
    minspend:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  public onpublishedrewardvoucher:any = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    vtype:'',
    discount:'',
    minspend:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  public hispublishedrewardvoucher:any = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    vtype:'',
    discount:'',
    minspend:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    rewardid:'',
    thumbnailType:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { 
    this.srch = [...this.publishedrewardArr];
    this.srch = [...this.publishedrewardvoucherArr];
  }

  ngOnInit(): void {
    this.getremainingpoints();
    this.getPublishedreward();
    this.getPublishedrewardvoucher();

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

  lol = [];
  public currentmemberid: any;
  
  getTierlevel(){
    this.http.get('http://165.22.50.213:3001/gettierlevel').subscribe((res:any)=> {
      this.tierlevelArr = res['data'];
    });
  }
//points
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

  getPublishedrewardvoucher()
  {
    this.http.get('http://165.22.50.213:3001/getpublishedrewardvoucher').subscribe((res:any)=>
    {
      this.publishedrewardvoucherArr = res['data'];

      for(var i=0; i<this.publishedrewardvoucherArr.length; i++)
      {
        if(this.publishedrewardvoucherArr[i]['memberid'] == this.id)
        {
          if((this.publishedrewardvoucherArr[i]['available'] === 'Expired'))
          {
            this.expublishedrewardvoucher = 
            {
              _id:'',
              title:'',
              thumbnail:'',
              detail:'',
              vtype:'',
              discount:'',
              minspend:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:'',
              merchantid:''
            };
            this.expublishedrewardvoucher._id = this.publishedrewardvoucherArr[i]['_id']
            this.expublishedrewardvoucher.title = this.publishedrewardvoucherArr[i]['title']
            this.expublishedrewardvoucher.detail = this.publishedrewardvoucherArr[i]['detail']
            this.expublishedrewardvoucher.codetype = 'Voucher'
            this.expublishedrewardvoucher.vtype = this.publishedrewardvoucherArr[i]['vtype']
            this.expublishedrewardvoucher.discount = this.publishedrewardvoucherArr[i]['discount']
            this.expublishedrewardvoucher.minspend = this.publishedrewardvoucherArr[i]['minspend']
            this.expublishedrewardvoucher.termsandcondition = this.publishedrewardvoucherArr[i]['termsandcondition']
            this.expublishedrewardvoucher.expireddate = this.publishedrewardvoucherArr[i]['expireddate']
            this.expublishedrewardvoucher.available = this.publishedrewardvoucherArr[i]['available']
            this.expublishedrewardvoucher.memberid = this.publishedrewardvoucherArr[i]['memberid']
            this.expublishedrewardvoucher.rewardid = this.publishedrewardvoucherArr[i]['rewardid']
            this.expublishedrewardvoucher.merchantid = this.publishedrewardvoucherArr[i]['merchantid']
            this.expublishedrewardvoucher.thumbnail = new Buffer(this.publishedrewardvoucherArr[i]['thumbnail']['data']).toString('base64');
            this.expublishedrewardvoucher.thumbnailType = this.publishedrewardvoucherArr[i]['thumbnail']['contentType']
            this.expublishedrewardvoucherArr.push(this.expublishedrewardvoucher);
          }
          else if((this.publishedrewardvoucherArr[i]['available'] === 'Claimed'))
          {
            this.hispublishedrewardvoucher = 
            {
              _id:'',
              title:'',
              thumbnail:'',
              detail:'',
              vtype:'',
              discount:'',
              minspend:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:''
            };
            this.hispublishedrewardvoucher._id = this.publishedrewardvoucherArr[i]['_id']
            this.hispublishedrewardvoucher.title = this.publishedrewardvoucherArr[i]['title']
            this.hispublishedrewardvoucher.detail = this.publishedrewardvoucherArr[i]['detail']
            this.hispublishedrewardvoucher.codetype = 'Voucher'
            this.hispublishedrewardvoucher.vtype = this.publishedrewardvoucherArr[i]['vtype']
            this.hispublishedrewardvoucher.discount = this.publishedrewardvoucherArr[i]['discount']
            this.hispublishedrewardvoucher.minspend = this.publishedrewardvoucherArr[i]['minspend']
            this.hispublishedrewardvoucher.termsandcondition = this.publishedrewardvoucherArr[i]['termsandcondition']
            this.hispublishedrewardvoucher.expireddate = this.publishedrewardvoucherArr[i]['expireddate']
            this.hispublishedrewardvoucher.available = this.publishedrewardvoucherArr[i]['available']
            this.hispublishedrewardvoucher.memberid = this.publishedrewardvoucherArr[i]['memberid']
            this.hispublishedrewardvoucher.rewardid = this.publishedrewardvoucherArr[i]['rewardid']
            this.hispublishedrewardvoucher.merchantid = this.publishedrewardvoucherArr[i]['merchantid']
            this.hispublishedrewardvoucher.thumbnail = new Buffer(this.publishedrewardvoucherArr[i]['thumbnail']['data']).toString('base64');
            this.hispublishedrewardvoucher.thumbnailType = this.publishedrewardvoucherArr[i]['thumbnail']['contentType']
            this.hispublishedrewardvoucherArr.push(this.hispublishedrewardvoucher);
          }
          else
          {
            this.onpublishedrewardvoucher = 
            {
              _id:'',
              title:'',
              thumbnail:'',
              detail:'',
              vtype:'',
              discount:'',
              minspend:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:''
            };
            this.onpublishedrewardvoucher._id = this.publishedrewardvoucherArr[i]['_id']
            this.onpublishedrewardvoucher.title = this.publishedrewardvoucherArr[i]['title']
            this.onpublishedrewardvoucher.detail = this.publishedrewardvoucherArr[i]['detail']
            this.onpublishedrewardvoucher.codetype = 'Voucher'
            this.onpublishedrewardvoucher.vtype = this.publishedrewardvoucherArr[i]['vtype']
            this.onpublishedrewardvoucher.discount = this.publishedrewardvoucherArr[i]['discount']
            this.onpublishedrewardvoucher.minspend = this.publishedrewardvoucherArr[i]['minspend']
            this.onpublishedrewardvoucher.termsandcondition = this.publishedrewardvoucherArr[i]['termsandcondition']
            this.onpublishedrewardvoucher.expireddate = this.publishedrewardvoucherArr[i]['expireddate']
            this.onpublishedrewardvoucher.available = this.publishedrewardvoucherArr[i]['available']
            this.onpublishedrewardvoucher.memberid = this.publishedrewardvoucherArr[i]['memberid']
            this.onpublishedrewardvoucher.rewardid = this.publishedrewardvoucherArr[i]['rewardid']
            this.onpublishedrewardvoucher.merchantid = this.publishedrewardvoucherArr[i]['merchantid']
            this.onpublishedrewardvoucher.thumbnail = new Buffer(this.publishedrewardvoucherArr[i]['thumbnail']['data']).toString('base64');
            this.onpublishedrewardvoucher.thumbnailType = this.publishedrewardvoucherArr[i]['thumbnail']['contentType']
            this.onpublishedrewardvoucherArr.push(this.onpublishedrewardvoucher);
          }
        }
      }
    });
  }

  getPublishedreward()
  {
    this.http.get('http://165.22.50.213:3001/getpublishreward').subscribe((res:any)=>
    {
      this.publishedrewardArr = res['data'];

      for(var i=0; i<this.publishedrewardArr.length; i++)
      {
        if(this.publishedrewardArr[i]['memberid'] == this.id)
        {
          if((this.publishedrewardArr[i]['available'] === 'Expired'))
          {
            this.expublishedreward = 
            {
              _id:'',
              title:'',
              reward:'',
              thumbnail:'',
              detail:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:'',
            };
            this.expublishedreward._id = this.publishedrewardArr[i]['_id']
            this.expublishedreward.title = this.publishedrewardArr[i]['title']
            this.expublishedreward.detail = this.publishedrewardArr[i]['detail']
            this.expublishedreward.codetype = 'Rewards'
            this.expublishedreward.reward = this.publishedrewardArr[i]['reward']
            this.expublishedreward.termsandcondition = this.publishedrewardArr[i]['termsandcondition']
            this.expublishedreward.expireddate = this.publishedrewardArr[i]['expireddate']
            this.expublishedreward.available = this.publishedrewardArr[i]['available']
            this.expublishedreward.memberid = this.publishedrewardArr[i]['memberid']
            this.expublishedreward.rewardid = this.publishedrewardArr[i]['rewardid']
            this.expublishedreward.thumbnail = new Buffer(this.publishedrewardArr[i]['thumbnail']['data']).toString('base64');
            this.expublishedreward.thumbnailType = this.publishedrewardArr[i]['thumbnail']['contentType']
            this.expublishedrewardArr.push(this.expublishedreward);
          }
          else if((this.publishedrewardArr[i]['available'] === 'Claimed'))
          {
            this.hispublishedreward = 
            {
              _id:'',
              title:'',
              reward:'',
              thumbnail:'',
              detail:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:''
            };
            this.hispublishedreward._id = this.publishedrewardArr[i]['_id']
            this.hispublishedreward.title = this.publishedrewardArr[i]['title']
            this.hispublishedreward.detail = this.publishedrewardArr[i]['detail']
            this.hispublishedreward.codetype = 'Rewards'
            this.hispublishedreward.reward = this.publishedrewardArr[i]['reward']
            this.hispublishedreward.termsandcondition = this.publishedrewardArr[i]['termsandcondition']
            this.hispublishedreward.expireddate = this.publishedrewardArr[i]['expireddate']
            this.hispublishedreward.available = this.publishedrewardArr[i]['available']
            this.hispublishedreward.memberid = this.publishedrewardArr[i]['memberid']
            this.hispublishedreward.rewardid = this.publishedrewardArr[i]['rewardid']
            this.hispublishedreward.thumbnail = new Buffer(this.publishedrewardArr[i]['thumbnail']['data']).toString('base64');
            this.hispublishedreward.thumbnailType = this.publishedrewardArr[i]['thumbnail']['contentType']
            this.hispublishedrewardArr.push(this.hispublishedreward);
          }
          else{
            this.onpublishedreward =
            {
              _id:'',
              title:'',
              thumbnail:'',
              detail:'',
              codetype:'',
              termsandcondition:'',
              expireddate:'',
              available:'',
              memberid:'',
              rewardid:'',
              thumbnailType:'',
              reward:''
            };
            this.onpublishedreward._id = this.publishedrewardArr[i]['_id']
            this.onpublishedreward.title = this.publishedrewardArr[i]['title']
            this.onpublishedreward.detail = this.publishedrewardArr[i]['detail']
            this.onpublishedreward.codetype = 'Rewards'
            this.onpublishedreward.reward = this.publishedrewardArr[i]['reward']
            this.onpublishedreward.termsandcondition = this.publishedrewardArr[i]['termsandcondition']
            this.onpublishedreward.expireddate = this.publishedrewardArr[i]['expireddate']
            this.onpublishedreward.available = this.publishedrewardArr[i]['available']
            this.onpublishedreward.memberid = this.publishedrewardArr[i]['memberid']
            this.onpublishedreward.rewardid = this.publishedrewardArr[i]['rewardid']
            this.onpublishedreward.thumbnail = new Buffer(this.publishedrewardArr[i]['thumbnail']['data']).toString('base64');
            this.onpublishedreward.thumbnailType = this.publishedrewardArr[i]['thumbnail']['contentType']
            this.onpublishedrewardArr.push(this.onpublishedreward);
          }
        }   
      }
    });
  }

  open(publishedrewardArr:any)
  {
    if(publishedrewardArr['available'] == "Available"){
      const epdurl = "/earnpointsdetails?id=" + publishedrewardArr['_id'];
      console.log(epdurl)
      this.router.navigateByUrl(epdurl)
    }
    else {
      const epcurl = "/earnpointsclaimed?id=" + publishedrewardArr['_id'];
      console.log(epcurl)
      this.router.navigateByUrl(epcurl)
    }
  }

  go(publishedrewardvoucherArr:any){
    if(publishedrewardvoucherArr['available'] == "Available"){
      const rvdurl = "/rewardsvoucherdetails?id=" + publishedrewardvoucherArr['_id'];
      console.log(rvdurl)
      this.router.navigateByUrl(rvdurl)
    }
    else {
      const rvcurl = "/rewardvoucherclaimed?id=" + publishedrewardvoucherArr['_id'];
      console.log(rvcurl)
      this.router.navigateByUrl(rvcurl)
    }
  }

  gopoints()
  {
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