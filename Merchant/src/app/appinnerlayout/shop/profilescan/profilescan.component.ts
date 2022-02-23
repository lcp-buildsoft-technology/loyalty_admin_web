import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
declare var angular:any;
@Component({
  selector: 'app-profilescan',
  templateUrl: './profilescan.component.html',
  styleUrls: ['./profilescan.component.scss']
})
export class ProfilescanComponent implements OnInit {
  rate:any;
  message:any;
  scanArr = [];
  convertArr=[];
  public srch=[];
  memberArr =[];
  registerArr=[];
  todayDate = "";
  constructor(private modalService: NgbModal, private http: HttpClient,private route: ActivatedRoute,private activatedRoute: ActivatedRoute, private router: Router) { 

    this.srch = [...this.scanArr];
  }


  public profilescan={
       
    id:'',
   outletid:'',
   name:'',
   username: '',
   tierlevel:'',
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
      outletid:''


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
public register ={
  _id:'',
         pointscollect:0,
         totalpoints:0
       }
     public  id:any;
  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove()

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getScanner()
  }
  getScanner() {

    this.http.get('http://165.22.50.213:3001/getprofilescan').subscribe((res:any) => {

      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    
     this. outlet.shoptitle = moutlet.shopname

     this.scanArr = res['data']
    
     for(var i=0;i<this.scanArr.length;i++){
      if(this.scanArr[i]['id'] == this.id ){
  
    this.profilescan = this.scanArr[i]
  
    
    this.http.get('http://165.22.50.213:3001/getmember').subscribe((res:any) => {
      this.memberArr = res['data'] ;
      console.log(this.memberArr)
     
      for(var i=0; i<this.memberArr.length;i++){
       console.log(this.profilescan['id'])
       
        if(this.memberArr[i]['_id'] == this.profilescan['id']){
            console.log(this.memberArr[i])
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
 backnav(){
  this.router.navigate(['/scan'])
 }

  calculate(){
    this.http.get('http://165.22.50.213:3001/getpointsconvert').subscribe((res:any) =>{
    console.log(res);
    this.convertArr = res['data'];
    this.rate =(this.convertArr[0][this.member.tierlevel])
 
    console.log(this.rate)

    this.points.subtotal = this.points.price  
    this.points.pointsget = (this.points.subtotal)/(this.rate)
    
    });
  }

  sendData(){
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
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.points.merchantid = moutlet.merchantid;
    this.points.outletid = moutlet._id;
    this.points.createddate = this.todayDate
    console.log(this.points)

    this.registerpoints(this.points);
    this.points.type = "profile";
  }
  
  registerpoints(points:any){
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
                       
              this.router.navigate(['/home'])
              
             }
         });
    
        
    });
   });

  


 
}


}
