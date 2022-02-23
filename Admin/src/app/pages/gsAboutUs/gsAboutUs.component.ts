import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-gsAboutUs',
  templateUrl: './gsAboutUs.component.html',
  styleUrls: ['./gsAboutUs.component.scss']
})
export class GsAboutUsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;
  images: any;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private form: FormBuilder, private sessionSt: SessionStorageService) {
    this.srch = [...this.contactinfo];
  }

  contactinfo = [];
  aboutus = [];
  public srch = [];
  valid = [];
  error: number = 0;
  erroraboutus: number = 0;

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getContactInfo();
    this.getAboutUs();

    $("form").attr('autocomplete', 'off');

    tinymce.remove();
    var demoBaseConfig = {
      selector: '#aboutusdesc',
      width: 755,
      height: 300,
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
  }




  imagesArr = [];
  public image;
  public imagetype;
  public ogthumb;
  url = ('../../../assets/img/blankimg.PNG');
  onselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
        var maxFileSize = 1024 * 1024; //1MB

        const file = event.target.files[0];
        if (file.size > maxFileSize) {
          alert('Image too large. Maximum file size is 1MB');
          this.editaboutus.picture = this.ogthumb;
        }
        else {
          
          $('#newimg').show();
          $('#ogimg').hide();
          this.images = file;
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event: any) => {
            this.url = event.target.result;
            this.ogthumb = this.editaboutus.picture;
          }
        }
      }
    }
  }
  addimage() {
    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('description', this.editaboutus.description)
    formData.append('id', this.editaboutus._id)
    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editaboutandimage', formData).subscribe(res => {
      this.message = res;
      // window.location.reload()
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/gsAboutUs'])
    });
  }
  getAboutUs() {
    this.http.get('http://165.22.50.213:3000/getaboutandimage').subscribe(res => {
      this.aboutus = res['data'];
      if (this.aboutus.length === 0) {
        $('#ogimg').hide();
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");
      }
      else{
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");
      }
      this.editaboutus = {
        _id: this.aboutus[0]._id,
        picture: this.aboutus[0].picture,
        description: this.aboutus[0].description
      };
      $('#newimg').hide();
      this.image = new Buffer(this.aboutus[0].picture.data).toString('base64');
      this.imagetype = this.aboutus[0].picture.contentType;
      this.images = this.aboutus[0].picture;
      this.ogthumb = this.aboutus[0].picture;
      tinymce.get("aboutusdesc").setContent(this.editaboutus.description);
    });
  }

  updateAboutUs(aboutus) {
    this.erroraboutus = 0;
    aboutus.description = tinymce.get("aboutusdesc").getContent();
    this.validationaboutus();
    if (this.erroraboutus == 0) {
      this.addimage();
    }
  }


  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  open(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  addEdit(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content, contactInfo) {
    this.editcontactinfo = {
      id: contactInfo._id,
      label: contactInfo.label,
      content: contactInfo.content,
    }
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openDelete(content, contactInfo) {
    this.editcontactinfo = {
      id: contactInfo._id,
      label: contactInfo.label,
      content: contactInfo.content,
    }
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  //-------------------------------------//

  public editaboutus = {
    _id: '',
    picture: [],
    description: ''
  };

  public addContactInfo = {
    label: '',
    content: ''
  };

  public editcontactinfo = {
    id: '',
    label: '',
    content: ''
  };

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  sendContactInfo() {
    this.error = 0;
    this.validation()
    if (this.error === 0) {
      this.newContactInfo(this.addContactInfo);
    }
  }

  newContactInfo(addContactInfo) {
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])

    this.http.post('http://165.22.50.213:3000/addcontactinfo', addContactInfo).subscribe(res => {
      this.message = res;
    });
  }

  getContactInfo() {
    this.http.get('http://165.22.50.213:3000/getcontactinfo').subscribe(res => {
      this.contactinfo = res['data'];
      this.dtTrigger.next(void 0);
    });
  }

  updateInfo(contactinfo) {
    this.error = 0;
    this.validationeditinfo();
    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editcontactinfo', contactinfo).subscribe(res => {
        this.message = res;
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])

    }
  }

  deleteInfo(contactinfo) {
    this.http.post('http://165.22.50.213:3000/deletecontactinfo', contactinfo).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])
  }

  goBack() {
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])
  }

  validationaboutus() {
    if (this.images === undefined) {
      this.valid['picture'] = "*Picture is required!";
      this.erroraboutus++;
    }
    else {
      this.valid['picture'] = ""
    }

    if (this.editaboutus.description === '') {
      this.valid['description'] = "*Description is required!";
      this.erroraboutus++;
    }
    else {
      this.valid['description'] = ""
    }
  }
  validation() {
    if (this.addContactInfo.label === '') {
      this.valid['label'] = "*Label is required!";
      this.error++;
    }
    else {
      this.valid['label'] = ""
    }

    if (this.addContactInfo.content === '') {
      this.valid['content'] = "*Content is required!";
      this.error++;
    }
    else {
      this.valid['content'] = ""
    }
  }
  validationeditinfo() {
    if (this.editcontactinfo.label === '') {
      this.valid['label'] = "*Label is required!";
      this.error++;
    }
    else {
      this.valid['label'] = ""
    }

    if (this.editcontactinfo.content === '') {
      this.valid['content'] = "*Content is required!";
      this.error++;
    }
    else {
      this.valid['content'] = ""
    }

  }

  public adminid;
  public adminrole;
  public thisedit = false;
  public thisdelete = false;
  public thisadd = false;
  public thisview = false;
  public thisexport = false;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].generalsetting;
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewclass']").show();
        this.thisview = true;
      }
      if (x[1] == '1') {//edit
        $("[name='editclass']").show();
        this.thisedit = true;
      }
      if (x[2] == '1') {//add
        $("[name='addclass']").show();
        this.thisadd = true;
      }
      if (x[3] == '1') {//delete
        $("[name='deletclass']").show();
        this.thisdelete = true;
      }
      if (x[4] == '1') {//export
        $("[name='exportclass']").show();
        this.thisexport = true;
      }

    });

  }

}
