import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';
interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bookingvenuelist',
  templateUrl: './bookingvenuelist.component.html',
  styleUrls: ['./bookingvenuelist.component.scss']
})
export class BookingvenuelistComponent implements OnInit {

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

  outletArr = [];
  searchStore: string = '';
  houtletArr:string[] =[];
  review: number =0
  reviews: number= 0
  shopArr = [];
  booking: number =0;
  remainingslot:number=0;
  outslot:number=0;
  public id:any;
  onoutletArr:string[] =[];

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

  public onoutlet:any = {
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
  selectedValue:any[];
  location: any;

  constructor(private http: HttpClient,private router:Router, private route:ActivatedRoute) 
  {
    this.selectedValue = this.citys; 
  }

  ngOnInit(): void {
    var url= document.URL;
    const myArray = url.split("=");
    var x =  myArray[1].split("%20")
    if(x.length == 1){
      this.id = x[0];
    }
    else{
      this.id = x[0] + " " + x[1];
    }
    
    this.getOutlet(this.selectedValue);
  }

  getOutlet(selectedValue:any)
  {
    this.onoutletArr=[]
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any)=>
    {
      this.outletArr = res['data']
      this.onoutletArr=[]
      for(var i=0; i<this.outletArr.length; i++)
      {                
        if(this.outletArr[i]['state'] == this.id)
        {          
        this.onoutlet = {
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
        this.onoutlet._id = this.outletArr[i]['_id']
        this.onoutlet.merchantid = this.outletArr[i]['merchantid']
        this.onoutlet.shopname = this.outletArr[i]['shopname']
        this.onoutlet.address = this.outletArr[i]['address']
        this.onoutlet.phone= this.outletArr[i]['phone']
        this.onoutlet.whatsapp = this.outletArr[i]['whatsapp']
        this.onoutlet.email = this.outletArr[i]['email']
        this.onoutlet.operatehrsstart = this.outletArr[i]['operatehrsstart']
        this.onoutlet.operatehrsend = this.outletArr[i]['operatehrsend']
        this.onoutlet.operateday1 = this.outletArr[i]['operateday1']
        this.onoutlet.operateday2 = this.outletArr[i]['operateday2']
        this.onoutlet.description = this.outletArr[i]['description']
        this.onoutlet.slot = this.outletArr[i]['slot']
        this.onoutlet.latlong = this.outletArr[i]['latlong']
        this.onoutlet.avgrating = this.outletArr[i]['avgrating']
        this.onoutlet.state = this.outletArr[i]['state']
        this.onoutlet.thumbnail = new Buffer(this.outletArr[i]['thumbnail']['data']).toString('base64');
        this.onoutlet.thumbnailType = this.outletArr[i]['thumbnail']['contentType']          
        this.onoutletArr.push(this.onoutlet);
        }        
      }
    });
    this.location = this.id;
    this.outlet.state = this.location;
  }
  
  open(outlet:any)
  {
    const vdurl = "/bookingvenuedetails?id=" + outlet._id;
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
    const prurl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(prurl)
    this.router.navigateByUrl(prurl)
  }

}