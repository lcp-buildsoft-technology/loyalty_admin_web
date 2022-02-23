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
import * as e from 'cors';
import { CookieService  } from 'ngx-cookie';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.scss']
})
export class UserroleComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router,
    private modalService: NgbModal, private cookieService: CookieService, private sessionSt: SessionStorageService) {
    this.srch = [...this.permissions];
  }

  message: any;
  perm: Object;
  permissions = [];
  public srch = [];
  error: number = 0;
  valid = [];

  ngOnInit() {
    this.getSession();
    this.getAllRole();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    // this.getPermission();


    // var i = 1;
    // var b = '#' + i + 'v'
    // $(document).ready(function () {
    //   $(b).click(function () {
    //     if ($(b).is(':checked')) {
    //       $(b).hide();
    //     }
    //   });
    // });

  }
  perarr = [];
  role(addeditrole) {
    for (let i = 1; i < 13; i++) {
      var a = '#' + i + 'v';
      var b = '#' + i + 'a';
      var c = '#' + i + 'e';
      var d = '#' + i + 'd';
      var e = '#' + i + 'ex';

      this.perarr[i] = '';
      if ($(a).is(':checked')) {
        this.perarr[i] = '1-';
      }
      else {
        this.perarr[i] += '0-'
      }
      if ($(b).is(':checked')) {
        this.perarr[i] += '1-'
      }
      else {
        this.perarr[i] += '0-'
      }
      if ($(c).is(':checked')) {
        this.perarr[i] += '1-'
      }
      else {
        this.perarr[i] += '0-'
      }
      if ($(d).is(':checked')) {
        this.perarr[i] += '1-'
      }
      else {
        this.perarr[i] += '0-'
      }
      if ($(e).is(':checked')) {
        this.perarr[i] += '1'
      }
      else {
        this.perarr[i] += '0'
      }
    }
    for (let i = 1; i < 13; i++) {
      switch (i) {
        case 1:
          this.editpermission.dashboard = this.perarr[i];
          break;
        case 2:
          this.editpermission.merch = this.perarr[i];
          break;
        case 3:
          this.editpermission.news = this.perarr[i];
          break;
        case 4:
          this.editpermission.ads = this.perarr[i];
          break;
        case 5:
          this.editpermission.rewards = this.perarr[i];
          break;
        case 6:
          this.editpermission.gamification = this.perarr[i];
          break;
        case 7:
          this.editpermission.redemption = this.perarr[i];
          break;
        case 8:
          this.editpermission.bookinglist = this.perarr[i];
          break;
        case 9:
          this.editpermission.user = this.perarr[i];
          break;
        case 10:
          this.editpermission.reporting = this.perarr[i];
          break;
        case 11:
          this.editpermission.memberacc = this.perarr[i];
          break;
        case 12:
          this.editpermission.generalsetting = this.perarr[i];
          break;
        default:
          this.editpermission.generalsetting = this.perarr[i];
          break;
      }

    }
    if (addeditrole == 'saverole') {
      this.editPermission(this.editpermission);
    }
  }
  //for create new
  public permission = {
    dashboard: '',
    merch: '',
    news: '',
    ads: '',
    rewards: '',
    gamification: '',
    redemption: '',
    bookinglist: '',
    user: '',
    reporting: '',
    memberacc: '',
    generalsetting: '',
    roleid: ''
  }

  public editpermission = {
    id: '',
    dashboard: '',
    merch: '',
    news: '',
    ads: '',
    rewards: '',
    gamification: '',
    redemption: '',
    bookinglist: '',
    user: '',
    reporting: '',
    memberacc: '',
    generalsetting: '',
  }

  public newrole = {
    role: '',
  };
  public roleuser = {
    id: '',
    role: ''
  }

  public getallrole = [];

  getAllRole() {
    this.http.get('http://165.22.50.213:3000/getrole').subscribe(res => {
      this.getallrole = res['data'];
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  addRole() {
    this.http.post('http://165.22.50.213:3000/addrole', this.newrole).subscribe(res => {
      this.message = res;
      this.getlastRoleid();

    });
  }
  public lastroleid;
  getlastRoleid() {
    this.http.get('http://165.22.50.213:3000/getlastrole').subscribe(res => {
      this.lastroleid = res['data'][0]._id;
      this.autoaddpermissionforrole();
    });
  }
  autoaddpermissionforrole() {
    this.permission = {
      dashboard: '1-0-0-0-0',
      merch: '1-0-0-0-0',
      news: '1-0-0-0-0',
      ads: '1-0-0-0-0',
      rewards: '1-0-0-0-0',
      gamification: '1-0-0-0-0',
      redemption: '1-0-0-0-0',
      bookinglist: '1-0-0-0-0',
      user: '1-0-0-0-0',
      reporting: '1-0-0-0-0',
      memberacc: '1-0-0-0-0',
      generalsetting: '1-0-0-0-0',
      roleid: this.lastroleid,
    }
    this.http.post('http://165.22.50.213:3000/addpermission', this.permission).subscribe(res => {
      this.message = res;
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/userrole'])

    });
  }

  openAdd(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  sendPermission() {
    this.error = 0;
    // this.valid = this.validation()
    if (this.error === 0) {
      this.newPermission(this.permission);
    }
  }

  newPermission(permission) {
    this.http.post('http://165.22.50.213:3000/addpermission', permission).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/userrole'])

  }

  getonePermission(event) {
    if (event == "") {
      this.editpermission = {
        id: '',
        dashboard: '',
        merch: '',
        news: '',
        ads: '',
        rewards: '',
        gamification: '',
        redemption: '',
        bookinglist: '',
        user: '',
        reporting: '',
        memberacc: '',
        generalsetting: '',
      }
      this.retrievePermission();
    }
    else {
      this.http.get('http://165.22.50.213:3000/getapermission/' + event).subscribe(res => {
        this.permissions = res['data'];
        this.editpermission = {
          id: this.permissions[0]._id,
          dashboard: this.permissions[0].dashboard,
          merch: this.permissions[0].merch,
          news: this.permissions[0].news,
          ads: this.permissions[0].ads,
          rewards: this.permissions[0].rewards,
          gamification: this.permissions[0].gamification,
          redemption: this.permissions[0].redemption,
          bookinglist: this.permissions[0].bookinglist,
          user: this.permissions[0].user,
          reporting: this.permissions[0].reporting,
          memberacc: this.permissions[0].memberacc,
          generalsetting: this.permissions[0].generalsetting,
        }

        this.retrievePermission();
      });
    }

  }
  // getPermission() {
  //   this.http.get('http://165.22.50.213:3000/getpermission').subscribe(res => {
  //     this.perm = res;
  //     this.permissions = res['data'];
  //     this.editpermission = {
  //       id: this.permissions[0]._id,
  //       dashboard: this.permissions[0].dashboard,
  //       merch: this.permissions[0].merch,
  //       news: this.permissions[0].news,
  //       ads: this.permissions[0].ads,
  //       rewards: this.permissions[0].rewards,
  //       gamification: this.permissions[0].gamification,
  //       redemption: this.permissions[0].redemption,
  //       bookinglist: this.permissions[0].bookinglist,
  //       user: this.permissions[0].user,
  //       reporting: this.permissions[0].reporting,
  //       memberacc: this.permissions[0].memberacc,
  //       generalsetting: this.permissions[0].generalsetting,
  //     }

  //     this.retrievePermission();
  //   });
  // }

  editPermission(permission) {
    this.http.post('http://165.22.50.213:3000/editpermission', permission).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/userrole'])

  }

  getpermission = [];
  retrievePermission() {
    for (let i = 1; i < 13; i++) {
      var a = '#' + i + 'v';
      var b = '#' + i + 'a';
      var c = '#' + i + 'e';
      var d = '#' + i + 'd';
      var e = '#' + i + 'ex';
      switch (i) {
        case 1:
          var x = this.editpermission.dashboard.split('-');

          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 2:
          var x = this.editpermission.merch.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 3:
          var x = this.editpermission.news.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 4:
          var x = this.editpermission.ads.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 5:
          var x = this.editpermission.rewards.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 6:
          var x = this.editpermission.gamification.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 7:
          var x = this.editpermission.redemption.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 8:
          var x = this.editpermission.bookinglist.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 9:
          var x = this.editpermission.user.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 10:
          var x = this.editpermission.reporting.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 11:
          var x = this.editpermission.memberacc.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;
        case 12:
          var x = this.editpermission.generalsetting.split('-');
          if (x[0] == '1') {
            $(a).prop('checked', true)
          }
          else {
            $(a).prop('checked', false)
          }
          if (x[1] == '1') {
            $(b).prop('checked', true)
          }
          else {
            $(b).prop('checked', false)
          }
          if (x[2] == '1') {
            $(c).prop('checked', true)
          }
          else {
            $(c).prop('checked', false)
          }
          if (x[3] == '1') {
            $(d).prop('checked', true)
          }
          else {
            $(d).prop('checked', false)
          }
          if (x[4] == '1') {
            $(e).prop('checked', true)
          }
          else {
            $(e).prop('checked', false)
          }
          break;

        default:
          break;
      }
    }
  }

  public sessionid;

  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
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
      this.adminrole = res['data'][0].user;
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
