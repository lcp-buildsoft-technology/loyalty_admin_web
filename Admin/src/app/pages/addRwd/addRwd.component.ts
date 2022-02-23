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
  selector: 'app-addRwd',
  templateUrl: './addRwd.component.html',
  styleUrls: ['./addRwd.component.scss']
})
export class AddRwdComponent implements OnInit {

  message: any;
  valid = [];
  error: number = 0;

  constructor(private http: HttpClient, private router:Router) {
  }

  public rwd = {
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    reward: '',
    updatedate: '',
    createddate: '',
    termsandcondition: '',
    duration: '',
    status: '',
    memberid: '',
    available:'',
    checkfromwho:'',
    checkwhat: '',
    specificdate: ''
  }
  public rwdvoucher = {
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    vtype: '',
    discount: '',
    minspend: '',
    termsandcondition: '',
    updatedate: '',
    createddate: '',
    duration: '',
    status: '',
    merchantid: '',
    memberid: '',
    available: '',
    checkfromwho:'',
    checkwhat: '',
    specificdate: ''
  }
  
  public rewardtype;
  getrewardtype(event:any){
    if(this.rewardtype == 'Points' ){
      $('#rewtypepoints').show();
      $('#rewtypevoucher').hide();
    }
    else{
      $('#rewtypevoucher').show();
      $('#rewtypepoints').hide();
    }
  }
  public todayDate;
  ngOnInit() {
    this.getMerch();
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

    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce1, #mymce2',
      height: 350,
      resize: false,
      autosave_ask_before_unload: false,
      plugins: [
        ' advlist anchor autolink codesample fullscreen help image tinydrive',
        ' lists link media noneditable preview',
        ' searchreplace table template visualblocks wordcount'
      ],

      toolbar:
        'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
      spellchecker_dialog: true,
      spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
      tinydrive_demo_files_url: '/docs/demo/tiny-drive-demo/demo_files.json',
      tinydrive_token_provider: function (success, failure) {
        success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
      },
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    };

    tinymce.init(demoBaseConfig);

    $("form").attr('autocomplete', 'off');

  }
  
  imagesArr =[];
  public image;
  public images;
  public imagetype;
  url=('../../../assets/img/blankimg.PNG');

  onselectFile(event:any){
    if(event.target.files){
        if(event.target.files.length != 0){
          var maxFileSize = 1024 * 1024; //1MB

          const file = event.target.files[0];

          if(file.size > maxFileSize){
            alert('Image too large. Maximum file size is 1MB');
            this.rwd.thumbnail = '';
            this.url = ('../../../assets/img/blankimg.PNG');
          }
          else{
            this.rwd.thumbnail = 'a'
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

  sendRwd() {
    this.error = 0;
    // // this.rwd.detail = tinymce.get("mymce1").getContent();
    // console.log(this.rwd);
    // this.valid = this.validation()
    // if (this.error === 0) {
    // //   this.addRwd(this.rwd);
    // // }
    this.rwd.createddate = this.todayDate;
    this.rwd.updatedate = this.todayDate;
    this.rwd.duration = this.rwd.duration.toString();
    this.rwd.available = "Available";
    this.rwd.status = "Active"
    this.rwd.detail = tinymce.get("mymce1").getContent();
    console.log(this.rwd)
    this.validation();      
      if(this.error == 0){
        if(this.rwd.type == "Daily" || this.rwd.type=="Monthly"){
            this.addimage();
        }
        else{
          if (this.rwd.checkfromwho === '') {
            this.valid['checkwho'] = "*Check from is required!";
            this.error++;
          }
          else {
            this.valid['checkwho'] = ""
            if(this.rwd.checkfromwho === "Member" || this.rwd.checkfromwho == "Merchant"){
              if(this.rwd.checkwhat ===""){
                this.valid['checkwhat'] = "*Field to check is required!";
                this.error++;
              }
              else{
                this.valid['checkwhat'] ="";
                this.addimage();
              }
              
            }
            else if (this.rwd.checkfromwho == "Other"){
              this.valid['checkwhat'] = "";
              if(this.rwd.specificdate ===""){
                this.valid['spedate'] = "*Date is required!";
                this.error++;
              }
              else{
                this.valid['spedate'] = "";
                this.addimage();
              }
            }
            else{
              this.valid['checkwhat'] = "*Field to check is required!";
                this.error++;
            }
            
          }
        }
      }
  }

  sendRwdvoucher() {
    this.error = 0;
    // // this.rwd.detail = tinymce.get("mymce1").getContent();
    // console.log(this.rwd);
    // this.valid = this.validation()
    // if (this.error === 0) {
    // //   this.addRwd(this.rwd);
    // // }
    this.rwdvoucher.createddate = this.todayDate;
    this.rwdvoucher.updatedate = this.todayDate;
    this.rwdvoucher.duration = this.rwdvoucher.duration.toString();
    this.rwdvoucher.available = "Available";
    this.rwdvoucher.status = "Active"
    this.rwdvoucher.detail = tinymce.get("mymce2").getContent();
    console.log(this.rwdvoucher)
    this.validation2();      
      if(this.error == 0){
        if(this.rwdvoucher.type == "Daily" || this.rwdvoucher.type=="Monthly"){
          this.addimage2();
        }
        else{
          if (this.rwdvoucher.checkfromwho === '') {
            this.valid['checkwho22'] = "*Check from is required!";
            this.error++;
          }
          else {
            this.valid['checkwho22'] = ""
            if(this.rwdvoucher.checkfromwho === "Member" || this.rwdvoucher.checkfromwho == "Merchant"){
              if(this.rwdvoucher.checkwhat ===""){
                this.valid['checkwhat22'] = "*Field to check is required!";
                this.error++;
              }
              else{
                this.valid['checkwhat22'] ="";
                this.addimage2();
              }
              
            }
            else if (this.rwdvoucher.checkfromwho == "Other"){
              this.valid['checkwhat22'] = "";
              if(this.rwdvoucher.specificdate ===""){
                this.valid['spedate22'] = "*Date is required!";
                this.error++;
              }
              else{
                this.valid['spedate22'] = "";
                this.addimage2();
              }
            }
            else{
              this.valid['checkwhat22'] = "*Field to check is required!";
                this.error++;
            }
            
          }
        }
      }
  }


  public lastrwdid;
  addimage(){
    const formData = new FormData();
  
    formData.append('file', this.images)
    formData.append('title', this.rwd.title)
    formData.append('type', this.rwd.type)
    formData.append('detail', this.rwd.detail)
    formData.append('reward', this.rwd.reward)
    formData.append('termsandcondition', this.rwd.termsandcondition)
    formData.append('createddate', this.rwd.createddate)
    formData.append('updatedate', this.rwd.updatedate)
    formData.append('status', this.rwd.status)
    formData.append('duration', this.rwd.duration)
    formData.append('memberid', this.rwd.memberid)
    formData.append('available', this.rwd.available)
    formData.append('specificdate', this.rwd.specificdate)
    formData.append('checkfromwho', this.rwd.checkfromwho)
    formData.append('checkwhat', this.rwd.checkwhat)
  
    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/uprewardandimage', formData).subscribe(res =>{
      console.log(res);
      this.message = res;
      // window.location.href = "/rewards";
      this.router.navigate(['/rewards'])
    });
  }
  addimage2(){
    const formData = new FormData();
  
    formData.append('file', this.images)
    formData.append('title', this.rwdvoucher.title)
    formData.append('type', this.rwdvoucher.type)
    formData.append('detail', this.rwdvoucher.detail)
    formData.append('vtype', this.rwdvoucher.vtype)
    formData.append('discount', this.rwdvoucher.discount)
    formData.append('minspend', this.rwdvoucher.minspend)
    formData.append('termsandcondition', this.rwdvoucher.termsandcondition)
    formData.append('createddate', this.rwdvoucher.createddate)
    formData.append('updatedate', this.rwdvoucher.updatedate)
    formData.append('status', this.rwdvoucher.status)
    formData.append('duration', this.rwdvoucher.duration)
    formData.append('memberid', this.rwdvoucher.memberid)
    formData.append('merchantid', this.rwdvoucher.merchantid)
    formData.append('available', this.rwdvoucher.available)
    formData.append('specificdate', this.rwdvoucher.specificdate)
    formData.append('checkfromwho', this.rwdvoucher.checkfromwho)
    formData.append('checkwhat', this.rwdvoucher.checkwhat)

  
    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/uprewardvchandimage', formData).subscribe(res =>{
      console.log(res);
      this.message = res;
      // window.location.href = "/rewards";
      this.router.navigate(['/rewards'])
    });
  }
  addRwd(rwd) {
    console.log(this.rwd);

    this.http.post('http://165.22.50.213:3000/addRwd', rwd).subscribe(res => {
      console.log(res);
      this.message = res;
      this.getLastRwd();
    });
    setTimeout(() => {
    // window.location.href = "/rewards";
    this.router.navigate(['/rewards'])
  }, 1200);
  }

  getLastRwd(){
    this.http.get('http://165.22.50.213:3000/getlastrwd').subscribe(res => {
      this.lastrwdid = res['data'][0]._id;
      console.log(this.lastrwdid);
      this.addimage()
    });

  }

  merchArr = [];
  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
  });
  }
  
  validation() {
    if (this.rwd.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
      
    }
    else {
      this.valid['title'] = ""
    }

    if (this.rwd.thumbnail === '') {
      this.valid['thumbnail'] = "*Thumbnail is required!";
      this.error++;
      
    }
    else {
      this.valid['thumbnail'] = ""
    }

    if (this.rwd.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
      
    }
    else {
      this.valid['detail'] = ""
    }

    if (this.rwd.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
      
    }
    else {
      this.valid['type'] = ""
    }

    if (this.rwd.reward === '') {
      this.valid['reward'] = "*Reward is required!";
      this.error++;
      
    }
    else {
      this.valid['reward'] = ""
    }

    if (this.rwd.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Condition is required!";
      this.error++;
      
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    if (this.rwd.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
      
    }
    else {
      this.valid['status'] = ""
    }

    if (this.rwd.duration === '') {
      this.valid['duration'] = "*Duration is required!";
      this.error++;
      
    }
    else {
      this.valid['duration'] = ""
    }
  }

  validation2() {
    if (this.rwdvoucher.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    if (this.rwdvoucher.thumbnail === '') {
      this.valid['thumbnail'] = "*Thumbnail is required!";
      this.error++;
    }
    else {
      this.valid['thumbnail'] = ""
    }

    if (this.rwdvoucher.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    if (this.rwdvoucher.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }
    if (this.rwdvoucher.merchantid === '') {
      this.valid['merchant'] = "*Merchant is required!";
      this.error++;
    }
    else {
      this.valid['merchant'] = ""
    }


    if (this.rwdvoucher.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Condition is required!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    if (this.rwdvoucher.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    if (this.rwdvoucher.duration === '') {
      this.valid['duration'] = "*Duration is required!";
      this.error++;
    }
    else {
      this.valid['duration'] = ""
    }
    if (this.rwdvoucher.vtype === '') {
      this.valid['vtype'] = "*Type of voucher is required!";
      this.error++;
    }
    else {
      this.valid['vtype'] = ""
    }
    if (this.rwdvoucher.discount === '') {
      this.valid['discount'] = "*Amount of Discount is required!";
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }
    if (this.rwdvoucher.minspend === '') {
      this.valid['minspend'] = "*Minimum Spending Amount is required!";
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }
  }

  goBack() {
    window.history.back();
  }
  checktype(){
    if(this.rwd.type != 'Daily' && this.rwd.type != 'Monthly'){
      this.rwd.specificdate='';
      $('#rwdcheckwhos').show();
    }
    else{
      $('#rwdcheckwhos').hide();
      $('#memberrwd').hide();
      $('#merchantrwd').hide();
      $('#specificrwd').hide();
      this.rwd.specificdate='';
      this.rwd.checkfromwho='';
      this.rwd.checkwhat='';
    }
  }
  checktype2(){
    if(this.rwdvoucher.type != 'Daily' && this.rwdvoucher.type != 'Monthly'){
      this.rwdvoucher.specificdate='';
      $('#rwdcheckwhos2').show();
    }
    else{
      $('#memberrwd2').hide();
      $('#merchantrwd2').hide();
      $('#specificrwd2').hide();
      $('#rwdcheckwhos2').hide();
      this.rwdvoucher.specificdate='';
      this.rwdvoucher.checkfromwho='';
      this.rwdvoucher.checkwhat='';
    }
  }

  getcheckwhat(){

    if(this.rwd.checkfromwho == 'Member'){
      this.rwd.specificdate='';
      this.rwd.checkwhat = '';
      $('#memberrwd').show();
      $('#merchantrwd').hide();
      $('#specificrwd').hide();
    }
    else if (this.rwd.checkfromwho == 'Merchant'){
      this.rwd.specificdate='';
      this.rwd.checkwhat = '';
      $('#merchantrwd').show();
      $('#memberrwd').hide();
      $('#specificrwd').hide();
    }
    else{
      this.rwd.checkwhat = 'specialdate';
      $('#specificrwd').show();
      $('#memberrwd').hide();
      $('#merchantrwd').hide();
    }
  }
  getcheckwhat2(){

    if(this.rwdvoucher.checkfromwho == 'Member'){
      this.rwdvoucher.specificdate='';
      this.rwdvoucher.checkwhat = '';
      $('#memberrwd2').show();
      $('#merchantrwd2').hide();
      $('#specificrwd2').hide();
    }
    else if (this.rwdvoucher.checkfromwho == 'Merchant'){
      this.rwdvoucher.specificdate='';
      this.rwdvoucher.checkwhat = '';
      $('#merchantrwd2').show();
      $('#memberrwd2').hide();
      $('#specificrwd2').hide();
    }
    else{
      this.rwdvoucher.checkwhat = 'specialdate';
      $('#specificrwd2').show();
      $('#memberrwd2').hide();
      $('#merchantrwd2').hide();
    }
  }

}
