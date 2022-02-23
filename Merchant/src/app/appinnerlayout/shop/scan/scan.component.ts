import { Component, OnInit } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  scanResult:any='';
  rewardscan:any=';'
  rewardvoucherscan:any=';'
  publishrv:any=''
  todayDate = "";
  scanArr = [];
message:any

  //title
  titlesArr=[];
  titles:any='';
  idArr=[];
  id:any='';
  //type
  typeArr=[];
  type:any='';
//detail
detailArr=[];
detail:any='';

//discount
discountArr=[];
discount:any='';
//minspend
minspendArr=[];
minspend:any='';
//sdate
sdateArr=[];
sdate:any='';
//edate
edateArr=[];
edate:any='';
//termsandcondition
termsandconditionArr=[];
termsandcondition:any='';
//voucherid
voucheridArr=[];
voucherid:any='';
//status
statusArr=[];
status:any='';
//quantity
quantityArr=[];
quantity:any='';
//createddate
createddateArr=[];
createddate:any='';



  title = 'ANGULARQRSCANNER';
 

onCodeResult(event:any){
  
    this.scanResult = event;
  
  this.scanArr = this.scanResult;
  let obj = JSON.parse(this.scanResult)
  console.log(obj['_id'])
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    

if(obj['codetype'] == "voucher"){
  
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
    this.voucherscan = obj
    console.log(this.voucherscan)
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
   this.voucherscan.id = obj['_id'] 
   this.voucherscan.voucherid=obj['voucherid']
    this.voucherscan.outletid = moutlet._id
  console.log(this.voucherscan.voucherid)
  console.log(this.voucherscan)
  
  this.http.post('http://165.22.50.213:3001/getmcuservoucher',this.voucherscan).subscribe(res =>{
    console.log(res);
    this.message = res
    
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    console.log(res['data'])
    if(res['data']['merchantid'] == moutlet.merchantid ){
      console.log(this.message)
      if(this.message['success']==true){
        if(res['data']['status'] == "Pending"){
          if(res['data']['edate'] >= this.todayDate){

            this.http.post('http://165.22.50.213:3001/addvoucherscan',this.voucherscan).subscribe(res =>{
              console.log(res);
              this.message = res
              console.log(res['data'])
              if(this.message['success'] == true){
                                const vs = "/scanner?id=" + this.voucherscan.id;
                console.log(vs)
                this.router.navigateByUrl(vs)
               }
          });
          }
         else{
           alert("The voucher has expired")
         }
        }
        else{
          alert("The voucher being redeemed before")
        }
      }
      else{
  
     alert("voucher code didnt exists! Pls check database");
      }
    }
   else{
     alert("The voucher should be used in another merchant");
   }
  
});

  console.log(this.voucherscan.id)
  
}

else if(obj['codetype'] == "profile"){
 
  console.log(this.profilescan)
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
 this.profilescan.id = obj['_id'] 
  this.profilescan.outletid = moutlet._id
  this.profilescan.name= obj['name']
  this.profilescan.username= obj['username']
  this.profilescan.tierlevel= obj['tierlevel']
  this.profilescan.createddate= obj['createdat']
console.log(this.profilescan)
  this.http.post('http://165.22.50.213:3001/addprofilescan',this.profilescan).subscribe(res =>{
      console.log(res);
      
  });
  console.log(this.profilescan)
    const ps = "/profilescan?id=" + this.profilescan.id;
    console.log(ps)
    this.router.navigateByUrl(ps)
}

else if(obj['codetype'] == "Voucher"){
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
  console.log(obj)
  this.rewardvoucherscan = obj
  console.log(this.rewardvoucherscan)
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
 this.rewardvoucherscan.id = obj['_id'] 
 this.rewardvoucherscan._id = obj['_id'] 
  console.log(this.rewardvoucherscan._id )
 this.rewardvoucherscan.rewardid =obj['id']
  this.rewardvoucherscan.outletid = moutlet._id
  this.rewardvoucherscan.memberid = obj['memberid']
  this.rewardvoucherscan.rewardid = obj['rewardid']
  this.rewardvoucherscan.createddate = obj['createddate']
  this.rewardvoucherscan.minspend = obj['minspend']
  console.log(this.rewardvoucherscan)
  this.http.post('http://165.22.50.213:3001/getonerewardvoucher',this.rewardvoucherscan).subscribe(res =>{
  console.log(res['data'])
  this.message =res
  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  if(res['data']['merchantid'] == moutlet.merchantid || (res['data']['merchantid'] == "All" ) ){
    if(this.message['success'] ==true){
      if(res['data']['available'] == "Available"){
        console.log(res['data']['expireddate'])
        if(res['data']['expireddate'] >= this.todayDate){
        this.http.post('http://165.22.50.213:3001/addrvoucherscan',this.rewardvoucherscan).subscribe(res =>{
          console.log(res);
           console.log(res['data'])
           this.message = res
           if(this.message['success'] == true){
            const rv = "/rewardvoucherscan?id=" + this.rewardvoucherscan._id;
            console.log(rv)
            this.router.navigateByUrl(rv)
           }
      });
    }
    else{
      alert("The reward voucher is expired")
    }
      }
      
    else{
      alert("The reward voucher being used")
    }

  }
  else{
  
    alert("voucher code didnt exists! Pls check database");
     }
    }
    else{
      alert("The reward voucher is not allowed to use in merchant");
    }
});

  console.log(this.voucherscan)
  
  

}
else if(obj['codetype'] == "reward"){

  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  
    console.log("hi")
   this.userpoint.id = obj['_id']

 console.log(this.userpoint)
   this.http.post('http://165.22.50.213:3001/getuserpoint',this.userpoint).subscribe(res =>{
     this.userpoint = obj
     this.userpoint.id = obj['_id']
     console.log(res['data'])
     console.log(res)
     this.message =res
     if(res['data']['outletid'] == moutlet._id ){
       console.log("outlet")
      if(this.message['success']==true){
        console.log("get")
        if(res['data']['status'] != "Redeemed"){
             
          this.http.post('http://165.22.50.213:3001/addrewardscan',this.userpoint).subscribe(res =>{
            console.log(res);
            this.message = res
            console.log(res['data'])
             if(this.message['success'] == true){
                
                const rs = "/rewardscan?id=" + this.userpoint._id;
                console.log(rs)
                this.router.navigateByUrl(rs)
               }
              
        });
      }
      else{
        alert("This reward code has been used for redeemed")
      }
     }
     else{
        alert("Cannot find the reward code")
     }
    }
    else{
      alert("The reward should be used in another outlet")
   }
});
 

}

else if(obj['codetype'] == "gamevoucher"){

  var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
  
    console.log("hi")
   this.prizevoucher._id = obj['_id']

   this.http.post('http://165.22.50.213:3001/getprizevoucher',this.prizevoucher).subscribe(res =>{

     this.prizevoucher = obj
     this.prizevoucher.id = obj['_id']
    console.log(res)
     this.message =res
     
       console.log("outlet")
      if(this.message['success']==true){
        console.log("get")
        if(res['data']['status'] == "Available"){
              console.log("redeemed")
          this.http.post('http://165.22.50.213:3001/addprizevoucherscan',this.prizevoucher).subscribe(res =>{
            console.log(res);
            this.message = res
            console.log(res['data'])
             if(this.message['success'] == true){
                
                const pvs = "/prizevoucherscan?id=" + this.prizevoucher._id;
                console.log(pvs)
                this.router.navigateByUrl(pvs)
               }
              
        });
      }
      else{
        alert("This reward code has been used for redeemed")
      }
     }
     else{
        alert("Cannot find the reward code")
     }
  
});
 

}

  }

  backnav() {
    this.router.navigate(['/home'])
  }

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  public voucherscan={
    id:'',
    type:'',
    title: '',
    detail:'',
    discount:'',
    minspend:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    voucherid:'',
    status:'',
    quantity:'',
    createddate:'',
    memberid:'',
    codetype:'',
    outletid:''
     };
     
     public prizevoucherscan={
      id:'',
      type:'',
      vtype:'',
      sdate:'',
      edate:'',
      title: '',
      discount:'',
      minspend:'',
      status:'',
      memberid:'',
    
       };
     public profilescan={
       
       id:'',
      outletid:'',
      name:'',
      username: '',
      tierlevel:'',
      createddate:''

       };
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
      id:'',
         };
         public prizevoucher={
           _id:'',
         sdate:'',
         edate:'',
          type:'',
          vtype:'',
          title: '',
          discount:'',
          minspend:'',
          status:'',
          memberid:'',
          id:''
        
           };
           
  ngOnInit(): void {
  }






}
