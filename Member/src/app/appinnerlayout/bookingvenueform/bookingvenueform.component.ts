import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookingvenueform',
  templateUrl: './bookingvenueform.component.html',
  styleUrls: ['./bookingvenueform.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class BookingvenueformComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  message: any;
  bookingvenueArr = [];
  public srch = [];
  public id: any;
  venueArr = []; 
  outletArr = [];
  todayDate = "";
  memberid = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  booking: number =0;
  remainingslot:number=0;
  outslot:number=0;

  public venueObj = {
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
    arrv:'',
    memberid:''
  };

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router:Router,
    private route:ActivatedRoute
  ) { this.srch = [...this.bookingvenueArr];}

  ngOnInit(): void {
    this.getOutlet();
    this.getmemberid();
    this.getBookingvenue();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
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

  myFormGroup = new FormGroup({
    formField: new FormControl()
  });

  _value: number = 1;
  _step: number = 1;
  _min: number = 1;
  _max: number = Infinity;
  _wrap: boolean = false;

  @Input('value')
  set inputValue(_value: number) {
    this._value = this.parseNumber(_value);
  }

  @Input()
  set step(_step: number) {
    this._step = this.parseNumber(_step);
  }

  @Input()
  set min(_min: number) {
    this._min = this.parseNumber(_min);
  }

  @Input()
  set max(_max: number) {
    this._max = this.parseNumber(_max);
  }

  @Input()
  set wrap(_wrap: boolean) {
    this._wrap = this.parseBoolean(_wrap);
  }

  private parseNumber(num: any): number {
    return +num;
  }

  private parseBoolean(bool: any): boolean {
    return !!bool;
  }

  incrementValue(step: number = 1): void {

    let inputValue = this._value + step;

    if (this._wrap) {
      inputValue = this.wrappedValue(inputValue);
    }

    this._value = inputValue;
  }

  private wrappedValue(inputValue: number) {
    if (inputValue > this._max) {
      return this._min + inputValue - this._max;
    }

    if (inputValue < this._min) {

      if (this._max === Infinity) {
        return 0;
      }

      return this._max + inputValue;
    }

    return inputValue;
  }

  shouldDisableDecrement(inputValue: number): boolean {
    return !this._wrap && inputValue <= this._min;
  }

  shouldDisableIncrement(inputValue: number): boolean {
    return !this._wrap && inputValue >= this._max;
  }

  getBookingvenue()
  {
    this.http.get('http://165.22.50.213:3001/getbookingvenue').subscribe((res:any) => 
    {
      this.bookingvenueArr = res['data'];

      for(var i=0; i<this.bookingvenueArr.length; i++)
      {
        if(this.bookingvenueArr[i]['outletid'] == this.id)
        {
          if(this.bookingvenueArr[i]['date'] === this.todayDate)
          {
            this.booking += parseInt(this.bookingvenueArr[i]['_value']);
          }          
        }
      }
    });
  }

  upbooking:number=0;
  upremainingslot:number=0;
  //Submit button
  Bookingvenue(venueObj:any) {
    this.venueObj.outletid = this.id;
    this.venueObj.status = 'Booked';
    this.venueObj.name = this.outlet.shopname;
    this.venueObj.createddate = this.todayDate;
    this.venueObj._value = this._value.toString();
    this.venueObj.arrv = "";
    this.venueObj.memberid = this.currentmemberid;
    this.calculateslot();
    console.log(venueObj);
    console.log(this.calculateslot());
  }

  calculateslot()
  {
    this.venueObj.outletid = this.id;
    this.venueObj.status = 'Booked';
    this.venueObj.name = this.outlet.shopname;
    this.venueObj.createddate = this.todayDate;
    this.venueObj._value = this._value.toString();
    this.venueObj.arrv = "";
    this.venueObj.memberid = this.currentmemberid;
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) =>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
        if(data[i]['_id'] == this.id ){    
          if(this.venueObj.date === this.todayDate)
          {
            this.remainingslot = parseInt(data[i]['originalslot']) - this.booking - this._value
            this.http.post('http://165.22.50.213:3001/bookingvenue', this.venueObj).subscribe((res:any) => {
              console.log(res);
              this.message = res;
            });
            this.outlet._id = this.id;
            this.outlet.slot = this.remainingslot.toString();
            this.http.post('http://165.22.50.213:3001/editoutletslot', this.outlet).subscribe((res:any)=> {
            console.log(res);
            this.message = res;
            });
          }
          else
          {
            this.http.get('http://165.22.50.213:3001/getbookingvenue').subscribe((res:any)=>
            {
              this.bookingvenueArr = res['data']
              for(var i=0; i<this.bookingvenueArr.length; i++)
              {
                if(this.bookingvenueArr[i]['outletid'] == this.id)
                {
                  if(this.bookingvenueArr[i]['date'] === this.venueObj.date)
                  {
                    this.upbooking += parseInt(this.bookingvenueArr[i]['_value']);
                    this.upremainingslot = this.outslot - this.upbooking
                    if(this.upremainingslot - this._value >= 0)
                    {
                      this.http.post('http://165.22.50.213:3001/bookingvenue', this.venueObj).subscribe((res:any) => {
                        console.log(res);
                        this.message = res;
                      })
                    }
                    else
                    {
                      alert("Unable to book due to insufficient remaining slot. Please book on another date.");
                      const bfurl = "/bookingvenueform?id=" + this.outlet._id;
                      console.log(bfurl)
                      this.router.navigateByUrl(bfurl)
                    }
                  }          
                }
              }
            })
          }     
        }
      }
      alert("Your booking was successful!");
      const vdurl = "/bookingvenuehome";
      // const vdurl = "/bookingvenuedetails?id=" + this.outlet._id;
      console.log(vdurl)
      this.router.navigateByUrl(vdurl)
    });
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
    avgrating:'' ,
    originalslot:''
  }

  lol = [];
  public currentmemberid: any;
  registerArr = [];
  
  getmemberid(){
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any)=>
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

  getOutlet()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) =>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
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
                slot:data[i]['slot'],
                latlong:data[i]['latlong'],
                avgrating:data[i]['avgrating'],
                originalslot:data[i]['originalslot']
              }
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr = data[i]['thumbnail']['contentType'];  
              this.outslot = data[i]['originalslot']                      
             }
             else{}             
      }        
    });
  }

  goto()
  {
    const vdurl = "/bookingvenuedetails?id=" + this.outlet._id;
    console.log(vdurl)
    this.router.navigateByUrl(vdurl)
  }

  backnav() {
    const vdurl = "/bookingvenuedetails?id=" + this.outlet._id;
    console.log(vdurl)
    this.router.navigateByUrl(vdurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
