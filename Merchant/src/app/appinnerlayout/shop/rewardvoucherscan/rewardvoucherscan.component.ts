import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
declare var angular:any;

@Component({
  selector: 'app-rewardvoucherscan',
  templateUrl: './rewardvoucherscan.component.html',
  styleUrls: ['./rewardvoucherscan.component.scss']
})
export class RewardvoucherscanComponent implements OnInit {
  registerArr=[];
  rate:any;
  todayDate:any;
  message:any;
  minspend:any;
  price:any;
  public rewardid:any;
  
  scanArr = [];
  convertArr=[];
  public srch=[];
  memberArr =[];
  constructor(private modalService: NgbModal, private http: HttpClient,private route: ActivatedRoute,private activatedRoute: ActivatedRoute, private router: Router) {
    
    this.srch = [...this.scanArr];
   }
   public voucherscan={
    id:'',
    type:'',
    title: '',
    detail:'',
    discount:0,
    minspend:0,
    sdate:'',
    edate:'',
    termsandcondition:'',
    voucherid:'',
    status:'',
    quantity:'',
    createddate:'',
    memberid:'',
    codetype:'',
     };
     public rewardvoucherscan={
      id:'',
      outletid:'',
      available: '',
      type:'',
     title:'',
      discount:0,
      minspend:0,
     
      termsandcondition:'',
      rewardid:'',
      memberid:'',
      codetype:'',
        createddate:''
       };
     public points={
      memberid:'',
      pointsget:0,
      merchantid: '',
      createddate:'',
      productname:'',
      membername:'',
      type:'',
      price:0,
      subtotal:0,
      pointsused:0,
      outletid:'',
      rewardid:''
     


     }
     public outlet={
       shoptitle:''
     }
     public pointsconvert={
       oneRM:0.00
     }
       public member ={
         name:'',
         tierlevel:'',
         
       }

     public  id:any;
     public register ={
      _id:'',
             pointscollect:0,
             totalpoints:0
           }
           public publishrv ={
             _id:'',
           }
  ngOnInit(): void {
  

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    
    this.getScanner(this.id)
    console.log(this.id)
  }
  getScanner(id:any) {
    
    this.http.get('http://165.22.50.213:3001/getrewardvoucherscan').subscribe((res:any) => {

      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    
     this. outlet.shoptitle = moutlet.shopname

     this.scanArr = res['data']
    
        console.log
        console.log(this.scanArr)
     for(var i=0;i<this.scanArr.length;i++){
       console.log("hi")
       console.log(this.id)
      if(this.scanArr[i]['id'] == this.id ){
     console.log(this.scanArr[i])
     console.log(this.id )
           this.rewardid = this.scanArr[i]['id']
           console.log(this.scanArr[i])

    this.rewardvoucherscan = this.scanArr[i]
    this.rewardvoucherscan.discount = this.scanArr[i]['discount']
    console.log( this.rewardvoucherscan.discount )
 

    
    this.http.get('http://165.22.50.213:3001/getmember').subscribe((res:any) => {
      this.memberArr = res['data'] ;
      console.log(this.memberArr)
     
      for(var i=0; i<this.memberArr.length;i++){
         console.log(this.memberArr[i]['_id'] )
         console.log(this.rewardvoucherscan['memberid'])
        if(this.memberArr[i]['_id'] == this.rewardvoucherscan['memberid']){
        
          
            this.points.memberid = this.memberArr[i]['_id'];
            
           this.member.name = this.memberArr[i]['username'];
           this.points.membername = this.member.name;
           console.log(this.member.name)
           this.member.tierlevel =this.memberArr[i]['tierlevel']
        }
      }
      
    }); 

      }
      }

    });

 
  }
 
  calculate(){
    console.log(this.rewardvoucherscan['minspend'])
   console.log(this.points.price)
   this.minspend =this.rewardvoucherscan['minspend']
   this.price = this.points.price
    if(parseInt(this.minspend) >parseInt( this.price)){
      alert("Please buy atleast RM" +this.rewardvoucherscan['minspend'] )
      
    }
    else{

    
      this.http.get('http://165.22.50.213:3001/getpointsconvert').subscribe((res:any) =>{
        console.log(res);
        this.convertArr = res['data'];
      this.rate =(this.convertArr[0][this.member.tierlevel])
      console.log(this.rewardvoucherscan['type'])
      if(this.rewardvoucherscan['type'] == "FixAmount"){
        this.points.subtotal = (this.points.price - this.rewardvoucherscan.discount)
        console.log("210")
        this.points.pointsget = (this.points.subtotal)/(this.rate)
      }
   else {

    this.points.subtotal = (this.points.price -(this.points.price*(this.rewardvoucherscan.discount*0.01 ) ))
    this.points.pointsget = (this.points.subtotal)/(this.rate)
    console.log( this.points.subtotal )
    console.log( this.points.pointsget  )
   }
      
      
    });

    
    
  }
  }
backnav(){
  this.router.navigate(['/scan'])
}
  sendData(){
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    console.log(moutlet)
    this.points.merchantid = moutlet.merchantid;
    this.points.outletid = moutlet._id;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1
    var nn = today.getMonth() 
  console.log(mm)


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
    this.points.createddate = this.todayDate
    console.log(this.points.createddate)
    console.log(this.rewardvoucherscan.minspend)
    this.points.rewardid = this.rewardid
 
    console.log(this.points)

   
      this.points.type = "RewardVoucher"
      this.registerpoints(this.points);
    
  }
  registerpoints(points:any){

    console.log(this.points)
   console.log(this.rewardid)
   this.points.rewardid = this.rewardid
   console.log(this.points.rewardid)
   console.log(this.points)
    this.http.post('http://165.22.50.213:3001/addpoints', points).subscribe(res =>{
        console.log(res);
        this.register._id = this.points.memberid
        this.http.post('http://165.22.50.213:3001/getpoints',this.register).subscribe(res =>{
         console.log(res);
        this.registerArr =res['data']
        console.log(res['data']['pointscollect'])
        console.log(this.points.pointsget)
        console.log(res['data']['pointscollect'])
         this.register.pointscollect =parseInt(res['data']['pointscollect'])+this.points.pointsget
           
         this.register.totalpoints =parseInt(res['data']['totalpoints'])+this.points.pointsget
          this.http.post('http://165.22.50.213:3001/editmcpoints', this.register).subscribe(res =>{
              console.log(res);
              this.message = res;
              if(this.message['success']== false){
                alert("save failed");
              }
              else{
                  this.publishrv._id =this.id      
                this.http.post('http://165.22.50.213:3001/editpublishrv',this.publishrv).subscribe((res:any) =>{
               console.log("ggf")
                console.log(res)
                
              });

                this.router.navigate(['/home'])
               
              }
          });
     
         
     });
    });
 
   
  }
}


