import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-outletlist',
  templateUrl: './outletlist.component.html',
  styleUrls: ['./outletlist.component.scss']
})

export class OutletlistComponent implements OnInit {
  searchInput : string ='';
  message: any;
  moutletArr = [];
  outletArr =[];
  public srch =[];

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.srch = [...this.moutletArr];
  }
  public moutlet={
    _id:'',
    shopname:'',
    address:'',
    phone: '',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:'',
    merchantid:''
     };
     public deletemoutlet={
       _id:'',
      shopname:'',
      address:'',
      phone: '',
      whatsapp:'',
      email:'',
      operatehrsstart:'',
      operatehrsend:'',
      operateday1:'',
      operateday2:'',
      description:''
      
       }; 
  ngOnInit(): void {
    this.getMoutlet();
    this.open(this.moutlet);
  }

  backnav() {
    this.router.navigate(['/home'])
  }

  getMoutlet() {
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    this.moutlet.merchantid = mlogin.merchantid
    this.http.post('http://165.22.50.213:3001/getmoutlet',this.moutlet).subscribe((res:any) => {
        this.moutletArr = res['data'] ;
        console.log( this.moutletArr)
        var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
        console.log(mlogin.merchantid)
        for(var i=0; i <this.moutletArr.length ; i++){
          if(mlogin.merchantid == this.moutletArr[i]['merchantid']){
              this.outletArr.push(this.moutletArr[i])
          }
        }
        console.log(this.outletArr);
    });
  }
  Transfer(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
    $("#moutlet_name").val(name);
 
  }
  DeleteMoutlet(moutlet:any){
    var id = $('#moutlet_name').val();
    this.moutlet._id =''+id+'';
    var data:any = {
      '_id':id
    };
    console.log(data)
    this.http.post("http://165.22.50.213:3001/deleteMoutlet",data).subscribe((res:any) =>{
      this.moutletArr = res['data'] ;
      console.log(res);
      this.message = res;
      this.router.navigateByUrl('/outletlist')
  });
  }

  open(moutlet:any) {
    this.deletemoutlet = {
      _id:'',
      shopname:'',
      address:'',
      phone: '',
      whatsapp:'',
      email:'',
      operatehrsstart:'',
      operatehrsend:'',
      operateday1:'',
      operateday2:'',
      description:''
    }
  }

  edit(moutlet:any){
    console.log(moutlet);
    const editout = "/editoutlet?id=" + moutlet._id;
    console.log(editout)
    this.router.navigateByUrl(editout)
   }
   detail(moutlet:any){
    const outdet = "/outletdetail?id=" + moutlet._id;
    console.log(outdet)
    this.router.navigateByUrl(outdet)
   }

  goto(){
    this.DeleteMoutlet(this.moutlet);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/outletlist']);
  }

}
