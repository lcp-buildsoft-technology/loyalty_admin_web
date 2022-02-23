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
import * as XLSX from 'xlsx';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-newsManagement',
  templateUrl: './newsManagement.component.html',
  styleUrls: ['./newsManagement.component.css']
})

export class NewsManagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  message: any;
  newsArr = [];
  imagesArr = []
  new: Object;
  image: any;
  imagetype: any;
  search: any;

  public ser = [];
  public srch = [];
  data: any;
  constructor(private modalService: NgbModal,private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer, private form: FormBuilder, private sessionSt: SessionStorageService) {
    this.srch = [...this.newsArr];
    this.ser = [...this.imagesArr];
    //get request from web api
  }
  public editNews = {
    _id: '',
    title: '',
    date: '',
    time: '',
    receiver: '',
    thumbnail: '',
    description: '',
    caption: ''
  }

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    // this.showImage();      

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };

    this.getNews();
    tinymce.remove();
    var demoBaseConfig = {
      selector: '#mymce3',
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

    // tinymce.activeEditor.execCommand('#description');
    // var table = $('#newstable').DataTable();
    // table.search(this.search);
    // table.draw();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  opnimage(content, news) {
    this.imagesArr[0] = news;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  open(content, news) {
    // window.location.href = "/editNews?id=" + news._id;
    const ednurl = "/editNews?id=" + news._id;
    console.log(ednurl)
    this.router.navigateByUrl(ednurl)
    $('#dropdown_news [value=' + news.receiver + ']').attr('selected', 'true');
  }

  openEdit(content, news) {
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
    this.imagesArr[0] = news;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;
    $('#dropdown_news [value=' + news.receiver + ']').attr('selected', 'true');
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public news = {
    _id: '',
    title: '',
    date: '',
    time: '',
    receiver: '',
    thumbnail: [],
    description: '',
    caption: ''
  };

  getNews() {
    this.http.get('http://165.22.50.213:3000/getnewsandimage').subscribe(res => {
      this.newsArr = res['data'];
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  image1arr = [];
  imagetypearr = [];

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('newstable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    ws['!cols'][0] = { hidden: true };
    ws['!cols'][2] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'NewsList.xlsx');
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
      this.adminrole = res['data'][0].news;
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