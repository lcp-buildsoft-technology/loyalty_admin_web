import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-storecomment',
  templateUrl: './storecomment.component.html',
  styleUrls: ['./storecomment.component.scss']
})
export class StorecommentComponent implements OnInit {

  message: any;
  shopArr = [];
  outletArr = [];
  storereviewArr = [];
  image1arr: any;
  imagetypeArr: any;
  imagesArr: any;
  public srch = [];
  public id:any;
  memberid = "";
  thumbnail ="";

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

  public storereview = {
    _id:'',
    ratings:'',
    storereview:'',
    outletid:'',
    memberid:'',
    membername:'',
    createdAt:'',
    createdTime:''
  }

  review:number= 0
  reviews: number=0
  average: number =0;

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
    avgrating:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getStorereview();
    this.getmemberid();
    this.getOutlet();
    this.getRegister();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getStorereview()
  {
    this.http.get('http://165.22.50.213:3001/getstorereview').subscribe((res:any)=>
    {
      this.storereviewArr = res['data'];
      // console.log(this.storereviewArr);
      for(var i=0; i<this.storereviewArr.length; i++)
      {
        if(this.storereviewArr[i]['outletid'] == this.id)
        {
          this.shopArr.push(this.storereviewArr[i])
          this.reviews += parseInt(this.storereviewArr[i]['ratings']);
          this.storereview['length'] = this.shopArr.length;
          this.calculatereview();
        }               
      }
      this.addoutletrating(this.outlet)
    })
  }

  calculatereview()
  {    
    this.review = this.reviews / this.storereview['length'];    
  }

  addoutletrating(outlet:any)
  {
    this.outlet._id = this.id;
    this.outlet.avgrating = this.review.toString();
    this.http.post('http://165.22.50.213:3001/editoutletrating', outlet).subscribe((res:any)=>
    {
      this.message = res;
    });
  }

  lol = [];
  public currentmemberid: any;
  registerArr = [];

  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any)=>
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++)
      {
        this.register =
        {
          _id:data[i]['_id'],
          phonenumber:data[i]['phonenumber'], 
          name:data[i]['name'],
          password:data[i]['password'],
          birthdate:data[i]['birthdate'],
          tierlevel:data[i]['tierlevel'],
          pointscollect:data[i]['pointscollect'],
          pointsredeem:data[i]['pointsredeem'],
          confirmpwd:data[i]['confirmpwd'],
          email:data[i]['email'],
          username:data[i]['username'],
          thumbnail:data[i]['thumbnail'],
          address1:data[i]['address1'],
          address2:data[i]['address2'],
          address3:data[i]['address3'],
          state:data[i]['state'],
          city:data[i]['city'],
          postcode:data[i]['postcode'],
          status:data[i]['status'],
          createdat:data[i]['createdat'],
          totalpoints:data[i]['totalpoints']
        }
        this.register.thumbnail = this.thumbnail;
      }
    })
  }

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
                thumbnail:data[i]['thumbnail'],
                avgrating:data[i]['avgrating']
              }
              this.image1arr= new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr= data[i]['thumbnail']['contentType'];
             }
             else{
             }
      }  
    });
  }

  open(outlet:any)
  {
    const srurl = "/storereview?id=" + outlet._id;
    console.log(srurl)
    this.router.navigateByUrl(srurl)
  }

  backnav() {
    const sdurl = "/locatestoredetails?id=" + this.outlet._id;
    console.log(sdurl)
    this.router.navigateByUrl(sdurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
