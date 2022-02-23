import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ActivatedRoute, Router } from '@angular/router';

declare var angular: any;

@Component({
  selector: 'app-bookingeventpayment',
  templateUrl: './bookingeventpayment.component.html',
  styleUrls: ['./bookingeventpayment.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class BookingeventpaymentComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  message: any;
  bookingeventArr = [];
  public srch = [];
  eventArr = []; 
  public id:any;
  todayDate = "";
  lastbookingeventArr = [];
  public image: any;
  public images: any;
  public imagetype: any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  booking: number =0;
  remainingslot:number=0;
  outslot:number=0;

  url=('../../../assets/img/blankimg.png');
  totalpay:number=0;
  memberid = "";

  public register = {
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
    createdat:''
  }  

  public eventObj = {
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
    merchantid:'',
    outletid:'',
    receipt:'',
    memberid:''
  };

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
    termsandcondition:'',
    merchantid:'',
    outletid:'',
    slot:''
  }

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient, private router:Router, private route:ActivatedRoute
  ) {
    this.srch = [...this.bookingeventArr];
   }

  ngOnInit(): void {    
    
    this.getEvent();
    this.getmemberid();
    this.getBookingevent();

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

  calculatetotal(){
    this.totalpay = this._value * parseFloat(this.event['amount']);
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

  calculateslot()
  {
    this.http.get('http://165.22.50.213:3001/getevent').subscribe((res:any) =>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
        if(data[i]['_id'] == this.id ){
          this.remainingslot = this.outslot - this._value
          this.event._id = this.id;
          this.event.slot = this.remainingslot.toString();
          
          this.http.post('http://165.22.50.213:3001/editeventslot', this.event).subscribe((res:any)=>
          {
            this.message = res;
          });
        }}
    });
}

  getBookingevent()
  {
    this.http.get('http://165.22.50.213:3001/getbookingevent').subscribe((res:any) => 
    {
      this.bookingeventArr = res['data'];

      for(var i=0; i<this.bookingeventArr.length; i++)
      {
        if(this.bookingeventArr[i]['eventid'] == this.id)
        {
          this.booking += parseInt(this.bookingeventArr[i]['_value']);
        }
      }
    });
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

  Bookingevent(eventObj:any) {
    this.eventObj.eventid = this.id;
    this.eventObj.eventname = this.event.eventname;
    this.eventObj.eventhost = this.event.eventhost;
    this.eventObj.sdate = this.event.sdate;
    this.eventObj.edate = this.event.edate;
    this.eventObj.stime = this.event.stime;
    this.eventObj.etime = this.event.etime;
    this.eventObj.status = "Booked";
    this.eventObj.createddate = this.todayDate;
    this.eventObj.total = this.totalpay.toString();
    this.eventObj.merchantid = this.event.merchantid;
    this.eventObj.outletid = this.event.outletid;
    this.eventObj.memberid = this.currentmemberid;
    this.calculateslot()
    this.addimage();
  } 

  getEvent()
  {
    this.http.get('http://165.22.50.213:3001/getevent').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.event = {
                _id:data[i]['_id'],
                eventname:data[i]['eventname'],
                eventhost:data[i]['eventhost'],
                sdate:data[i]['sdate'],
                edate:data[i]['edate'],
                stime:data[i]['stime'],
                etime:data[i]['etime'],
                amount:data[i]['amount'],
                location:data[i]['location'],
                description:data[i]['description'],
                contact:data[i]['contact'],
                email:data[i]['email'],
                whatsapp:data[i]['whatsapp'],
                termsandcondition:data[i]['termsandcondition'],
                merchantid:data[i]['merchantid'],
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

  onselectFile(event:any){
    if(event.target.files){
      var maxFileSize = 10 * 1024 * 1024; //10MB

      const file = event.target.files[0];
      this.images=file;
      if(this.images.size > maxFileSize){
        alert('Image too large. Maximum file size is 10MB');
        this.url = ('../../../assets/img/blankimg.png');
      }
      else{
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
           this.url=event.target.result;
      }
      }
    }
  }

  addimage(){
    const formData = new FormData();
  
    formData.append('file', this.images)
    formData.append('firstname', this.eventObj.firstname)
    formData.append('lastname', this.eventObj.lastname)
    formData.append('phonenumber', this.eventObj.phonenumber)
    formData.append('_value', this._value.toString())
    formData.append('eventid', this.eventObj.eventid)
    formData.append('eventname', this.eventObj.eventname)
    formData.append('eventhost', this.eventObj.eventhost)
    formData.append('sdate', this.eventObj.sdate)
    formData.append('edate', this.eventObj.edate)
    formData.append('stime', this.eventObj.stime)
    formData.append('etime', this.eventObj.etime)
    formData.append('status', this.eventObj.status)
    formData.append('createddate', this.eventObj.createddate)
    formData.append('total', this.eventObj.total)
    formData.append('merchantid', this.eventObj.merchantid)
    formData.append('outletid', this.eventObj.outletid)
    formData.append('memberid', this.eventObj.memberid)

  
    formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3001/upreceiptandimage', formData).subscribe(res =>{
      this.message = res;      
    });
    alert("Your booking was successful!");
    const edurl = "/bookingeventhome";
    console.log(edurl)
    this.router.navigateByUrl(edurl)
  }

  goto(){
    const edurl = "/bookingeventdetails?id=" + this.event._id;
    console.log(edurl)
    this.router.navigateByUrl(edurl)
  }

  backnav() {
    const edurl = "/bookingeventdetails?id=" + this.event._id;
    console.log(edurl)
    this.router.navigateByUrl(edurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}