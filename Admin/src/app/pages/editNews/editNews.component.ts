import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editNews',
  templateUrl: './editNews.component.html',
  styleUrls: ['./editNews.component.scss']
})
export class EditNewsComponent implements OnInit {

  message: any;
  public newsArr = [];
  test: any;
  new: Object;
  search: any;
  public id;
  public srch =[];
  validErr = [];
  errorcount: number = 0;
  todayDate = "";

  public editNews = {
    _id: '',
    title: '',
    date: '',
    time: '',
    receiver: '',
    thumbnail: [],
    description: '',
    caption: ''
  }

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer,  private form: FormBuilder) {
    this.srch = [...this.newsArr];

  }

  ngOnInit() {
    var url= document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    console.log(this.id)
    this.getNews();
    // this.showImage();      
    tinymce.remove();
    var demoBaseConfig = {
      selector: '#newsdesc',
      height: 350,
      resize: false,
      autosave_ask_before_unload: false,
      forced_root_block : false,
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
  open(news){
    this.editNews = {
      _id: news._id,
      title: news.title,
      date: news.date,
      time: news.time,
      receiver: news.receiver,
      thumbnail: news.thumbnail,
      description: news.description,
      caption: news.caption
  }
}
public ogthumb;
  getNews() {    
    this.http.get('http://165.22.50.213:3000/getonenewsandimage/'+this.id).subscribe(res => {
      this.newsArr = res['data'];
      console.log(this.newsArr);
      for(var i =0; i<this.newsArr.length; i++){
        if(this.newsArr[i]._id == this.id){
          this.editNews = {
            _id: this.id,
            title: this.newsArr[i].title,
            date: this.newsArr[i].date,
            time: this.newsArr[i].time,
            receiver: this.newsArr[i].receiver,
            thumbnail:this.newsArr[i].thumbnail,
            description: this.newsArr[i].description,
            caption: this.newsArr[i].caption
            
        }
        $('#newimg').hide();
        this.image = new Buffer(this.newsArr[0].thumbnail.data).toString('base64');
        this.imagetype = this.newsArr[0].thumbnail.contentType;
        this.images = this.newsArr[i].thumbnail;
        this.ogthumb = this.newsArr[i].thumbnail;
        tinymce.get("newsdesc").setContent(this.editNews.description);
        }
      }      
    });
}
imagesArr =[];
public image;
public imagetype;
// showImage(){

//   this.http.get('http://165.22.50.213:3000/getoneimage/'+this.id).subscribe(res => {
//     this.imagesArr = res['data'];
//     this.image = new Buffer(this.imagesArr[0].img.data).toString('base64');
//     this.imagetype = this.imagesArr[0].img.contentType;
// });

// console.log(999)

// }

url;
public images;
onselectFile(event:any){
  if(event.target.files){
    // const file = event?.target.files[0];
    // this.images=file;
    if(event.target.files.length != 0){
    var maxFileSize = 1024 * 1024; //1MB

    const file = event.target.files[0];
    if(file.size > maxFileSize){
      this.images = this.editNews.thumbnail;
      alert('Image too large. Maximum file size is 1MB');
      this.editNews.thumbnail = this.ogthumb;
      console.log(this.ogthumb)
      console.log(this.editNews.thumbnail)
    }
    else{
      this.images=file;
      $('#newimg').show();
      $('#ogimg').hide();
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      this.ogthumb =this.editNews.thumbnail;
    }
  }

    }
  }

}
  uploadNews(news){
    news.description = tinymce.get("newsdesc").getContent();
    this.editNews.description = tinymce.get("newsdesc").getContent();
    this.errorcount = 0;
    this.validErr = this.validation();
    if(this.errorcount ===0){
      console.log(news);
      // this.http.post('http://165.22.50.213:3000/editnews', news).subscribe(res =>{
      //   console.log(res);
      //   this.message = res;
        this.addimage();
        // window.location.reload()
      // });
      // window.location.href = "/newsManagement";
    }

  }
validation(){
  if(this.editNews.title === ''){
    this.validErr['title'] = "*Title is required!";
    this.errorcount++;
  }
  else{
    this.validErr['title'] = ""
  }

  if(this.editNews.date === ''){
    this.validErr['date'] = "*Publish Date is required!";
    this.errorcount++;
  }
  // else if(this.editNews.date < this.todayDate){
  //   this.validErr['date'] = "*Inavlid Publish Date!";
  //   this.errorcount++;
  // }
  else{
    this.validErr['date'] = ""
  }

  if(this.editNews.time === ''){
    this.validErr['time'] = "*Publish Time is required!";
    this.errorcount++;
  }
  else{
    this.validErr['time'] = ""
  }

  if(this.editNews.receiver === ''){
    this.validErr['receiver'] = "*Receiver is required!";
    this.errorcount++;
  }
  else{
    this.validErr['receiver'] = ""
  }

  // if(this.editNews.thumbnail.length === 0){
  //   this.validErr['thumbnail'] = "*Please choose a thumbnail!";
  //   this.errorcount++;
  // }
  // else{
  //   this.validErr['thumbnail'] = ""
  // }

  if(this.editNews.description === ''){
    this.validErr['description'] = "*Description is required!";
    this.errorcount++;
  }
  else{
    this.validErr['caption'] = ""
  }
  if(this.editNews.caption === ''){
    this.validErr['caption'] = "*Caption is required!";
    this.errorcount++;
  }
  else{
    this.validErr['caption'] = ""
  }


  return this.validErr;
}


addimage(){

    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('title', this.editNews.title)
    formData.append('date', this.editNews.date)
    formData.append('time', this.editNews.time)
    formData.append('receiver', this.editNews.receiver)
    formData.append('description', this.editNews.description)
    formData.append('caption', this.editNews.caption)
    formData.append('id', this.editNews._id)
    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editnewsandimage', formData).subscribe(res =>{
      console.log(res);
      this.message = res;
      //  window.location.reload()
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/newsManagement'])
        // this.router.navigate(['/adminUser'])

  });
  // window.location.href = "/newsManagement";
  this.router.navigate(['/newsManagement'])
}

goBack() {
  window.history.back();
}
}
