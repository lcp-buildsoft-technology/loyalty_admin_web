import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewArr: string[] = [];
  getreviewArr: string[] = [];
  lengthArr=[];
  outletArr=[];
  constructor(private modalService: NgbModal, private http: HttpClient,  private _compiler: Compiler,
    private form: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  id:any;
  avgrating:any
  reviewlength:any;
  memberlength:any;
  ngOnInit(): void {
 
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];

    this.getStorereview(this.id);
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.avgrating = moutlet.avgrating
    console.log(this.avgrating)
  }
public review: any ={
  ratings:'',
  storereview:'',
  createdAt:'',
  membername:'',
  thumbnail: '',
  thumbnailType: '',
  outletid:''
}
public total ={
  total:0,

}
public outlet ={
  _id:'',
  shopname:'',
  avgrating:''
}

getStorereview(id:any){
  console.log(id)
  var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
 
  this.review.outletid = id
  this.http.post('http://165.22.50.213:3001/getmcstorereview',this.review).subscribe((res:any) => {
 var v=0;
  this.reviewArr = res['data'];
  console.log(res['data1'])
  console.log(res['data'])
  this.reviewlength = res['data'].length
  this.memberlength = res['data1'].length
  for(var i = 0 ; i < this.reviewlength ; i++){
    console.log(res['data'][i]['outletid'])
    for(var m = 0 ; m < this.memberlength ; m++){
  
     this.review ={
      ratings:'',
      storereview:'',
      createdAt:'',
      membername:'',
      thumbnail: '',
      thumbnailType: '',
      avgrating:''
     }
     this.review.avgrating = res['data'][i]['avgrating'];
    this.review.ratings = res['data'][i]['ratings'];
    this.review.storereview = res['data'][i]['storereview'];
    this.review.createdAt = res['data'][i]['createdAt'];
    this.review.membername = res['data'][i]['membername'];
    
  
    if(res['data1'][m]['_id']  == res['data'][i]['memberid']){
 
      this.review.thumbnail = new Buffer(res['data1'][m]['thumbnail']['data'] ).toString('base64');

      this.review.thumbnailType = res['data1'][m]['thumbnail']['contentType'];

    
      this.getreviewArr.push(this.review)
   
    }
  
    }
   
} 
 
  console.log(this.getreviewArr)
   this.total.total = this.lengthArr.length;
  
  
      });

      this.outlet._id = this.id
      this.http.post('http://165.22.50.213:3001/getonemoutlet',this.outlet).subscribe((res:any) => {
   console.log(res['data'])
        this.outlet.shopname = res['data'][0]['shopname']
        this.outlet.avgrating= res['data'][0]['avgrating']
    }); 

}


  backnav() {
    this.router.navigate(['/home'])
  }

}
