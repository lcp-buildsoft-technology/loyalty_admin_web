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
  selector: 'app-editRwd',
  templateUrl: './editRwd.component.html',
  styleUrls: ['./editRwd.component.scss']
})
export class EditRwdComponent implements OnInit {

  message: any;
  rewardArr = [];
  new: Object;
  public srch = [];
  public id;
  valid = [];
  error: number = 0;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private form: FormBuilder) {
    this.srch = [...this.rewardArr];
  }

  public editRwd = {
    _id: '',
    title: '',
    thumbnail: [],
    detail: '',
    type: '',
    reward: '',
    termsandcondition: '',
    createddate: '',
    updatedate: '',
    duration: '',
    memberid: '',
    available: '',
    specificdate: '',
    checkfromwho: '',
    checkwhat: '',
    status: ''
  }


  ngOnInit() {
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1];
    console.log(this.id)
    this.getRwd();
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
    // this.showImage();
    tinymce.init(demoBaseConfig);
    this.checktype();
  }

  openr(rwd) {
    this.editRwd = {
      _id: rwd._id,
      title: rwd.title,
      thumbnail: rwd.thumbnail,
      detail: rwd.detail,
      type: rwd.type,
      reward: rwd.reward,
      termsandcondition: rwd.termsandcondition,
      createddate: rwd.createddate,
      updatedate: rwd.updatedate,
      duration: rwd.duration,
      memberid: rwd.memberid,
      available: rwd.available,
      specificdate: rwd.specificdate,
      checkfromwho: rwd.checkfromwho,
      checkwhat: rwd.checkwhat,
      status: rwd.status
    }
  }
  public ogthumb;
  getRwd() {
    this.http.get('http://165.22.50.213:3000/getonerewardandimage/'+ this.id).subscribe(res => {
      this.rewardArr = res['data'];
      console.log(this.rewardArr);

          this.editRwd = {
            _id: this.rewardArr[0]._id,
            title: this.rewardArr[0].title,
            thumbnail: this.rewardArr[0].thumbnail,
            detail: this.rewardArr[0].detail,
            type: this.rewardArr[0].type,
            reward: this.rewardArr[0].reward,
            termsandcondition: this.rewardArr[0].termsandcondition,
            updatedate: this.rewardArr[0].updatedate,
            createddate: this.rewardArr[0].createddate,
            duration: this.rewardArr[0].duration,
            memberid: this.rewardArr[0].memberid,
            available: this.rewardArr[0].available,
            specificdate: this.rewardArr[0].specificdate,
            checkfromwho: this.rewardArr[0].checkfromwho,
            checkwhat: this.rewardArr[0].checkwhat,
            status: this.rewardArr[0].status
          }
          $('#newimg').hide();
          this.image = new Buffer(this.rewardArr[0].thumbnail.data).toString('base64');
          this.imagetype = this.rewardArr[0].thumbnail.contentType;
          this.images = this.rewardArr[0].thumbnail;
          this.ogthumb = this.rewardArr[0].thumbnail;
          tinymce.get("mymce1").setContent(this.editRwd.detail);
          this.ogthumb = this.rewardArr[0].thumbnail;
          this.getcheckwhat();
    });
  }
  url;
  public images;
  onselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
      var maxFileSize = 1024 * 1024; //1MB

      const file = event.target.files[0];
     
      if (file.size > maxFileSize) {
        alert('Image too large. Maximum file size is 1MB');
        this.editRwd.thumbnail = this.ogthumb;
        console.log(this.ogthumb)
        console.log(this.editRwd.thumbnail)
      }
      else {
        this.images = file;
        $('#newimg').show();
        $('#ogimg').hide();
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.ogthumb = this.editRwd.thumbnail;
        }
      }

      }
    }

  }
  imagesArr = [];
  public image;
  public imagetype;
  // showImage() {
  //   $('#newimg').hide();
  //   this.http.get('http://165.22.50.213:3000/getoneimage/' + this.id).subscribe(res => {
  //     this.imagesArr = res['data'];
  //     console.log(this.imagesArr)
  //     this.image = new Buffer(this.imagesArr[0].img.data).toString('base64');
  //     this.imagetype = this.imagesArr[0].img.contentType;
  //   });
  //   console.log(999)

  // }
  addimage() {
    const formData = new FormData();

    if(this.editRwd.type != 'Annually'){
      this.editRwd.checkfromwho='';
      this.editRwd.specificdate='';
      this.editRwd.checkwhat='';
    }

    formData.append('file', this.images)
    formData.append('id', this.id)
    formData.append('title', this.editRwd.title)
    formData.append('type', this.editRwd.type)
    formData.append('detail', this.editRwd.detail)
    formData.append('reward', this.editRwd.reward)
    formData.append('termsandcondition', this.editRwd.termsandcondition)
    formData.append('createddate', this.editRwd.createddate)
    formData.append('updatedate', this.editRwd.updatedate)
    formData.append('status', this.editRwd.status)
    formData.append('duration', this.editRwd.duration)
    formData.append('memberid', this.editRwd.memberid)
    formData.append('available', this.editRwd.available)
    formData.append('specificdate', this.editRwd.specificdate)
    formData.append('checkfromwho', this.editRwd.checkfromwho)
    formData.append('checkwhat', this.editRwd.checkwhat)


    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editrewardandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.href = "/rewards";
      this.router.navigate(['/rewards'])
    });
  }
  uploadRwd() {
    this.error = 0;
    this.valid = this.validation();
    this.editRwd.detail = tinymce.get("mymce1").getContent();
    if (this.error === 0) {
      // this.http.post('http://165.22.50.213:3000/editRwd', this.editRwd).subscribe(res => {
      //   console.log(res);
      //   this.message = res;
      //   window.location.href = "/rewards";
      // });
      this.addimage();

    }
  }
  goBack() {
    window.history.back();
  }


    validation() {
      if (this.editRwd.title === '') {
        this.valid['title'] = "*Title is required!";
        this.error++;
      }
      else {
        this.valid['title'] = ""
      }

      // if (this.editRwd.thumbnail === '') {
      //   this.valid['thumbnail'] = "*Please select a thumbnail!";
      //   this.error++;
      // }
      // else {
      //   this.valid['thumbnail'] = ""
      // }

      if (this.editRwd.detail === '') {
        this.valid['detail'] = "*Detail is required!";
        this.error++;
      }
      else {
        this.valid['detail'] = ""
      }

      if (this.editRwd.type === '') {
        this.valid['type'] = "*Type is required!";
        this.error++;
      }
      else {
        this.valid['type'] = ""
      }
      

      if (this.editRwd.reward === '') {
        this.valid['reward'] = "*Reward is required!";
        this.error++;
      }
      else {
        this.valid['reward'] = ""
      }

      if (this.editRwd.termsandcondition === '') {
        this.valid['termsandcondition'] = "*Terms and Conditions is required!";
        this.error++;
      }
      else {
        this.valid['termsandcondition'] = ""
      }

      // if (this.editRwd.sdate === '') {
      //   this.valid['sdate'] = "*Please select a start date!";
      //   this.error++;
      // }
      // else {
      //   this.valid['sdate'] = ""
      // }

      // if (this.editRwd.edate === '') {
      //   this.valid['edate'] = "*Please select a end date!";
      //   this.error++;
      // }
      // else {
      //   this.valid['edate'] = ""
      // }

      if (this.editRwd.status === '') {
        this.valid['status'] = "*Status is required!";
        this.error++;
      }
      else {
        this.valid['status'] = ""
      }

      return this.valid;
    }
    checktype(){
      if(this.editRwd.type == 'Annually'){
        this.editRwd.specificdate='';
        $('#rwdcheckwhos').show();
      }
      else{
        $('#rwdcheckwhos').hide();
        $('#memberrwd').hide();
        $('#merchantrwd').hide();
        $('#specificrwd').hide();
        this.editRwd.specificdate='';
        this.editRwd.checkfromwho='';
        this.editRwd.checkwhat='';
      }
    }
    getcheckwhat(){

      if(this.editRwd.checkfromwho == 'Member'){
        this.editRwd.specificdate='';
        $('#memberrwd').show();
        $('#merchantrwd').hide();
        $('#specificrwd').hide();
      }
      else if (this.editRwd.checkfromwho == 'Merchant'){
        this.editRwd.specificdate='';
        $('#merchantrwd').show();
        $('#memberrwd').hide();
        $('#specificrwd').hide();
      }
      else if (this.editRwd.checkfromwho == 'Other'){
        this.editRwd.checkwhat = 'specialdate';
        $('#specificrwd').show();
        $('#memberrwd').hide();
        $('#merchantrwd').hide();
      }
      
      else{
        $('#specificrwd').hide();
        $('#memberrwd').hide();
        $('#merchantrwd').hide();
      }
    }



  }
