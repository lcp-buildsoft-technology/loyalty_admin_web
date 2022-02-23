import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var angular:any;
@Component({
  selector: 'app-prizevoucherscan',
  templateUrl: './prizevoucherscan.component.html',
  styleUrls: ['./prizevoucherscan.component.scss']
})
export class PrizevoucherscanComponent implements OnInit {
  registerArr=[];
  rate:any;
  todayDate:any;
  public membername:any;
  public voucherid:any;
  message:any;
  scanArr = [];
  convertArr=[];
  public srch=[];
  memberArr =[];
  constructor(private modalService: NgbModal, private http: HttpClient,private route: ActivatedRoute,private router:Router) {
    
    this.srch = [...this.scanArr];
   }
   public prizevoucherscan={
    id:'',
    type:'',
    vtype:'',
    sdate:'',
    edate:'',
    title: '',
    discount:0,
    minspend:0,
    status:'',
    memberid:'',
  
     };
     public prizevoucher={
      _id:'',
  
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
      voucherid:''
     


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
public uservoucher={
  voucherid:'',
  memberid:''
}
     public  id:any;
     public register ={
      _id:'',
             pointscollect:0,
             totalpoints:0
           }
           ngOnInit(): void {
            const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
            footerhide.remove()
        
            var url= document.URL;
            console.log(url)
            const myArray = url.split("=");
            this.id = myArray[1];
            
            this.getScanner()
            console.log(this.id)
            // this.getConvert()
            
          }
          getScanner() {
            
            this.http.get('http://165.22.50.213:3001/getprizevoucherscan').subscribe((res:any) => {
        
              var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
            
             this. outlet.shoptitle = moutlet.shopname
        
             this.scanArr = res['data']
            
                
                console.log(this.scanArr)
             for(var i=0;i<this.scanArr.length;i++){
              if(this.scanArr[i]['id'] == this.id ){
            //  console.log(this.scanArr[i]['id'])
             console.log(this.id )
            //     this.voucherscan={
        
              // this.voucherid = this.scanArr[i]['voucherid']
              // console.log(this.voucherid)
            //   this.http.post('http://165.22.50.213:3001/getoneofvoucher',this.voucherid).subscribe((res:any) => {
            //     console.log(res)
            // //     console.log(res['data'][0])
            // //   console.log(res['data'][0]['quantity'])
            // // if(res['data']['quantity'] == 0){
            // //   alert("The voucher is fully redeemed");
            // //    window.location.href="/scan"
            // // }
            //   });
        
                  //  console.log(this.scanArr[i]['voucherid'])
                  //  console.log(this.scanArr[i]['memberid'])
            // id:this.scanArr[i]['id'],
            // type:this.scanArr[i]['type'],
            // title: this.scanArr[i]['title'],
            // detail:this.scanArr[i]['detail'],
            // discount:this.scanArr[i]['discount'],
            // minspend:this.scanArr[i]['minspend'],
            // sdate:this.scanArr[i]['sdate'],
            // edate:this.scanArr[i]['edate'],
            // termsandcondition:this.scanArr[i]['termsandcondition'],
            // voucherid:this.scanArr[i]['voucherid'],
            // status:this.scanArr[i]['status'],
            // quantity:this.scanArr[i]['quantity'],
            // createddate:this.scanArr[i]['createddate'],
            // memberid:this.scanArr[i]['memberid'],
        
            //        };
            this.prizevoucherscan = this.scanArr[i]
          //   console.log(this.voucherscan)
          // console.log(this.voucherscan['type'])
        
            
            this.http.get('http://165.22.50.213:3001/getmember').subscribe((res:any) => {
              console.log(res)
              this.memberArr = res['data'] ;
              console.log(this.memberArr)
             
              for(var i=0; i<this.memberArr.length;i++){
                 console.log(this.memberArr[i]['_id'] )
                 console.log(this.prizevoucherscan['memberid'])
                if(this.memberArr[i]['_id'] == this.prizevoucherscan['memberid']){
              
                  console.log(this.memberArr[i])
                    this.points.memberid = this.memberArr[i]['_id'];
                   
                   this.member.name = this.memberArr[i]['username'];
                  //  console.log(this.memberArr[i]['username'])
                   this.points.membername = this.member.name;
                   console.log(this.member.name)
                   this.member.tierlevel =this.memberArr[i]['tierlevel']
                }
              }
            
           
              // console.log( res);
               
                
               
               
        
              
            }); 
                  //  console.log(this.voucherscan['title'])
              }
              }
              
                
        
          
              
            });
        
         
          }
        
        
         
          calculate(){
            console.log(this.prizevoucherscan['minspend'])
           
           
        
              this.http.get('http://165.22.50.213:3001/getpointsconvert').subscribe((res:any) =>{
                console.log(res);
                this.convertArr = res['data'];
                 console.log(this.points.price)
                 console.log(this.prizevoucherscan.discount)
              this.rate =(this.convertArr[0][this.member.tierlevel])
              if(this.prizevoucherscan['vtype'] == "FixAmount"){
                this.points.subtotal = (this.points.price - this.prizevoucherscan.discount)
                
                this.points.pointsget = (this.points.subtotal)/(this.rate)
              }
           else {
            this.points.subtotal = (this.points.price -(this.points.price*(this.prizevoucherscan.discount*0.01 ) ))
            this.points.pointsget = (this.points.subtotal)/(this.rate)
           }
              
              
            });
        
            
            
           
          }
        
          sendData(){
            var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
            console.log(moutlet)
            this.points.merchantid = moutlet.merchantid;
            this.points.outletid = moutlet._id;
            // this.points.createddate = this.prizevoucherscan.createddate
            this.points.voucherid = this.voucherid
         
        
        
        
            console.log(this.points)
        
           
              this.points.type = "voucher"
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
        
            // if(this.voucherscan['edate'] > this.todayDate){
        
              if(this.prizevoucherscan['minspend'] <= this.points.price){
              
                this.registerpoints(this.points);
              }
              else{
                alert("Please buy atleast RM" +this.prizevoucherscan['minspend'] )
              }
        
        
            // }
            // else{
            //   alert("Sorry,the voucher should be spend by "+this.voucherscan['edate'] )
              // window.location.href="/scan"
            // }
        
             
            
          }
          registerpoints(points:any){
        
            console.log(this.points)
           console.log(this.voucherid)
           this.points.voucherid = this.voucherid
           this.points.membername = this.member.name;
           console.log(this.points.membername)
           console.log(this.points.voucherid)
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
                      this.message = res ;
                      if(this.message['success']== false){
                        alert("Save Failed");
                      }
                      else{
                        this.prizevoucher._id = this.id
         console.log(this.uservoucher)
                        this.http.post('http://165.22.50.213:3001/editprizevoucher', this.prizevoucher).subscribe(res =>{
                          this.message = res;
                        console.log(res)
                        console.log(res['data1'])
                      });
                       if(this.message['success'] == true){
                         console.log("sucess")
                          
        
        
                            // window.location.href="/home"
                            this.router.navigate(['/home'])
                       }
                      }
                  });
             
                 
             });
            });
         
           
          }
        }
        
