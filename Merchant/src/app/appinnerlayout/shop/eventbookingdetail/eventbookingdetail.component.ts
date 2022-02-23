import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventbookingdetail',
  templateUrl: './eventbookingdetail.component.html',
  styleUrls: ['./eventbookingdetail.component.scss']
})

export class EventbookingdetailComponent implements OnInit {
  message: any;
  image1arr:any;
  imagetypeArr:any;

  constructor(private modalService: NgbModal, private http: HttpClient,private form: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  
  public event:any={
    _id:'',
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'',
    outletid:''
  };
     
  public image:any ={
    thumbnail:'',
    thumbnailType:''
  }

  public  id:any;

  ngOnInit(): void {
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    this.getbookdetail(this.id);
  }

  backnav() {
    this.router.navigateByUrl('/eventmanagement')
  }

  getbookdetail(id:any){
  this.event._id = this.id
  console.log(this.event)
  this.http.post('http://165.22.50.213:3001/getoneeventbooking',this.event).subscribe((res:any) => {
    console.log(res['data'])
    this.event =res['data']
      this.image={
        thumbnail:new Buffer(this.event['receipt']['data']).toString('base64'),
        thumbnailType:this.event['receipt']['contentType'],
      }
  });
  }
}
