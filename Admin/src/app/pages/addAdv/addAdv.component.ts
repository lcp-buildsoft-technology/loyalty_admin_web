import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserModule } from '@angular/platform-browser';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addAdv',
  templateUrl: './addAdv.component.html',
  styleUrls: ['./addAdv.component.scss']
})
export class AddAdvComponent implements OnInit {

  message: any;
  todayDate = "";
  validErr = [];
  errorcount: number = 0;
  constructor(private http: HttpClient, private form: FormBuilder, private router:Router){
    
  }

  public ads = {
    title: '',
    pdate: '',
    ptime: '',
    sdate: '',
    edate: '',
    merchant: '',
    thumbnail: '',
    detail: ''
  }
  public images;
  url=('../../../assets/img/blankimg.PNG');
  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
        console.log(event.target.files)
        // const file = event?.target.files[0];
        // this.images=file;
        var maxFileSize = 1024 * 1024; //1MB
        const file = event.target.files[0];

          if(file.size > maxFileSize){
            alert('Image too large. Maximum file size is 1MB');
            this.ads.thumbnail = '';
            this.url = ('../../../assets/img/blankimg.PNG');
          }
          else{
            this.ads.thumbnail="a";
            this.images=file;
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0]);
            reader.onload=(event:any)=>{

            this.url=event.target.result;
          }
      }
    }
  }

}
  ngOnInit() {
    this.getMerch();
    // this.getAdsNews();
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
  sendAds(){
    this.errorcount=0;
    // this.ads.description = tinymce.get("mymce1").getContent();
    console.log(this.ads);
    this.validErr = this.validation();
    if(this.errorcount === 0){
      this.addimage()
      // this.addAds(this.ads);
    }
    //this.newNoti(this.notification);
  }
  addAds(ads){
    console.log(this.ads);
    
    this.http.post('http://165.22.50.213:3000/addads', ads).subscribe(res =>{
      console.log(res);
      this.message = res;
      // this.getLastAds();
      // window.location.reload();
  });
  setTimeout(() => {
    // window.location.href = "/advertisement";
    this.router.navigate(['/advertisement'])
  }, 1200);
  }
  public lastadsid;
  public testarr;
  arr = [];
  merchArr = [];

  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
});
}
// getLastAds(){
//   this.http.get('http://165.22.50.213:3000/getlastads').subscribe(res => {
//     this.lastadsid = res['data'][0]._id;
//     console.log(this.lastadsid);
    
//   });

// }
addimage(){
  const formData = new FormData();

  formData.append('file', this.images)
  formData.append('title', this.ads.title)
  formData.append('pdate', this.ads.pdate)
  formData.append('ptime', this.ads.ptime)
  formData.append('sdate', this.ads.sdate)
  formData.append('edate', this.ads.edate)
  formData.append('merchant', this.ads.merchant)
  formData.append('detail', this.ads.detail)

  // formData.forEach(file => console.log("File: ", file));
  this.http.post('http://165.22.50.213:3000/upadvertandimage', formData).subscribe(res =>{
  console.log(res);
  this.message = res;
  // window.location.reload();
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/advertisement'])

  });
  setTimeout(() => {
    // window.location.href = "/advertisement";
    this.router.navigate(['/advertisment'])
  }, 300);
  
}
  // padLeadingZeros(num, size) {
  //   var s = num+"";
  //   while (s.length < size) s = "0" + s;
  //   return s;
  // }
  
  // getAdsNews(){
  //   this.http.get('http://165.22.50.213:3000/getlastads').subscribe(res => {
  //     this.lastadsid = res['data'][0].id;
  //     // console.log(this.lastnewsid.toString().split('-'));
  //     this.arr = this.lastadsid.toString().split('-');
  //     // console.log(this.arr);
  //     this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
  //     this.lastadsid = this.arr.join('-');
  //     // console.log(this.lastnewsid);
  //     this.ads.id = this.lastadsid;
  //   });
  // }
  // getBackId(){
  //   this.getAdsNews();
  // }
  goBack() {
    window.history.back();
  }
  validation(){
    //title
    if(this.ads.title === ''){
      this.validErr['title'] = "*Title is required!";
      this.errorcount++;
    }
    else{
      this.validErr['title'] = ""
    }

    //publish date
    if(this.ads.pdate === ''){
      this.validErr['pdate'] = "*Publish date is required!";
      this.errorcount++;
    }
    else if(this.ads.pdate < this.todayDate){
      this.validErr['pdate'] = "*Inavlid publish date!";
      this.errorcount++;
    }
    else{
      this.validErr['pdate'] = ""
    }

    //publish time
    if(this.ads.ptime === ''){
      this.validErr['ptime'] = "*Publish time is required!";
      this.errorcount++;
    }
    else{
      this.validErr['ptime'] = ""
    }

    //start date
    if(this.ads.sdate === ''){
      this.validErr['sdate'] = "*Start date is required!";
      this.errorcount++;
    }
    else if(this.ads.sdate < this.ads.pdate){
      this.validErr['sdate'] = "*Invalid start time!";
      this.errorcount++;
    }
    else if(this.ads.sdate < this.todayDate){
      this.validErr['sdate'] = "*Invalid start time!";
      this.errorcount++;
    }
    else{
      this.validErr['sdate'] = ""
    }

    //end date
    if(this.ads.edate === ''){
      this.validErr['edate'] = "*End date is required!";
      this.errorcount++;
    }
    else if(this.ads.edate <= this.ads.sdate){
      this.validErr['edate'] = "*Invalid end date!";
      this.errorcount++;
    }
    else if(this.ads.edate < this.todayDate){
      this.validErr['edate'] = "*Inavlid end date!";
      this.errorcount++;
    }
    else{
      this.validErr['edate'] = ""
    }

    //merchant
    if(this.ads.merchant === ''){
      this.validErr['merchant'] = "*Merchant is required!";
      this.errorcount++;
    }
    else{
      this.validErr['merchant'] = ""
    }

    //thumbnail
    if(this.ads.thumbnail === ''){
      this.validErr['thumbnail'] = "*Thumbnail is required!";
      this.errorcount++;
    }
    else{
      this.validErr['thumbnail'] = ""
    }

    //details
    if(this.ads.detail === ''){
      this.validErr['detail'] = "*Details is required!";
      this.errorcount++;
    }
    else{
      this.validErr['detail'] = ""
    }


    return this.validErr;
  }

}
