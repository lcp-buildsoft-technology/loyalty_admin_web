import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import tinymce from 'tinymce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editmcFAQ',
  templateUrl: './editmcFAQ.component.html',
  styleUrls: ['./editmcFAQ.component.scss']
})
export class EditmcFAQComponent implements OnInit {
  message: any;
  new: Object;
  faqs = [];
  public srch = [];
  public id;
  valid = [];
  error: number = 0;
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    var url= document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
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

    this.getFAQ();
  }

  public editFaq = {
    id: '',
    question: '',
    answer: '',
  };

  openEdit(edit, faq) {
    this.editFaq = {
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
    }
  }

  getFAQ() {
    this.http.get('http://165.22.50.213:3000/getonemcfaq/'+this.id).subscribe(res => {
      this.faqs = res['data'];
      console.log(this.faqs);
      for (var i = 0; i < this.faqs.length; i++) {
        if (this.faqs[i]._id == this.id) {
          this.editFaq = {
            id: this.faqs[i]._id,
            question: this.faqs[i].question,
            answer: this.faqs[i].answer,
          }
          tinymce.get("mymce1").setContent(this.editFaq.answer);
        }
      }
    });
  }

  updateFAQ() {
    this.error = 0;
    this.validation();
    this.editFaq.answer = tinymce.get("mymce1").getContent();
    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editmcfaq', this.editFaq).subscribe(res => {
        console.log(res);
        this.message = res;
        // window.location.reload()
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsFAQ'])


      });
      // window.location.href = "/gsFAQ";
      this.router.navigate(['/gsFAQ'])

    }
  }

  goBack() {
    window.history.back();
  }

  validation() {
    if (this.editFaq.question === '') {
      this.valid['question'] = "*Question is required!";
      this.error++;
    }
    else {
      this.valid['question'] = ""
    }

    if (this.editFaq.answer === '') {
      this.valid['answer'] = "*Answer is required!";
      this.error++;
    }
    else {
      this.valid['answer'] = ""
    }

  }
}
