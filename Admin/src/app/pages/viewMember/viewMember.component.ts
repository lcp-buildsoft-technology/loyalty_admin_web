import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

var angular: any;
@Component({
  selector: 'app-viewMember',
  templateUrl: './viewMember.component.html',
  styleUrls: ['./viewMember.component.scss']
})
export class ViewMemberComponent implements OnInit {

  message: any;
  memberArr = [];
  mem: Object;
  public srch = [];
  public id;


  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router) {
    this.srch = [...this.memberArr];
  }

  public editMember = {
    _id: '',
    name: '',
    username: '',
    thumbnail: '',
    phonenumber: '',
    email: '',
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
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    this.getMember();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
  }

  uploadMember(members) {
    console.log(members);
    this.http.post('http://165.22.50.213:3000/editmember', members).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const vmurl = "/viewMember?id=" + members._id;
    console.log(vmurl)
    this.router.navigateByUrl(vmurl)


    });
    // window.location.href = "/memberData";
    this.router.navigate(['/memberData'])
  }

  open(member) {
    this.editMember = {
      _id: member._id,
      name: member.name,
      username: member.username,
      thumbnail: member.thumbnail,
      phonenumber: member.phonenumber,
      email: member.email,
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
  }

  getMember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      console.log(this.memberArr);
      for (var i = 0; i < this.memberArr.length; i++) {
        if (this.memberArr[i]._id == this.id) {
          this.editMember = {
            _id: this.memberArr[i]._id,
            username: this.memberArr[i].username,
            name: this.memberArr[i].name,
            thumbnail: this.memberArr[i].thumbnail,
            phonenumber: this.memberArr[i].phonenumber,
            email: this.memberArr[i].email,
            birthdate: this.memberArr[i].birthdate,
            tierlevel: this.memberArr[i].tierlevel,
            pointscollect: this.memberArr[i].pointscollect,
            pointsredeem: this.memberArr[i].pointsredeem,
            address1: this.memberArr[i].address1,
            address2: this.memberArr[i].address2,
            address3: this.memberArr[i].address3,
            state: this.memberArr[i].state,
            city: this.memberArr[i].city,
            postcode: this.memberArr[i].postcode,
            status: this.memberArr[i].status,
            createdat: this.memberArr[i].createdat
          }
        }
        console.log(this.memberArr)
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
