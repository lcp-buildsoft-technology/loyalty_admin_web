import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-outletdetail',
  templateUrl: './outletdetail.component.html',
  styleUrls: ['./outletdetail.component.scss']
})

export class OutletdetailComponent implements OnInit {
  message: any;
  public srch =[];
  moutletArr =[]
  image1arr:any;
  imagetypeArr:any;

  constructor(private modalService: NgbModal, private http: HttpClient,private form: FormBuilder, private router:Router, private route:ActivatedRoute) {
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
    merchantid:'',
    thumbnail:'',
    thumbnailType:'',
    avgrating:'',
   };

     public review: any ={
      ratings:'',
      storereview:'',
      createdAt:'',
      membername:'',
      thumbnail: '',
      thumbnailType: '',
      outletid:''
    }

     public selected={
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

    public  id:any;
    public reviewlength:any;

  ngOnInit(): void {
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
    this.getMoutlet(this.id);
    this.getStorereview(this.id)
  }

  backnav() {
    this.router.navigate(['/outletlist'])
  }

 getMoutlet(id:any){
 this.moutlet._id =this.id
  this.http.post('http://165.22.50.213:3001/getonemoutlet',this.moutlet).subscribe((res:any) => {
     console.log(res)
   
      this.moutletArr = res['data'] ;
      var data =res['data']
      console.log(res['data'])
      console.log(this.moutletArr);
      for(var i=0; i<this.moutletArr.length; i++){
      
        if(data[i]['_id'] == this.id ){
          console.log(data[i]['_id'])
          console.log(this.id)
          this.moutletArr = data[i];
          console.log(data[i])
          console.log('sadasdd')
          this.moutlet ={
            avgrating:data[i]['avgrating'],
            _id:data[i]['_id'],
            address:data[i]['address'],
            shopname:data[i]['shopname'],
            phone:data[i]['phone'],
            whatsapp: data[i]['whatsapp'],
            email:data[i]['email'],
            operatehrsstart:data[i]['operatehrsstart'],
            operatehrsend:data[i]['operatehrsend'],
            operateday1:data[i]['operateday1'],
            operateday2:data[i]['operateday2'],
            description:data[i]['description'],
            merchantid:data[i]['merchantid'],
            thumbnail:new Buffer(data[i]['thumbnail']['data']).toString('base64'),
            thumbnailType:data[i]['thumbnail']['contentType'],
             };
             this.image1arr=this.moutlet.thumbnail
             this.imagetypeArr=this.moutlet.thumbnailType
        }
        else{
          this.moutletArr.splice(i);
          console.log(this.moutletArr)
        }
        }
  });


 }

  getStorereview(id:any){
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.moutlet.shopname = moutlet.shopname
    this.review.outletid = id
    this.http.post('http://165.22.50.213:3001/getmcstorereview',this.review).subscribe((res:any) => {
      var v=0;
      this.reviewlength = res['data'].length
    });
  }

  close(){
    this.router.navigate(['/outletlist'])
  }

  Transferreview(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id)
  
    const rev = "/review?id=" + id;
    console.log(rev)
    this.router.navigateByUrl(rev)
  }
}
