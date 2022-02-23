import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import * as $ from 'jquery';
declare var angular:any;
import { Buffer } from 'buffer';

import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  message: any;
  //tierlevel
  registerArr = [];
  tierlevelArr=[];
  remainingpoints: number=0;
  onregisterArr: string[] = []
  
  //topmerchant
  houtletArr:any[] =[];

  //advertisement
  advertisementArr = [];
  onadvertisementArr:any= [];

  //booking
  onbookingvenueArr = [];
  bookingvenueArr = [];
  onbookingeventArr = [];
  bookingeventArr = [];

  //voucher
  voucherArr = []; 
  hvoucherArr:string[] =[]
  //venues
  outletArr = [];
  
  //event
  eventArr = []; 
  heventArr:string[] =[]; 
  
  todayDate = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;  

  public id:any;
  public srch =[];

  //tierlevel
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

  //topmerchant
  public houtlet:any = {
    _id:'',
    merchantid:'',
    shopname:'',
    address:'',
    phone:'',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:'',  
    slot:'',
    latlong:'',
    thumbnail:'',
    thumbnailType:''     
  }

  //advertisement
  public advertisement = {
      _id:'',
      merchant:'',
      title:'',
      sdate:'',
      edate:'',
      thumbnail:'',
      detail:'',
      pdate:'',
      ptime:'',
      thumbnailType:''
    }

    public onadvertisement:any= {
      _id:'',
      merchant:'',
      title:'',
      sdate:'',
      edate:'',
      thumbnail:'',
      detail:'',
      pdate:'',
      ptime:'',
      thumbnailType:''
    }

  //booking
  public bookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:'',
    length:0
  }

  public onbookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:'',
    length:0
  }  

  public bookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    merchantid:'',
    total:'',
    outletid:'',
    length:0
  }  

  public onbookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    outletid:'',
    length:0
  }

  //vouchers
  public voucher = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    quantity:'',
    discount:'',
    type:'',
    minspend:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    status:'',
    merchantid:'',
    thumbnailType:''
    }

    public hvoucher:any = {
      _id:'',
      title:'',
      thumbnail:'',
      detail:'',
      quantity:'',
      discount:'',
      type:'',
      minspend:'',
      sdate:'',
      edate:'',
      termsandcondition:'',
      status:'',
      merchantid:'',
      thumbnailType:''
    }

  //venues
  public outlet = {
      _id:'',
      merchantid:'',
      shopname:'',
      address:'',
      phone:'',
      whatsapp:'',
      email:'',
      operatehrsstart:'',
      operatehrsend:'',
      operateday1:'',
      operateday2:'',
      description:'',  
      slot:'',
      latlong:'',
      thumbnail:'',
      thumbnailType:''     
    }

  //events 
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
    thumbnail:'',
    thumbnailType:'',
    termsandcondition:'',
    merchantid:'',
    outletid:''
  }

  public hevent:any = {
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
    thumbnail:'',
    thumbnailType:'',
    termsandcondition:'',
    merchantid:'',
    outletid:''
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
  
  isChecked: boolean = false;

  constructor(private renderer: Renderer2, private http: HttpClient, public dialog: MatDialog, private router:Router, private route:ActivatedRoute) {
    //booking
    this.srch = [...this.bookingvenueArr];
    this.srch = [...this.bookingeventArr];
    
   }

  ngOnInit(): void {  
    //tierlevel 
    this.getRegister();
    this.getremainingpoints();
    //topmerchant
    this.getHoutlet();
    //advertisement
    this.getAdvertisement(this.onadvertisementArr);
    //booking
    this.getBookingevent();
    this.getBookingvenue();
    //vouchers
    this.getVoucher();
    //venues
    this.getOutlet(); 
    //events  
    this.getEvent();  

    var url= document.URL;
    // console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    // console.log(this.id); 

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

  doCheck() {
    let html = document.getElementsByTagName('html')[0];
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }
  
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
          if(this.lol[i]['name'] == "")
          {
            alert("Please update name and username in your profile");
            const myurl = "/myaccount?id=" + this.registerArr[0]['_id'];
            console.log(myurl)
            this.router.navigateByUrl(myurl)
          }
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

  points()
  {
    const empurl = "/earnmorepoints?id=" + this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

  current:number=0;
  max: number =0;
  stroke: number = 15;
  radius: number = 65;
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

  //topmerchant
  getHoutlet()
  {
    this.http.get('http://165.22.50.213:3001/gethoutlet').subscribe((res:any)=>
    {
      this.outletArr = res['data']

      for(var i=0; i<this.outletArr.length; i++)
      {
        this.houtlet = {
            _id:'',
            merchantid:'',
            shopname:'',
            address:'',
            phone:'',
            whatsapp:'',
            email:'',
            operatehrsstart:'',
            operatehrsend:'',
            operateday1:'',
            operateday2:'',
            description:'',  
            slot:'',
            latlong:'',
            thumbnail:'',
            thumbnailType:'',
            avgrating:''
        };
        this.houtlet._id = this.outletArr[i]['_id']
        this.houtlet.merchantid = this.outletArr[i]['merchantid']
        this.houtlet.shopname = this.outletArr[i]['shopname']
        this.houtlet.address = this.outletArr[i]['address']
        this.houtlet.phone= this.outletArr[i]['phone']
        this.houtlet.whatsapp = this.outletArr[i]['whatsapp']
        this.houtlet.email = this.outletArr[i]['email']
        this.houtlet.operatehrsstart = this.outletArr[i]['operatehrsstart']
        this.houtlet.operatehrsend = this.outletArr[i]['operatehrsend']
        this.houtlet.operateday1 = this.outletArr[i]['operateday1']
        this.houtlet.operateday2 = this.outletArr[i]['operateday2']
        this.houtlet.description = this.outletArr[i]['description']
        this.houtlet.slot = this.outletArr[i]['slot']
        this.houtlet.avgrating = this.outletArr[i]['avgrating']
        this.houtlet.latlong = this.outletArr[i]['latlong']
        this.houtlet.thumbnail = new Buffer(this.outletArr[i]['thumbnail']['data']).toString('base64');
        this.houtlet.thumbnailType = this.outletArr[i]['thumbnail']['contentType']          
        this.houtletArr.push(this.houtlet);
      }
    });
  }

  oout(outlet:any)
  {
    const sdurl = "/locatestoredetails?id=" + outlet._id;
    console.log(sdurl)
    this.router.navigateByUrl(sdurl)
  }

  //advertisement
  getAdvertisement(onadvertisement:any)
  {
    this.http.get('http://165.22.50.213:3001/gethpublishedad').subscribe((res:any) => 
    {
      this.advertisementArr = res['data'];

      for(var i=0; i < this.advertisementArr.length; i++){
        if(this.advertisementArr[i]['edate'] > this.todayDate){
          this.onadvertisement = {
            _id:'',
            merchant:'',
            title:'',
            sdate:'',
            edate:'',
            thumbnail:'',
            thumbnailType:'',
            detail:'',
            pdate:'',
            ptime:''
          };
          this.onadvertisement._id = this.advertisementArr[i]['_id']
          this.onadvertisement.merchant = this.advertisementArr[i]['merchant']
          this.onadvertisement.title = this.advertisementArr[i]['title']
          this.onadvertisement.sdate = this.advertisementArr[i]['sdate']
          this.onadvertisement.edate = this.advertisementArr[i]['edate']
          this.onadvertisement.detail = this.advertisementArr[i]['detail']
          this.onadvertisement.pdate = this.advertisementArr[i]['pdate']
          this.onadvertisement.ptime = this.advertisementArr[i]['ptime']
          this.onadvertisement.thumbnail = new Buffer(this.advertisementArr[i]['thumbnail']['data']).toString('base64');
          this.onadvertisement.thumbnailType = this.advertisementArr[i]['thumbnail']['contentType']          
          this.onadvertisementArr.push(this.onadvertisement);
        }
        else{}
      }
    });
  }
  
  go(advertisementArr:any){
    const adurl = "/advertisementdetails?id=" + advertisementArr['_id'];
    console.log(adurl)
    this.router.navigateByUrl(adurl)
  }

  //bookinghistory
  history()
  {
    const bhurl = "/bookinghistory?id="+ this.registerArr[0]['_id'];
    console.log(bhurl)
    this.router.navigateByUrl(bhurl)
  }

  getBookingvenue() {
    this.http.get('http://165.22.50.213:3001/getbookingvenue').subscribe((res:any)=> {

      this.bookingvenueArr = res['data'];
      var today = new Date();
      var booked = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id

      for(var i=0; i < this.bookingvenueArr.length; i++){
        if(this.bookingvenueArr[i]['memberid'] == this.currentmemberid)
        {
          if(this.bookingvenueArr[i]['date'] === this.todayDate) {
            if(this.bookingvenueArr[i]['status'] == "Booked")
            {
              this.onbookingvenueArr.push(this.bookingvenueArr[i]); 
            }                   
          }
          else {}  
        }          
      } 
      this.bookingvenue['length'] = this.onbookingvenueArr.length    
    });
  }

  getBookingevent() {
    this.http.get('http://165.22.50.213:3001/getbookingevent').subscribe((res:any)=> {
      this.bookingeventArr = res['data'];

      var today = new Date();
      var booked = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      
      for(var i=0; i < this.bookingeventArr.length; i++){
        if(this.bookingeventArr[i]['memberid'] == this.currentmemberid)
        {
          if((this.bookingeventArr[i]['edate'] >= this.todayDate) && (this.bookingeventArr[i]['sdate'] <= this.todayDate)) {
          this.onbookingeventArr.push(this.bookingeventArr[i]);          
          }
          else {}
        }          
      }     
      this.bookingevent['length'] = this.onbookingeventArr.length
    });
  }
  
  //voucher
  getVoucher()
  {
    this.http.get('http://165.22.50.213:3001/gethvoucher').subscribe((res:any) => 
    {
      this.voucherArr = res['data'];

      for(var i=0; i<this.voucherArr.length; i++)
      {

        if((this.voucherArr[i]['sdate'] <= this.todayDate) && (this.voucherArr[i]['edate'] >= this.todayDate))
        {
          this.hvoucher =
          {
            _id:'',
            title:'',
            thumbnail:'',
            detail:'',
            quantity:'',
            discount:'',
            type:'',
            minspend:'',
            sdate:'',
            edate:'',
            termsandcondition:'',
            status:'',
            merchantid:'',
            thumbnailType:''
          };
          this.hvoucher._id = this.voucherArr[i]['_id']
          this.hvoucher.title = this.voucherArr[i]['title']
          this.hvoucher.detail = this.voucherArr[i]['detail']
          this.hvoucher.quantity = this.voucherArr[i]['quantity']
          this.hvoucher.discount = this.voucherArr[i]['discount']
          this.hvoucher.type = this.voucherArr[i]['type']
          this.hvoucher.minspend = this.voucherArr[i]['minspend']
          this.hvoucher.sdate = this.voucherArr[i]['sdate']
          this.hvoucher.edate = this.voucherArr[i]['edate']
          this.hvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
          this.hvoucher.status = this.voucherArr[i]['status']
          this.hvoucher.merchantid = this.voucherArr[i]['merchantid']
          this.hvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');
          this.hvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']          
          this.hvoucherArr.push(this.hvoucher);
        }
        else{}
      } 
    });
  }

  open(voucher:any)
  {
    const vdurl = "/voucherdetails?id=" + voucher._id;
    console.log(vdurl)
    this.router.navigateByUrl(vdurl)
  }

  //venues
  getOutlet(){
      this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) => {
        this.outletArr = res['data'];
      });
    }

  detail(venue:any){
    const bvdurl = "/bookingvenuedetails?id=" + venue._id;
    console.log(bvdurl)
    this.router.navigateByUrl(bvdurl)
  }

  //events
  getEvent()
  {
    this.http.get('http://165.22.50.213:3001/gethevent').subscribe((res:any) => 
    {
      this.eventArr = res['data'];

      for(var i=0; i<this.eventArr.length; i++)
      {
        if(this.eventArr[i]['sdate'] > this.todayDate)
        {
          this.hevent =
          {
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
            thumbnail:'',
            thumbnailType:'',
            termsandcondition:'',
            merchantid:'',
            outletid:''
          };
          this.hevent._id = this.eventArr[i]['_id']
          this.hevent.eventname = this.eventArr[i]['eventname']
          this.hevent.eventhost = this.eventArr[i]['eventhost']
          this.hevent.sdate = this.eventArr[i]['sdate']
          this.hevent.edate = this.eventArr[i]['edate']
          this.hevent.stime = this.eventArr[i]['stime']
          this.hevent.etime = this.eventArr[i]['etime']
          this.hevent.amount = this.eventArr[i]['amount']
          this.hevent.location = this.eventArr[i]['location']
          this.hevent.description = this.eventArr[i]['description']
          this.hevent.contact = this.eventArr[i]['contact']
          this.hevent.email = this.eventArr[i]['email']
          this.hevent.whatsapp = this.eventArr[i]['whatsapp']
          this.hevent.termsandcondition = this.eventArr[i]['termsandcondition']
          this.hevent.merchantid = this.eventArr[i]['merchantid']
          this.hevent.outletid = this.eventArr[i]['outletid']
          this.hevent.thumbnail = new Buffer(this.eventArr[i]['thumbnail']['data']).toString('base64');
          this.hevent.thumbnailType = this.eventArr[i]['thumbnail']['contentType']
          this.heventArr.push(this.hevent)
        }
        else{}
      }
    });
  } 

  goto(event:any)
  {
    const bedurl = "/bookingeventdetails?id=" + event._id;
    console.log(bedurl)
    this.router.navigateByUrl(bedurl)
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

}
