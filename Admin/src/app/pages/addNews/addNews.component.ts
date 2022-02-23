// import { Component, OnInit } from '@angular/core';
// import { EditorModule } from '@tinymce/tinymce-angular';
// import { BrowserModule } from '@angular/platform-browser';
// import tinymce from 'tinymce';
// import { HttpClient } from '@angular/common/http';
// import * as $ from 'jquery';
// import { Buffer } from 'buffer';
// import { FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-addNews',
//   templateUrl: './addNews.component.html',
//   styleUrls: ['./addNews.component.css']
// })


// export class AddNewsComponent implements OnInit {
//   message: any;
//   constructor(private http: HttpClient, private form: FormBuilder){

//   }
//   public news = {
//     title: '',
//     date: '',
//     time: '',
//     receiver: '',
//     thumbnail: '',
//     description: '',
//     caption: ''
//   }
//   validErr = [];
//   errorcount: number = 0;
//   ngOnInit() {
//     // this.getLastNews();
//     // tinymce.init(
//     //   {
//     //       selector: "#mymce1",
          
//     //   });
//     //   tinymce.get("mymce1").execCommand('mceInsertContent', false, '<h1>My Custom Content</h1>');//This will add custom content
//     tinymce.remove();
//     var demoBaseConfig = {
//       selector: '#mymce1',
//       height: 350,
//       resize: false,
//       autosave_ask_before_unload: false,
//       plugins: [
//         ' advlist anchor autolink codesample fullscreen help image tinydrive',
//         ' lists link media noneditable preview',
//         ' searchreplace table template visualblocks wordcount'
//       ],
      
//       toolbar:
//         'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
//       spellchecker_dialog: true,
//       spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
//       tinydrive_demo_files_url: '/docs/demo/tiny-drive-demo/demo_files.json',
//       tinydrive_token_provider: function (success, failure) {
//         success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
//       },
//       content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//     };
    
//     tinymce.init(demoBaseConfig);
//     $("form").attr('autocomplete', 'off');
//   }

//   sendNews(){
//     this.errorcount=0;
//     this.news.description = tinymce.get("mymce1").getContent();
//     console.log(this.news);
//     this.validErr = this.validation()
//     if(this.errorcount === 0){
//       this.addNews(this.news);
//     }
  
//   }

//   imagesArr =[];
//   public image;
//   public images;
//   public imagetype;
//   url=('../../../assets/img/blankimg.PNG');

//   public mime;
//   public bindata;
//   onselectFile(event:any){
//     if(event.target.files){
//       // const file = event?.target.files[0];
//       // this.images=file;
//       var maxFileSize = 1024 * 1024; //1MB


//       const file = event.target.files[0];
//       this.images=file;
//       if(this.images.size > maxFileSize){
//         alert('Image too large. Maximum file size is 1MB');
//         this.news.thumbnail = '';
//         this.url = ('../../../assets/img/blankimg.PNG');
//       }
//       else{
//         var reader = new FileReader()
//         reader.readAsDataURL(event.target.files[0]);
//         reader.onload=(event:any)=>{
//            this.url=event.target.result;
//       }
//         //  var wed = this.url.split(",");
//         //  this.mime = wed[0];
//         //  this.bindata = new Buffer(this.url.split(",")[1],"base64");
//         //  console.log( this.bindata)
//         //  console.log( this.mime)
//         // console.log(this.images);
//         // this.addimage();
//         //  var profilePicture = new Buffer(this.url, 'base64').toString('ascii')
//         // console.log(profilePicture);
//       }
//     }

//   }
//   showImage(){
//     console.log(9999)
//     this.http.get('http://165.22.50.213:3000/getimage').subscribe(res => {
//       this.imagesArr = res['data'][0].img.data;

//      this.image = new Buffer(res['data'][0].img.data).toString('base64');
//       // this.image = res['data'][0].img.data.data;
//       // this.image = this.domSanitizer.bypassSecurityTrustUrl(res['data'][0].img.data.data.toString('base64'));
//       // this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(res['data'][0].img.data.data.toString('base64'));
//       this.imagetype = res['data'][0].img.contentType;
//       // console.log(res['data'][0].img.data.data);
//       // console.log(res['data'][0].img.contentType);
//       console.log(this.imagetype);
//       // console.log(this.imagetype);
//   });
//   console.log(9999)
//   }


// addimage(){
//   // // console.log(this.url)
//   // // this.uploadimage.img =  new Buffer(this.url, 'base64').toString('ascii');
//   //  this.uploadimage.img.contentType = this.images.type;
//   //  this.uploadimage.img.data = this.images;
//   // this.uploadimage.id = this.lastnewsid;
//   // console.log(this.uploadimage)
//   // // console.log(this.uploadimage)
//   // // console.log(Buffer.from(this.url).toString('base64'));
//   const formData = new FormData();

//   formData.append('file', this.images)
//   formData.append('id', this.lastnewsid)

//   formData.forEach(file => console.log("File: ", file));
//   this.http.post('http://165.22.50.213:3000/upimage', formData).subscribe(res =>{
//     console.log(res);
//     this.message = res;
// });
// }


//   addNews(news){
//     console.log(this.news);
//     console.log("this=",news)

//     this.http.post('http://165.22.50.213:3000/addnews', news).subscribe(res =>{
//       console.log(res);
//       this.message = res;
//       this.getLastNews();
//   });
//   setTimeout(() => {
//     window.location.href = "/newsManagement";
//   }, 1200);
//   }
  
//   public lastnewsid;
//   public testarr;
//   arr = [];
//   padLeadingZeros(num, size) {
//     var s = num+"";
//     while (s.length < size) s = "0" + s;
//     return s;
// }

//   getLastNews(){
//       this.http.get('http://165.22.50.213:3000/getlastnews').subscribe(res => {
//         this.lastnewsid = res['data'][0]._id;
//         console.log(this.lastnewsid);
//         this.addimage()
//       });

//   }
//   goBack() {
//     window.history.back();
//   }
//   validation(){
//     if(this.news.title === ''){
//       this.validErr['title'] = "*Please enter the title!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['title'] = ""
//     }

//     if(this.news.date === ''){
//       this.validErr['date'] = "*Please choose a date!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['date'] = ""
//     }

//     if(this.news.time === ''){
//       this.validErr['time'] = "*Please choose a time!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['time'] = ""
//     }

//     if(this.news.receiver === ''){
//       this.validErr['receiver'] = "*Please select the receiver!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['receiver'] = ""
//     }

//     if(this.news.thumbnail === ''){
//       this.validErr['thumbnail'] = "*Please choose a thumbnail!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['thumbnail'] = ""
//     }

//     if(this.news.description === ''){
//       this.validErr['description'] = "*Please enter the description!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['description'] = ""
//     }
//     if(this.news.caption === ''){
//       this.validErr['caption'] = "*Please enter the caption!";
//       this.errorcount++;
//     }
//     else{
//       this.validErr['caption'] = ""
//     }


//     return this.validErr;
//   }
// }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  selector: 'app-addNews',
  templateUrl: './addNews.component.html',
  styleUrls: ['./addNews.component.css']
})


export class AddNewsComponent implements OnInit {
  message: any;
  todayDate = "";

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router){

  }
  public news = {
    title: '',
    date: '',
    time: '',
    receiver: '',
    thumbnail: '',
    description: '',
    caption: ''
  }
  validErr = [];
  errorcount: number = 0;
  ngOnInit() {
    // this.getLastNews();
    // tinymce.init(
    //   {
    //       selector: "#mymce1",
          
    //   });
    //   tinymce.get("mymce1").execCommand('mceInsertContent', false, '<h1>My Custom Content</h1>');//This will add custom content
    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce1',
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

  sendNews(){
    this.errorcount=0;
    this.news.description = tinymce.get("mymce1").getContent();
    console.log(this.news);
    this.validErr = this.validation()
    if(this.errorcount === 0){
      this.addimage();
      // this.addNews(this.news);
    }
  
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
        if(event.target.files.length != 0){
        // const file = event?.target.files[0];
        // this.images=file;
        var maxFileSize = 1024 * 1024; //1MB


        const file = event.target.files[0];
        
          if(file > maxFileSize){
            alert('Image too large. Maximum file size is 1MB');
            this.news.thumbnail = '';
            this.url = ('../../../assets/img/blankimg.PNG');
          }
          else{
            this.news.thumbnail = 'a'
            this.images=file;
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0]);
            reader.onload=(event:any)=>{
              this.url=event.target.result;
          }
      }
        //  var wed = this.url.split(",");
        //  this.mime = wed[0];
        //  this.bindata = new Buffer(this.url.split(",")[1],"base64");
        //  console.log( this.bindata)
        //  console.log( this.mime)
        // console.log(this.images);
        // this.addimage();
        //  var profilePicture = new Buffer(this.url, 'base64').toString('ascii')
        // console.log(profilePicture);
    }
  }

}
  showImage(){
    console.log(9999)
    this.http.get('http://165.22.50.213:3000/getimage').subscribe(res => {
      this.imagesArr = res['data'][0].img.data;

     this.image = new Buffer(res['data'][0].img.data).toString('base64');
      // this.image = res['data'][0].img.data.data;
      // this.image = this.domSanitizer.bypassSecurityTrustUrl(res['data'][0].img.data.data.toString('base64'));
      // this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(res['data'][0].img.data.data.toString('base64'));
      this.imagetype = res['data'][0].img.contentType;
      // console.log(res['data'][0].img.data.data);
      // console.log(res['data'][0].img.contentType);
      console.log(this.imagetype);
      // console.log(this.imagetype);
  });
  console.log(9999)
  }


addimage(){
  // // console.log(this.url)
  // // this.uploadimage.img =  new Buffer(this.url, 'base64').toString('ascii');
  //  this.uploadimage.img.contentType = this.images.type;
  //  this.uploadimage.img.data = this.images;
  // this.uploadimage.id = this.lastnewsid;
  // console.log(this.uploadimage)
  // // console.log(this.uploadimage)
  // // console.log(Buffer.from(this.url).toString('base64'));
  const formData = new FormData();

  formData.append('file', this.images)
  formData.append('title', this.news.title)
  formData.append('date', this.news.date)
  formData.append('time', this.news.time)
  formData.append('receiver', this.news.receiver)
  formData.append('description', this.news.description)
  formData.append('caption', this.news.caption)

  // formData.forEach(file => console.log("File: ", file));
  this.http.post('http://165.22.50.213:3000/upnewsandimage', formData).subscribe(res =>{
    console.log(res);
    this.message = res;
    // window.location.href = "/newsManagement";
    this.router.navigate(['/newsManagement'])
});
}


  addNews(news){
    console.log(this.news);
    console.log("this=",news)

    this.http.post('http://165.22.50.213:3000/addnews', news).subscribe(res =>{
      console.log(res);
      this.message = res;
      this.getLastNews();
  });
  setTimeout(() => {
    // window.location.href = "/newsManagement";
    this.router.navigate(['/newsManagement'])
  }, 1200);
  }
  
  public lastnewsid;
  public testarr;
  arr = [];
  padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

  getLastNews(){
      this.http.get('http://165.22.50.213:3000/getlastnews').subscribe(res => {
        this.lastnewsid = res['data'][0]._id;
        console.log(this.lastnewsid);
        this.addimage()
      });

  }
  goBack() {
    window.history.back();
  }
  validation(){
    if(this.news.title === ''){
      this.validErr['title'] = "*Title is required!";
      this.errorcount++;
    }
    else{
      this.validErr['title'] = ""
    }

    if(this.news.date === ''){
      this.validErr['date'] = "*Publish date is required!";
      this.errorcount++;
    }
    else if(this.news.date < this.todayDate){
      this.validErr['date'] = "*Inavlid Publish Date!";
      this.errorcount++;
    }
    else{
      this.validErr['date'] = ""
    }

    if(this.news.time === ''){
      this.validErr['time'] = "*Publish time is required!";
      this.errorcount++;
    }
    else{
      this.validErr['time'] = ""
    }

    if(this.news.receiver === ''){
      this.validErr['receiver'] = "*Receiver is required!";
      this.errorcount++;
    }
    else{
      this.validErr['receiver'] = ""
    }

    if(this.news.thumbnail === ''){
      this.validErr['thumbnail'] = "*Thumbnail is required!";
      this.errorcount++;
    }
    else{
      this.validErr['thumbnail'] = ""
    }

    if(this.news.description === ''){
      this.validErr['description'] = "*Description is required!";
      this.errorcount++;
    }
    else{
      this.validErr['description'] = ""
    }
    if(this.news.caption === ''){
      this.validErr['caption'] = "*Caption is required!";
      this.errorcount++;
    }
    else{
      this.validErr['caption'] = ""
    }


    return this.validErr;
  }
}


