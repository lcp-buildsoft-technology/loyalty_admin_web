import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editads',
  templateUrl: './editads.component.html',
  styleUrls: ['./editads.component.scss']
})
export class EditadsComponent implements OnInit {

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer,  private form: FormBuilder) { }
  public editads = {
    _id: '',
    title: '',
    pdate: '',
    ptime: '',
    sdate: '',
    edate: '',
    merchant: '',
    thumbnail: [],
    detail: ''
  }
  message: any;
  merchArr=[];
  validErr = [];
  errorcount: number = 0;
  adsArr = [];
  todayDate = "";

  public id;
  ngOnInit() {
    var url= document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    this.getads();
    this.getMerch();
    $("form").attr('autocomplete', 'off');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1
    var hh = today.getHours();

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
  }
  public ogthumb;
  url;
  public images;
  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
        var maxFileSize = 1024 * 1024; 
    
        const file = event.target.files[0];
        
        if(this.images.size > maxFileSize){
          alert('Image too large. Maximum file size is 1MB');
          this.editads.thumbnail = this.ogthumb;
          console.log(this.ogthumb)
          console.log(this.editads.thumbnail)
        }
        else{
          this.images=file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.ogthumb =this.editads.thumbnail;
        }
      }
  
      }
    }
  }

  addimage(){
    const formData = new FormData();
  
    formData.append('file', this.images)
    formData.append('id', this.editads._id)
    formData.append('title', this.editads.title)
    formData.append('pdate', this.editads.pdate)
    formData.append('ptime', this.editads.ptime)
    formData.append('sdate', this.editads.sdate)
    formData.append('edate', this.editads.edate)
    formData.append('merchant', this.editads.merchant)
    formData.append('detail', this.editads.detail)
  
    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editadvertandimage', formData).subscribe(res =>{
      console.log(res);
      this.message = res;
  });
          setTimeout(() => {
          // window.location.href = "/advertisement";  
          this.router.navigate(['/advertisement'])
        }, 300);
  }

imagesArr =[];
public image;
public imagetype;

  getads(){
    this.http.get('http://165.22.50.213:3000/getoneadvertandimage/'+this.id).subscribe(res => {
      this.adsArr = res['data'];
      this.editads = {
        _id: this.id,
        title: this.adsArr[0].title,
        pdate: this.adsArr[0].pdate,
        ptime: this.adsArr[0].ptime,
        sdate: this.adsArr[0].sdate,
        edate: this.adsArr[0].edate,
        merchant: this.adsArr[0].merchant,
        thumbnail: this.adsArr[0].thumbnail,
        detail: this.adsArr[0].detail
      }
      $('#newimg').hide();
      this.image = new Buffer(this.adsArr[0].thumbnail.data).toString('base64');
      this.imagetype = this.adsArr[0].thumbnail.contentType;
      this.images = this.adsArr[0].thumbnail;
      this.ogthumb = this.adsArr[0].thumbnail;
    });
  }
  uploadAds(ads){
    console.log(ads);
    
    this.errorcount=0;
    this.validErr = this.validation();
      if(this.errorcount === 0){    
        this.addimage();        
      }
    }
    goBack() {
      window.history.back();
    }
    getMerch() {
      this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
        this.merchArr = res['data'];
    });
    }
    validation(){
      //title
      if(this.editads.title === ''){
        this.validErr['title'] = "*Title is required!";
        this.errorcount++;
      }
      else{
        this.validErr['title'] = ""
      }
  
      //publish date
      if(this.editads.pdate === ''){
        this.validErr['pdate'] = "*Publish Date is required!";
        this.errorcount++;
      }
      else{
        this.validErr['pdate'] = ""
      }
  
      //publish time
      if(this.editads.ptime === ''){
        this.validErr['ptime'] = "*Publish Time is required!";
        this.errorcount++;
      }
      else{
        this.validErr['ptime'] = ""
      }
  
      //start date
      if(this.editads.sdate === ''){
        this.validErr['sdate'] = "*Start Date is required!";
        this.errorcount++;
      }
      else if(this.editads.sdate < this.editads.pdate){
        this.validErr['sdate'] = "*Invalid start date!";
        this.errorcount++;
      }
      else{
        this.validErr['sdate'] = ""
      }
  
      //end date
      if(this.editads.edate === ''){
        this.validErr['edate'] = "*End Date is required!";
        this.errorcount++;
      }
      else if(this.editads.edate < this.editads.sdate){
        this.validErr['edate'] = "*Invalid end date!";
        this.errorcount++;
      }
      else if(this.editads.edate < this.todayDate){
        this.validErr['edate'] = "*Invalid end date!";
        this.errorcount++;
      }
      else{
        this.validErr['edate'] = ""
      }
  
      //merchant
      if(this.editads.merchant === ''){
        this.validErr['merchant'] = "*Merchant is required!";
        this.errorcount++;
      }
      else{
        this.validErr['merchant'] = ""
      }
  
      // //thumbnail
      // if(this.ads.thumbnail === ''){
      //   this.validErr['thumbnail'] = "*Thumbnail is required!";
      //   this.errorcount++;
      // }
      // else{
      //   this.validErr['thumbnail'] = ""
      // }
  
      //details
      if(this.editads.detail === ''){
        this.validErr['detail'] = "*Details is required!";
        this.errorcount++;
      }
      else{
        this.validErr['detail'] = ""
      }
  
  
      return this.validErr;
    }
  
}
