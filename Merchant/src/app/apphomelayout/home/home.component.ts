import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var angular:any;
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { threadId } from 'worker_threads';
import { ActivatedRoute, OutletContext } from '@angular/router';
import { Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isChecked: boolean = false;
  message: any;
  outlet:any
  vouchersmonth:any;
  pointsmonth:any;
  monthname:any
  pointsmontharr=[];
  pointsyeararr=[];
  showmoutletarr=[]
  pointsgivenArr=[]
  filteredValue:any;
  pointsyear:any;
  public memberID:any = [];
  vouchersmontharr=[];
  vouchersyeararr=[];
  vouchersyear:any;
  avgrating:any;
  public UserproductArr = [];
  moutletArr = [];
  public srch =[];
  todayDate="";
  eventArr = [];
  todayeventArr = [];
  venueArr = [];
  memberArr =[];
  monthArr =[];
  todayArr=[];
  vtodayArr=[];
  vmonthArr=[];

  todayvenueArr=[];
  scanArr=[];
  reviewArr=[];

  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.moutletArr];
    this.srch = [...this.eventArr];
  }

   public event = {
    _id:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    amount:'',
    location:'',
    description:'',
    contact:'',
    email:'',
    whatsapp:'',
    length:0,
    outletid:''
  };

  public moutlet = {
    _id:'',
    merchantid:'',
    shopname:'',
    address:'',
    phone: '',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:''
  };

  public month = {
    length:0,
    month:'',
    id:""
  }; 
    
  public today = {
    length:0
  };

  public vouchertoday = {
    length:0
  };

  public userp = {
    length:0
  };

  public vouchermonth = {
    length:0
  };

  public review = {
    review:0,
    reviews:0
  }

  public venue = {
    firstname:'',
    _value: '',
    date:'',
    lastname:'',
    phonenumber:'',
    time:'',
    length:0
  };

  public pointsandvoucher: any = {
    outletid: '',
    membername: '',
    voucherid: '',
    pointsget: '',
    thumbnail: '',
    thumbnailType: '',
    merchantid: '',
    productname: '',
    createddate: '',
    title: '',
  };
  
  public doutlet = {
    shopname:'',
    operatehrsstart:'',
    operatehrsend:''
  };

  public member = {
    phonenumber:'',
    name: '',
    emailaddress:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    length:0
  };    

  public userproduct = {
    _id:'',
    name: '',
    createddate:'',
    points:'',
    memberid:'',
    membername:'',
    merchantid:'',
    outletid:''
  };
  
  public pointsgiven:any = {
    outletid:'',
  };

  public pointsgivenArray:any = [];
  public mid:any;

  ngOnInit() {
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    this.getOutlet(mlogin.merchantid);
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    console.log(moutlet)
    this.avgrating = moutlet.avgrating
    console.log(moutlet._id)

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.mid = myArray[1];

    this.doutlet.shopname= moutlet.shopname
    this.doutlet.operatehrsstart= moutlet.operatehrsstart
    this.doutlet.operatehrsend= moutlet.operatehrsend
   
    this.getEvent(moutlet._id)
    this.getBooking(moutlet._id)
    this.getVoucherRedemption(moutlet._id)
    this.getMember();
    console.log(this.moutlet._id)
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
  }

  getUserproduct(id:any){
    this.month.id = id
    this.userproduct.outletid = id;

    this.http.post('http://165.22.50.213:3001/getproductanduserproduct',this.userproduct).subscribe((res:any) => {
      this.UserproductArr = res['data'] ;
      this.month.length = this.UserproductArr.length;
      console.log(res['data'])

      var today = new Date();
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1
      var nn = today.getMonth() 
      console.log(mm)

      this.monthname= this.monthNames[nn]
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

      for(var i = 0 ; i < this.UserproductArr.length ; i++) {
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        if(this.UserproductArr[i]['createddate'] == date) {
          console.log(this.UserproductArr[i]['createddate'])
          console.log(this.todayDate)
          this.todayArr.push(this.UserproductArr[i]) ;
          this.userp.length = this.todayArr.length
        }
        
        this.pointsmonth = this.UserproductArr[i]['createddate'];
        this.pointsmontharr = this.pointsmonth.split("-");
        this.pointsmonth = this.pointsmontharr[1]
        this.pointsyear = this.pointsmontharr[0]
        console.log(this.pointsmonth)
        console.log(this.pointsyear)  
        console.log(mm)
        console.log(yyyy)

        if((this.pointsmonth == mm)&&(this.pointsyear == yyyy)) {
          this.monthArr.push(this.UserproductArr[i]) ;
          this.month.length=  this.monthArr.length
        }
      }
    });
  }

  getVoucherRedemption(id:any) {
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.pointsandvoucher.outletid = moutlet._id;

    this.http.post('http://165.22.50.213:3001/gethomepoints', this.pointsandvoucher) .subscribe((res:any) => {    
      this.scanArr = res['data'] ;

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
      console.log(this.todayDate)
          
      for(var i = 0 ; i < this.scanArr.length ; i++) {
        this.vouchersmonth = this.scanArr[i]['createddate'];
        this.vouchersmontharr = this.vouchersmonth.split("-");
        this.vouchersmonth = this.vouchersmontharr[1]
        this.vouchersyear = this.vouchersmontharr[0]
             
        if(((this.vouchersmonth == mm)&&(this.vouchersyear == yyyy)) && (this.scanArr[i]['type'] == 'voucher')) {
          this.vmonthArr.push(this.scanArr[i]) ;
        }
   
        if((this.scanArr[i]['createddate'] ==this.todayDate) && (this.scanArr[i]['type'] == 'voucher')) {
          this.vtodayArr.push(this.scanArr[i]) ;
        }
      }
           
   
    });
  }


  Transfer(id:any) {
    console.log(id)
    var name= $("#clickbtn_"+id).attr('name')+"";    
    this.moutlet._id = id

    this.http.post('http://165.22.50.213:3001/getonemoutlet',this.moutlet).subscribe((res:any) => {
      this.moutletArr = res['data'] ;
      console.log(this.moutletArr)
      var x = this.moutletArr[0]
      localStorage.setItem("Moutlet", JSON.stringify(x));
      console.log(this.moutletArr)
      console.log(res)
      console.log(res['data'])
      
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/home']);  
    });
  }

  getEvent(name:any) {
    console.log(name)
    this.event['length']=0;
    this.todayeventArr.length =0;
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.event.outletid = moutlet._id

    this.http.post('http://165.22.50.213:3001/getoutletevent',this.event).subscribe((res:any) => { 
      this.eventArr = res['data'] ;

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

      for(var i = 0 ; i < this.eventArr.length ; i++) {
        if(this.eventArr[i]['outletid'] == name) {
          if((this.eventArr[i]['edate'] >=this.todayDate)&&(this.eventArr[i]['sdate'] <= this.todayDate )) {    
            this.todayeventArr.push(this.eventArr[i]);
               
          }
        }
      }

      console.log(this.todayeventArr.length);
      this.event['length']=this.todayeventArr.length;
      console.log(this.event['length']);     
    });
  }

  getMember() {
    this.member['length'] = 0;
    this.memberArr.length = 0;
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.pointsgiven.outletid = moutlet._id

    this.http.post('http://165.22.50.213:3001/getpointsgivens', this.pointsgiven).subscribe((res:any) => {
      this.pointsgivenArr = res['data'];
      

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
            totalget += parseInt(this.pointsgivenArr[j]['pointsget'])
            totaluse += parseInt(this.pointsgivenArr[j]['pointsused'])
            membername = this.pointsgivenArr[j]['membername'];
          }
        }
        this.pointsgivenArray.push({'memberID': this.memberID[i], 'totalget': totalget, 'totalused': totaluse, 'membername': membername});
      }
      
    });
  }

  getBooking(name:any){
    this.venue['length']=0;
    this.todayvenueArr.length =0; 
    var data:any = {
      'outletid':name
    };

    this.http.get('http://165.22.50.213:3001/getvenue').subscribe((res:any) => {
      this.venueArr = res['data'] ;
      console.log(this.venueArr)
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
    
      for(var i = 0 ; i < this.venueArr.length ; i++){
        if(this.venueArr[i]['outletid'] == name)   
          if (this.venueArr[i]['date'] == this.todayDate){
            this.todayvenueArr.push(this.venueArr[i]);
          }  
      }
      this.venue['length']=this.todayvenueArr.length; 
    });
  }

  gopoints(userproduct:any){
    const redurl = "/redemption?id=" + this.userproduct._id
    console.log(redurl)
    this.router.navigateByUrl(redurl)
  }

  getOutlet(id:any) {
    console.log(id)
    this.moutlet.merchantid = id

    this.http.post('http://165.22.50.213:3001/getmoutlet',this.moutlet).subscribe((res:any) => {
      this.showmoutletarr = res['data'] ;
      if(res['data'] == null){
        this.router.navigate(['/outletsettings'])
      }
      console.log(id)
    });
  }

  doCheck() {
    let html = document.getElementsByTagName('html')[0];
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }

  Transfernow(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
   
    const redurl = "/redemption?id=" + name
    console.log(redurl)
    this.router.navigateByUrl(redurl)

  }

  Transferevent(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
   
    const elurl = "/eventlist?id=" + name
    console.log(elurl)
    this.router.navigateByUrl(elurl)

  }

  Transferbooking(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
   
    const burl = "/booking?id=" + name
    console.log(burl)
    this.router.navigateByUrl(burl)

  }

  Transfermember(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
   
    const mdurl = "/memberdata?id=" + name
    console.log(mdurl)
    this.router.navigateByUrl(mdurl)
  }

  Transferreview(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
   
    const revurl = "/review?id=" + name
    console.log(revurl)
    this.router.navigateByUrl(revurl)
  }
}
