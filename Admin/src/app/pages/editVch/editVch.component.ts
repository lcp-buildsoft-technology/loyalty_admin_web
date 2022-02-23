import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editVch',
  templateUrl: './editVch.component.html',
  styleUrls: ['./editVch.component.scss']
})
export class EditVchComponent implements OnInit {

  message: any;
  voucherArr = [];
  new: Object;
  public sch = [];
  public id;
  valid = [];
  error: number = 0;

  discountPattern ="^[0-9]{1,4}$";
  spendPattern ="^[0-9]{1,5}$";

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private form: FormBuilder) {
    this.sch = [...this.voucherArr];
  }

  public editVch = {
    _id: '',
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
    merchantid: '',
  }

  merchArr = [];
  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
    });
  }

  ngOnInit() {
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    console.log(this.id)
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

    this.getVch();
    this.getMerch();
    // this.showImage();
  }
  public ogthumb;
  url;
  public images;

  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
      var maxFileSize = 1024 * 1024; //1MB

      const file = event.target.files[0];
      if(file.size > maxFileSize){
        alert('Image too large. Maximum file size is 1MB');
        this.editVch.thumbnail = this.ogthumb;
        console.log(this.ogthumb)
        console.log(this.editVch.thumbnail)
      }
      else {
        this.images = file;
        $('#newimg').show();
        $('#ogimg').hide();
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=(event:any)=>{
        this.url=event.target.result;
        this.ogthumb =this.editVch.thumbnail;
      }
    }
      }
    }

  }
  openv(vch) {
    this.editVch = {
      _id: vch._id,
      title: vch.title,
      thumbnail: vch.thumbnail,
      detail: vch.detail,
      type: vch.type,
      quantity: vch.quantity,
      discount: vch.discount,
      minspend: vch.minspend,
      termsandcondition: vch.termsandcondition,
      sdate: vch.sdate,
      edate: vch.edate,
      status: vch.status,
      merchantid: vch.merchantid,
    }
  }

  getVch() {
    this.http.get('http://165.22.50.213:3000/getonevoucherandimage/' + this.id).subscribe(res => {
      this.voucherArr = res['data'];
      console.log(this.voucherArr);

      this.editVch = {
        _id: this.voucherArr[0]._id,
        title: this.voucherArr[0].title,
        thumbnail: this.voucherArr[0].thumbnail,
        detail: this.voucherArr[0].detail,
        type: this.voucherArr[0].type,
        quantity: this.voucherArr[0].quantity,
        discount: this.voucherArr[0].discount,
        minspend: this.voucherArr[0].minspend,
        termsandcondition: this.voucherArr[0].termsandcondition,
        sdate: this.voucherArr[0].sdate,
        edate: this.voucherArr[0].edate,
        status: this.voucherArr[0].status,
        merchantid: this.voucherArr[0].merchantid,
      }
      $('#newimg').hide();
      this.image = new Buffer(this.voucherArr[0].thumbnail.data).toString('base64');
      this.imagetype = this.voucherArr[0].thumbnail.contentType;
      this.images = this.voucherArr[0].thumbnail;
      this.ogthumb = this.voucherArr[0].thumbnail;
      $('#editcoucherstatus [value=' + this.voucherArr[0].status + ']').attr('selected', 'true');
      $('#vchtype [value="' + this.voucherArr[0].type + '"]').attr('selected', 'true');
      tinymce.get("mymce1").setContent(this.editVch.detail);

    });
    console.log(this.voucherArr)
  }

  uploadVch(vch) {
    this.error = 0; 
    this.validation();
    vch.detail = tinymce.get("mymce1").getContent();
    this.editVch.detail = tinymce.get("mymce1").getContent();
    if (this.error == 0) {
      //   console.log(vch);
      // this.http.post('http://165.22.50.213:3000/editVch', vch).subscribe(res => {
      //   console.log(res);
      //   this.message = res;
      //   window.location.reload()
      // });
      // window.location.href = "/rewards";
      this.addimage();
    }
  }

  goBack() {
    window.history.back();
  }

  validation() {
    this.editVch.detail = tinymce.get("mymce1").getContent();
    //title
    if (this.editVch.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    // //thumbnail
    // if(this.editVch.thumbnail === ''){
    //   this.valid['thumbnail'] = "*Please select a thumbnail!";
    //   this.error++;
    // }
    // else{
    //   this.valid['thumbnail'] = ""
    // }

    //detail
    if (this.editVch.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    //merchant
    if (this.editVch.merchantid === '') {
      this.valid['merchant'] = "*Merchant is required!";
      this.error++;
    }
    else {
      this.valid['merchant'] = ""
    }

    //type
    if (this.editVch.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    //quantity
    if (this.editVch.quantity === '') {
      this.valid['quantity'] = "*Quantity is required!";
      this.error++;
    }
    else {
      this.valid['quantity'] = ""
    }

    //tnc
    if (this.editVch.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Conditions is required!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    //start date
    if (this.editVch.sdate === '') {
      this.valid['sdate'] = "*Start Date is required!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.editVch.edate === '') {
      this.valid['edate'] = "*End Date is required!";
      this.error++;
    }
    else if (this.editVch.edate <= this.editVch.sdate) {
      this.valid['edate'] = "*Invalid End Date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    //status
    if (this.editVch.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    //discount
    if (this.editVch.discount === '') {
      this.valid['discount'] = "*Amount of Discount is required!";
      this.error++;
    }
    else if(this.editVch.type === 'Percentage'){
      if (parseInt(this.editVch.discount) > 100){
        this.valid['discount'] = "*Invalid Discount Amount!";
        this.error++;
      }
    }
    else if (!this.editVch.discount.match(this.discountPattern) ) {
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }

    //minimum spend
    if (this.editVch.minspend === '') {
      this.valid['minspend'] = "*Minimum Spend Amount is required!";
      this.error++;
    }
    else if (!this.editVch.minspend.match(this.spendPattern)) {
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }

    return this.valid;
  }
  imagesArr = [];
  public image;
  public imagetype;
  // showImage(){
  //   $('#newimg').hide();
  //   this.http.get('http://165.22.50.213:3000/getoneimage/'+this.id).subscribe(res => {
  //     this.imagesArr = res['data'];
  //     console.log("wtf",this.imagesArr)
  //     this.image = new Buffer(this.imagesArr[0].img.data).toString('base64');
  //     this.imagetype = this.imagesArr[0].img.contentType;
  // });
  // console.log(999)

  // }
  addimage() {
    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('id', this.id)
    formData.append('title', this.editVch.title)
    formData.append('detail', this.editVch.detail)
    formData.append('type', this.editVch.type)
    formData.append('quantity', this.editVch.quantity)
    formData.append('discount', this.editVch.discount)
    formData.append('minspend', this.editVch.minspend)
    formData.append('termsandcondition', this.editVch.termsandcondition)
    formData.append('sdate', this.editVch.sdate)
    formData.append('edate', this.editVch.edate)
    formData.append('status', this.editVch.status)
    formData.append('merchantid', this.editVch.merchantid)


    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editvoucherandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.reload()
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/rewards'])

    });
    // window.location.href = "/rewards";
    this.router.navigate(['/rewards'])
  }

}
