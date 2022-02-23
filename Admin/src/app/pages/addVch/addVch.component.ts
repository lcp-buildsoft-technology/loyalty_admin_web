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
  selector: 'app-addVch',
  templateUrl: './addVch.component.html',
  styleUrls: ['./addVch.component.scss']
})
export class AddVchComponent implements OnInit {

  message: any;
  valid = [];
  error: number = 0;
  todayDate = "";
  
  discountPattern ="^[0-9]{1,4}$";
  spendPattern ="^[0-9]{1,5}$";

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router) {
  }

  public vch = {
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    quantity: '',
    discount: '',
    minspend: '',
    termsandcondition: '',
    sdate: '',
    edate: '',
    status: '',
    merchantid:'',
  }

  merchArr = [];

  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
});
}
  ngOnInit() {
    this.getMerch();
    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce1',
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

  sendVch() {
    this.error = 0;
    this.vch.status = 'Active';
    this.vch.detail = tinymce.get("mymce1").getContent();
    console.log(this.vch);

    this.valid = this.validation()
    if (this.error === 0) {
      // this.addVch(this.vch);
      this.addimage();
    }
  }

  addVch(vch) {
    console.log(this.vch);

    this.http.post('http://165.22.50.213:3000/addVch', vch).subscribe(res => {
      console.log(res);
      this.message = res;
      this.getLastVch();
    });
    setTimeout(() => {
      // window.location.href = "/rewards";
      this.router.navigate(['/rewards'])
    }, 1200);
  }
  public lastvchid;
  getLastVch(){
    this.http.get('http://165.22.50.213:3000/getlastvch').subscribe(res => {
      this.lastvchid = res['data'][0]._id;
      console.log(this.lastvchid);
      this.addimage()
    });

}
addimage(){
  const formData = new FormData();
  formData.append('file', this.images)
  formData.append('title', this.vch.title)
  formData.append('detail', this.vch.detail)
  formData.append('type', this.vch.type)
  formData.append('quantity', this.vch.quantity)
  formData.append('discount', this.vch.discount)
  formData.append('minspend', this.vch.minspend)
  formData.append('termsandcondition', this.vch.termsandcondition)
  formData.append('sdate', this.vch.sdate)
  formData.append('edate', this.vch.edate)
  formData.append('status', this.vch.status)
  formData.append('merchantid', this.vch.merchantid)

  // formData.forEach(file => console.log("File: ", file));
  this.http.post('http://165.22.50.213:3000/upvoucherandimage', formData).subscribe(res =>{
    console.log(res);
    this.message = res;
    // window.location.href = "/rewards";
    this.router.navigate(['/rewards'])
});
}
imagesArr =[];
public image;
public images;
public imagetype;
url=('../../../assets/img/blankimg.PNG');

public mime;
public bindata;
onselectFile(event:any){
  if(event.target.files){
    // const file = event?.target.files[0];
    // this.images=file;
    if(event.target.files.length != 0){
      var maxFileSize = 1024 * 1024; //1MB


      const file = event.target.files[0];
      if(file.size > maxFileSize){
        alert('Image too large. Maximum file size is 1MB');
        this.vch.thumbnail = '';
        this.url = ('../../../assets/img/blankimg.PNG');
      }
      else{
        this.vch.thumbnail = 'a'
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
  validation() {
    //title
    if (this.vch.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    //thumbnail
    if (this.vch.thumbnail === '') {
      this.valid['thumbnail'] = "*Thumbnail is required!";
      this.error++;
    }
    else {
      this.valid['thumbnail'] = ""
    }

    //detail
    if (this.vch.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    //merchant
    if (this.vch.detail === '') {
      this.valid['merchant'] = "*Merchant is required!";
      this.error++;
    }
    else {
      this.valid['merchant'] = ""
    }

    //type
    if (this.vch.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    //quantity
    if (this.vch.quantity === '') {
      this.valid['quantity'] = "*Voucher Quantity is required!";
      this.error++;
    }
    else {
      this.valid['quantity'] = ""
    }

    //tnc
    if (this.vch.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Condition is required!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    //start date
    if (this.vch.sdate === '') {
      this.valid['sdate'] = "*Start date is required!";
      this.error++;
    }
    else if (this.vch.sdate < this.todayDate) {
      this.valid['sdate'] = "*Invalid start date!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.vch.edate === '') {
      this.valid['edate'] = "*End date is required!";
      this.error++;
    }
    else if (this.vch.edate <= this.vch.sdate) {
      this.valid['edate'] = "*Invalid end date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    //status
    if (this.vch.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    //discount
    if (this.vch.discount === '') {
      this.valid['discount'] = "*Amount of Discount is required!";
      this.error++;
    }
    else if(this.vch.type === 'Percentage'){
      if (parseInt(this.vch.discount) > 100){
        this.valid['discount'] = "*Invalid discount amount!";
        this.error++;
      }
    }
    else if (!this.vch.discount.match(this.discountPattern) ) {
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }

    //minimum spend
    if (this.vch.minspend === '') {
      this.valid['minspend'] = "*Minimum Spend Amount is required!";
      this.error++;
    }
    else if (!this.vch.minspend.match(this.spendPattern) ) {
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }

    return this.valid;
  }

  goBack() {
    window.history.back();
  }



}
