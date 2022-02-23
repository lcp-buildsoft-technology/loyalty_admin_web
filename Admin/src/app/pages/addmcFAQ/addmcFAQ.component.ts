import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import tinymce from 'tinymce';
import { Router } from '@angular/router';
declare var angular: any;

@Component({
  selector: 'app-addmcFAQ',
  templateUrl: './addmcFAQ.component.html',
  styleUrls: ['./addmcFAQ.component.scss']
})
export class AddmcFAQComponent implements OnInit {


  message: any;
  mcfaqs = [];
  public srch = [];
  valid = [];
  error: number = 0;

  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router) {
    this.srch = [...this.mcfaqs];
  }

  ngOnInit() {
    var mcfaq = document.getElementsByClassName("faq-page");
    var i;
    for (i = 0; i < mcfaq.length; i++) {
      mcfaq[i].addEventListener("click", function () {
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

    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce1, #mymce2, #mymce3, #mymce4, #mymce5',
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

    this.getmcFAQ();
  }

  public mcfaq = {
    question: '',
    answer: '',
  };

  sendmcFAQ() {
    this.error = 0;
    this.mcfaq.answer = tinymce.get("mymce1").getContent();
    console.log(this.mcfaq);
    this.validation()
    if(this.error === 0){
    this.newmcFAQ(this.mcfaq);
    }
  }

  newmcFAQ(mcfaq) {
    console.log(mcfaq);
    this.http.post('http://165.22.50.213:3000/addmcfaq', mcfaq).subscribe(res => {
      console.log(res);
      this.message = res;
          // window.location.href = "/gsFAQ";
          this.router.navigate(['/gsFAQ'])
    });
    // window.location.href = "/gsFAQ";

  }

  getmcFAQ() {
    this.http.get('http://165.22.50.213:3000/getmcfaq').subscribe(res => {
      console.log(res);
      console.log(this.mcfaq);
      this.mcfaqs = res['data'];
      var app = angular
        .module("faqModule", [])
        .controller("myController", function ($scope) {
        });
    });
  }

  goBack() {
    window.history.back();
  }

  validation() {
    if (this.mcfaq.question === '') {
      this.valid['question'] = "*Question is required!";
      this.error++;
    }
    else {
      this.valid['question'] = ""
    }

    if (this.mcfaq.answer === '') {
      this.valid['answer'] = "*Answer is required!";
      this.error++;
    }
    else {
      this.valid['answer'] = ""
    }
  }
}
