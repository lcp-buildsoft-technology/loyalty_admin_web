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
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


var angular: any;
@Component({
  selector: 'app-memberData',
  templateUrl: './memberData.component.html',
  styleUrls: ['./memberData.component.scss'],
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`],
})

export class MemberDataComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;
  memberArr = [];
  mem: Object;
  public srch = [];

  constructor(private modalService: NgbModal, private router:Router,
    private sessionSt: SessionStorageService, private http: HttpClient) {
    this.srch = [...this.memberArr];
  }

  public editMember = {
    _id: '',
    name: '',
    username: '',
    thumbnail: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmpwd: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: ''
  }

  ngOnInit() {
    this.getSession();
    $(window).scrollTop(0);
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getMember();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  image1arr = [];
  imagetypearr = [];
  imagesArr = [];
  image(content, member) {
    this.imagesArr[0] = member;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  open(member) {
    // window.location.href = "/viewMember?id=" + member._id;
    const vmurl = "/viewMember?id=" + member._id;
    console.log(vmurl)
    this.router.navigateByUrl(vmurl)
    $('#status [value="' + member.status + '"]').attr('selected', 'true');
  }
  nevermind(id) {
    // window.location.href = "/memberRecord?id=" + id;
    const mrurl = "/memberRecord?id=" + id;
    console.log(mrurl)
    this.router.navigateByUrl(mrurl)
  }

  opene(member) {
    // window.location.href = "/editMember?id=" + member._id;
    const edmurl = "/editMember?id=" + member._id;
    console.log(edmurl)
    this.router.navigateByUrl(edmurl)
    $('#status [value="' + member.status + '"]').attr('selected', 'true');
  }


  openEdit(edit, member) {
    this.editMember = {
      _id: member._id,
      name: member.name,
      username: member.username,
      thumbnail: member.thumbnail,
      phonenumber: member.phonenumber,
      email: member.email,
      password: member.password,
      confirmpwd: member.confirmpwd,
      birthdate: member.birthdate,
      tierlevel: member.tierlevel,
      pointscollect: member.pointscollect,
      pointsredeem: member.pointsredeem,
      address1: member.address1,
      address2: member.address2,
      address3: member.address3,
      state: member.state,
      city: member.city,
      postcode: member.postcode,
      status: member.status,
      createdat: member.createdat
    }
    $('#status [value="' + member.status + '"]').attr('selected', 'true');
    this.modalService.open(edit, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public member = {
    _id: '',
    name: '',
    username: '',
    thumbnail: [],
    phonenumber: '',
    email: '',
    password: '',
    confirmpwd: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: ''
  }

  getMember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  // uploadMember(members){

  //   this.http.post('http://165.22.50.213:3000/editmember', members).subscribe(res =>{
  //     this.message = res;
  //   });

  //   window.location.reload();
  // }
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
      this.adminrole = res['data'][0].memberacc;
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
