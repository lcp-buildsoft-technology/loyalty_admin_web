import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { timeStamp } from 'console';
declare var angular:any;

@Component({
  selector: 'app-rewardscan',
  templateUrl: './rewardscan.component.html',
  styleUrls: ['./rewardscan.component.scss']
})
export class RewardscanComponent implements OnInit {
 rewardscanArr=[];
 memberArr=[];
 productArr=[];
  constructor(private modalService: NgbModal, private http: HttpClient,private route: ActivatedRoute,private activatedRoute: ActivatedRoute, private router: Router) {

   }
public id:any;
public membername:any;
public productname:any;
public value:any;
public message:any;
public storedvalue:any;
public rewardscan ={
  id:'',
  name:'',
  description:'',
  price:'',
  onlinestoreid:'',
  status:'',
  memberid:'',
  merchantid:'',
  redemp:0,
  tnc:'',
  outletid:'',
  codetype:''
  
       }
       public userpoint={
        _id:'',
        name:'',
        description: '',
        price:'',
        onlinestoreid:'',
        status:'',
        memberid:'',
        merchantid:'',
        outletid:'',
       redemp:'',
        tnc:'',
        codetype:'',
      
         };
       public userproduct ={
        membername:'',
        id:'',
        name:'',
        description:'',
        price:'',
        onlinestoreid:'',
        status:'',
        memberid:'',
        merchantid:'',
        points:0,
        tnc:'',
        outletid:'',
        codetype:'',
        createddate:''
             }
       public member ={
        _id:'',
        phonenumber:'',
        name:'',
        email:'',
        tierlevel:'',
        pointscollect:'',
        totalpoints:0,
        pointsredeem:0
             }
             public outlet ={
               shopname:''
             }
             public product ={
              id:'',
                   }
  ngOnInit(): void {


    
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getScanner(this.id)
  }
  getScanner(id:any) {
this.rewardscan.id = this.id
console.log(this.rewardscan.id)
    this.http.post('http://165.22.50.213:3001/getrewardscan',this.rewardscan).subscribe((res:any) => {
      console.log(res['data'])
     this.rewardscanArr = res['data']
   this.storedvalue = this.rewardscanArr
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
   this.outlet.shopname = moutlet.shopname
      this.member._id = res['data']['memberid']
      console.log(this.member._id)
      this.rewardscan.redemp= res['data']['redemp']
    
     this. value =this.rewardscan.redemp 
      this.http.post('http://165.22.50.213:3001/getonemember',this.member).subscribe((res:any) => {
        console.log("hi")
        console.log(res['data'])
        this.member._id = res['data']['_id']
       this.memberArr = res['data']
       this.member.totalpoints =parseInt( res['data']['totalpoints'])
       this.member.pointsredeem = parseInt(res['data']['pointsredeem'])
       this.membername = res['data']['name']
      });
    });

 
  }
  backnav(){
    this.router.navigate(['/scan'])
  }

sendData(){
  this.http.post('http://165.22.50.213:3001/getonemember',this.member).subscribe((res:any) => {
    console.log("hi")
    console.log(res['data'])
    this.member._id = res['data']['_id']
   this.memberArr = res['data']
   this.member.totalpoints =parseInt( res['data']['totalpoints'])
   this.member.pointsredeem = parseInt(res['data']['pointsredeem'])
   this.membername = res['data']['name']
 
console.log(this.value)
console.log(this.member.totalpoints)
   if(this.value > this.member.totalpoints){
     alert("Not enough points to redeem")
    this.router.navigate(['/scan'])
   }
else{
  this.member.totalpoints = this.member.totalpoints - parseInt(this.value)
  this.member.pointsredeem = this.member.pointsredeem + parseInt( this.value)
 
  this.http.post('http://165.22.50.213:3001/editredeempoints', this.member).subscribe(res =>{
       
         this.message = res
         if(this.message['success']== false){
           alert("Failed to redeem");
         }
         else{
          this.storeddata();
         }
     });
  
   
}









    
  });
  
}
storeddata(){
  console.log(this.storedvalue)
  this.userproduct = this.storedvalue
  var today = new Date();
  var today = new Date();

  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  this.userproduct.createddate = date
  console.log(this.userproduct)
 this.http.post('http://165.22.50.213:3001/addUserproduct', this.userproduct).subscribe(res =>{
   console.log("hi")
   console.log(res);
   this.message = res
   if(this.message['success']== false){
    alert("Failed to add to pointredeems table");
  }
  else{
    this.userpoint._id = this.id
    this.http.post('http://165.22.50.213:3001/edituserpoint', this.userpoint).subscribe(res =>{
      this.message = res;
    console.log(res)
    console.log(res['data1'])
  });
  }
});

 
  alert("Redeem successfully");
  this.router.navigate(['/home'])
}

}
