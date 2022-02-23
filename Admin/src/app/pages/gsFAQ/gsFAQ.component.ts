import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import tinymce from 'tinymce';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
declare var angular: any;

@Component({
  selector: 'app-gsFAQ',
  templateUrl: './gsFAQ.component.html',
  styleUrls: ['./gsFAQ.component.scss']
})
export class GsFAQComponent implements OnInit {

  message: any;
  faqs = [];
  public srch = [];
  mcfaqs = [];
  public sch = [];

  constructor(private modalService: NgbModal, private router:Router, 
    private http: HttpClient, private sessionSt: SessionStorageService) {
    this.srch = [...this.faqs];
    this.sch = [...this.mcfaqs];
  }

  public editFaq = {
    id: '',
    question: '',
    answer: '',
  };

  public editmcFaq = {
    id: '',
    question: '',
    answer: '',
  };


  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    this.getmcFAQ();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    $("form").attr('autocomplete', 'off');
    this.getFAQ();
    setTimeout(function () {
      var faq = document.getElementsByClassName("faq-page");
      var i;
      for (i = 0; i < faq.length; i++) {
        faq[i].addEventListener("click", function () {
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
          this.classList.toggle("active");
          /* Toggle between hiding and showing the active panel */
          var body = this.nextElementSibling;
          if (body.style.display === "block") {
            body.style.display = "none";
          } else {
            body.style.display = "block";
          }
        });
      }
    }, 500);
    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce1, #mymce2, #mymce3, #mymce4, #mymce5',
      height: 700,
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
  showbody() {

    var faq = document.getElementsByClassName("faq-page");
    var i;
    for (i = 0; i < faq.length; i++) {
      faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var body = this.nextElementSibling;
        if (body.style.display === "block") {
          body.style.display = "none";
        } else {
          body.style.display = "block";
        }
      });
    }

  }

  public sessionid;

  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  //-------Member FAQ--------------------------------

  open(faq) {
    // window.location.href = "/editFAQ?id=" + faq._id;
    const edfaqurl = "/editFAQ?id=" + faq._id;
    console.log(edfaqurl)
    this.router.navigateByUrl(edfaqurl)

  }

  openEdit(content, faq) {
    this.editFaq = {
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openDelete(edit, faq) {
    this.editFaq = {
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
    }
    this.modalService.open(edit, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  newFAQ(faq) {
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/addFAQ'])

    this.http.post('http://165.22.50.213:3000/addfaq', faq).subscribe(res => {
      this.message = res;
    });
  }

  getFAQ() {
    this.http.get('http://165.22.50.213:3000/getfaq').subscribe(res => {
      this.faqs = res['data'];
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  updateFAQ(faq) {
    this.http.post('http://165.22.50.213:3000/editfaq', faq).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsFAQ'])
  }

  deleteFAQ(faq) {
    this.http.post('http://165.22.50.213:3000/deletefaq', faq).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsFAQ'])
  }

  //-------Merchant FAQ--------------------------------

  openm(mcfaq) {
    // window.location.href = "/editmcFAQ?id=" + mcfaq._id;
    const mcfaqurl = "/editmcFAQ?id=" + mcfaq._id;
    console.log(mcfaqurl)
    this.router.navigateByUrl(mcfaqurl)
  }

  openmEdit(editm, mcfaq) {
    this.editmcFaq = {
      id: mcfaq._id,
      question: mcfaq.question,
      answer: mcfaq.answer,
    }
    this.modalService.open(editm, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openmDelete(editm, mcfaq) {
    this.editmcFaq = {
      id: mcfaq._id,
      question: mcfaq.question,
      answer: mcfaq.answer,
    }
    this.modalService.open(editm, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  newmcFAQ(mcfaq) {
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/addmcFAQ'])

    this.http.post('http://165.22.50.213:3000/addmcfaq', mcfaq).subscribe(res => {
      this.message = res;
    });
  }

  getmcFAQ() {
    this.http.get('http://165.22.50.213:3000/getmcfaq').subscribe(res => {
      this.mcfaqs = res['data'];
    });
  }

  editmcFAQ(mcfaq) {
    this.http.post('http://165.22.50.213:3000/editmcfaq', mcfaq).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsFAQ'])

  }
  
  deletemcFAQ(mcfaq) {
    this.http.post('http://165.22.50.213:3000/deletemcfaq', mcfaq).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsFAQ'])

  }

  goBack() {
    window.history.back();
  }
  public adminid = "61972adb0d61d64770a23882";
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