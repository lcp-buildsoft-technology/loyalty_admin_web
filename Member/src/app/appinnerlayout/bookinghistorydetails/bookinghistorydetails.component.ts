import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var angular:any;
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookinghistorydetails',
  templateUrl: './bookinghistorydetails.component.html',
  styleUrls: ['./bookinghistorydetails.component.scss']
})
export class BookinghistorydetailsComponent implements OnInit {

  message: any;
  bookingvenueArr = [];
  outletArr = [];
  public id:any;
  todayDate = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  thumbnail ="";
  booking: any
  remainingslot:number=0;
  outslot:any;

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
    name:'',
    createddate:'',
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
    outletid:'',
    slot:''
  }


  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOutlet();
    this.getBookingvenue();   
    this.getRegister();   

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

  calculateslot()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) =>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
        if(data[i]['_id'] == this.bookingvenue.outletid){
          this.remainingslot = parseInt(this.booking) + parseInt(this.outslot)
          this.outlet._id = this.bookingvenue.outletid;
          this.outlet.slot = this.remainingslot.toString();
          this.http.post('http://165.22.50.213:3001/editoutletslot', this.outlet).subscribe((res:any)=>
          {
            this.message = res;
          });
        }}
    });
}

  editbookingvenuestatus(bookingvenue:any) {
    
    this.bookingvenue._id = this.id;
    this.bookingvenue.status = 'Cancelled';
    this.bookingvenue.createddate = this.todayDate;    
    this.http.post('http://165.22.50.213:3001/editbookingvenue', this.bookingvenue).subscribe((res:any) => {
      this.message = res;
    })
    this.calculateslot();
    const vcdurl = "/venuecanceldetails?id=" + bookingvenue._id;
    console.log(vcdurl)
    this.router.navigateByUrl(vcdurl)
  }

  getBookingvenue()
  {
    this.http.get('http://165.22.50.213:3001/getbookingvenue').subscribe((res:any) => 
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.bookingvenue = {
                _id:data[i]['_id'],
                firstname:data[i]['firstname'],
                lastname:data[i]['lastname'],
                phonenumber:data[i]['phonenumber'],
                _value:data[i]['_value'],                
                date:data[i]['date'],
                time:data[i]['time'],
                outletid:data[i]['outletid'],
                status:data[i]['status'],
                name:data[i]['name'],
                createddate:data[i]['createddate'],
              }             
              this.booking = data[i]['_value']          
             }
             else{}
      }
    });
  }

  getthumbnail()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any)=>
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++)
      {
        this.thumbnail = data[i]['thumbnail'];
      }
    })
  }

  getOutlet()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.bookingvenue.outletid ){
              this.outlet = {
                _id:data[i]['_id'],
                merchantid:data[i]['merchantid'],
                shopname:data[i]['shopname'],
                address:data[i]['address'],
                phone:data[i]['phone'],
                whatsapp:data[i]['whatsapp'],
                email:data[i]['email'],
                operatehrsstart:data[i]['operatehrsstart'],
                operatehrsend:data[i]['operatehrsend'],
                operateday1:data[i]['operateday1'],
                operateday2:data[i]['operateday2'],
                description:data[i]['description'],
                outletid:data[i]['outletid'],
                slot:data[i]['slot']
              }              
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr = data[i]['thumbnail']['contentType'];
              this.outslot = data[i]['slot']    
             }
             else{}
      }        
    });
  }

  lol = [];
  public currentmemberid: any;
  registerArr = [];

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
    const bhurl = "/bookinghistory?id=" + this.registerArr[0]['_id'];
    console.log(bhurl)
    this.router.navigateByUrl(bhurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
