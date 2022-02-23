import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-gamification',
  templateUrl: './gamification.component.html',
  styleUrls: ['./gamification.component.scss']
})
export class GamificationComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  message: any;
  gameArr = [];
  new: Object;
  public srch = [];
  valid = [];
  element = [];
  error: number = 0;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private sessionSt: SessionStorageService) {
    this.srch = [...this.gameArr];
  }

  public editGame = {
    _id: '',
    name: '',
    status: '',
    sdate: '',
    edate: '',
    playtimes: ''
  };

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    $("form").attr('autocomplete', 'off');

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getGame();
    $(document).ready(function () {
      $('#addgame').hide();
    });


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

  open(con, game) {
    this.editGame = {
      _id: game._id,
      name: game.name,
      status: game.status,
      playtimes: game.playtimes,
      sdate: game.sdate,
      edate: game.edate
    }
    this.modalService.open(con, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  getGame() {
    this.http.get('http://165.22.50.213:3000/getGame').subscribe(res => {
      this.gameArr = res['data'];
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  uploadGame(game) {
    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editGame', game).subscribe(res => {
        this.message = res;
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gamification'])

    }
  }

  validation() {
    if (this.editGame.name === '') {
      this.valid['name'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    if (this.editGame.playtimes === '') {
      this.valid['playtimes'] = "*Play times per user per day is required!";
      this.error++;
    }
    else if (this.editGame.playtimes === '0') {
      this.valid['playtimes'] = "*Play times per user per day is required!";
      this.error++;
    }
    else if (this.editGame.playtimes <= '0') {
      this.valid['playtimes'] = "*Invalid play times per user per day!";
      this.error++;
    }
    else {
      this.valid['playtimes'] = ""
    }


    if (this.editGame.sdate === '') {
      this.valid['sdate'] = "*Start date is required!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    if (this.editGame.edate === '') {
      this.valid['edate'] = "*End date is required!";
      this.error++;
    }
    else if (this.editGame.edate <= this.editGame.sdate) {
      this.valid['edate'] = "*Invalid End Date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    if (this.editGame.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    return this.valid;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('gametable');
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
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'gamificationList.xlsx');

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
      this.adminrole = res['data'][0].gamification;
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
