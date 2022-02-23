import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import * as $ from 'jquery';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

interface City {
  value: string;
  viewValue: string;
}

declare var angular: any;

@Component({
  selector: 'app-locatestorehome',
  templateUrl: './locatestorehome.component.html',
  styleUrls: ['./locatestorehome.component.scss']
})
export class LocatestorehomeComponent implements OnInit {

  outletArr = [];
  searchStore: string = '';
  houtletArr:string[] =[];
  review: number =0
  reviews: number= 0
  storereviewArr = [];
  shopArr = [];
  // selectedValue: any[];
  selectAll = [];

  citys: City[] = [
    {value: '0', viewValue: 'All'},
    {value: '1', viewValue: 'Johor'},
    {value: '2', viewValue: 'Kedah'},
    {value: '3', viewValue: 'Kelantan'},
    {value: '4', viewValue: 'Kuala Lumpur'},
    {value: '5', viewValue: 'Labuan'},
    {value: '6', viewValue: 'Melaka'},
    {value: '7', viewValue: 'Negeri Sembilan'},
    {value: '8', viewValue: 'Pahang'},
    {value: '9', viewValue: 'Penang'},
    {value: '10', viewValue: 'Perak'},
    {value: '11', viewValue: 'Perlis'},
    {value: '12', viewValue: 'Putrajaya'},
    {value: '13', viewValue: 'Selangor'},
    {value: '14', viewValue: 'Sabah'},
    {value: '15', viewValue: 'Sarawak'},
    {value: '16', viewValue: 'Terengganu'},
  ];

  public storereview = {
    _id:'',
    ratings:'',
    storereview:'',
    outletid:'',
    createdAt:'',
    createdTIme:''
  }

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
    thumbnailType:'',
    avgrating:'',
    state:''
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
    thumbnailType:'',
    avgrating:'',
    state:''
  }
  selectedValue = this.citys[0].viewValue;

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.getRegister();
    this.getAll()
  }

  getAll()
  {
    this.houtletArr=[]
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any)=>
    {
      this.outletArr = res['data']
      this.houtletArr=[]
      for(var i=0; i<this.outletArr.length; i++)
      {        
        if(this.selectedValue === 'All')
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
            avgrating:'',
            state:''
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
        this.houtlet.latlong = this.outletArr[i]['latlong']
        this.houtlet.avgrating = this.outletArr[i]['avgrating']
        this.houtlet.state = this.outletArr[i]['state']
        this.houtlet.thumbnail = new Buffer(this.outletArr[i]['thumbnail']['data']).toString('base64');
        this.houtlet.thumbnailType = this.outletArr[i]['thumbnail']['contentType']          
        this.houtletArr.push(this.houtlet);
        }        
      }
    });

  }

  getOutlet(selectedValue:any)
  {
    this.houtletArr=[]
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any)=>
    {
      this.outletArr = res['data']
      this.houtletArr=[]
      for(var i=0; i<this.outletArr.length; i++)
      {
        
        if(this.outletArr[i]['state'] == this.selectedValue)
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
            avgrating:'',
            state:''
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
        this.houtlet.latlong = this.outletArr[i]['latlong']
        this.houtlet.avgrating = this.outletArr[i]['avgrating']
        this.houtlet.state = this.outletArr[i]['state']
        this.houtlet.thumbnail = new Buffer(this.outletArr[i]['thumbnail']['data']).toString('base64');
        this.houtlet.thumbnailType = this.outletArr[i]['thumbnail']['contentType']          
        this.houtletArr.push(this.houtlet);
        }        
      }
    });
  }

  open(outlet:any)
  {
    const sdurl = "/locatestoredetails?id=" + outlet._id;
    console.log(sdurl)
    this.router.navigateByUrl(sdurl)
  }
  public id:any;
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
    this.router.navigate(['/home']);
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}