import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';
interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bookingvenuehome',
  templateUrl: './bookingvenuehome.component.html',
  styleUrls: ['./bookingvenuehome.component.scss']
})
export class BookingvenuehomeComponent implements OnInit {

  citys: City[] = [
    {value: '0', viewValue: 'Johor'},
    {value: '1', viewValue: 'Kedah'},
    {value: '2', viewValue: 'Kelantan'},
    {value: '3', viewValue: 'Kuala Lumpur'},
    {value: '4', viewValue: 'Labuan'},
    {value: '5', viewValue: 'Melaka'},
    {value: '6', viewValue: 'Negeri Sembilan'},
    {value: '7', viewValue: 'Pahang'},
    {value: '8', viewValue: 'Penang'},
    {value: '9', viewValue: 'Perak'},
    {value: '10', viewValue: 'Perlis'},
    {value: '11', viewValue: 'Putrajaya'},
    {value: '12', viewValue: 'Selangor'},
    {value: '13', viewValue: 'Sabah'},
    {value: '14', viewValue: 'Sarawak'},
    {value: '15', viewValue: 'Terengganu'},
  ];

  message: any;
  outletArr = []; 
  onoutletArr:string[] =[];
  searconoutlet: string = '';
  selectedValue:any[];
  houtletArr:any[] =[];
  

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.selectedValue = this.citys;
   }

  ngOnInit(): void {    
    this.getRegister();  
    this.getHoutlet();
  }

  detail(venue:any){
    const vdurl = "/bookingvenuedetails?id=" + venue._id;
    console.log(vdurl)
    this.router.navigateByUrl(vdurl)
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

  result()
  {
    const srurl = "/bookingvenuelist?result=" + this.selectedValue;
    console.log(srurl)
    this.router.navigateByUrl(srurl)
  }

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
}