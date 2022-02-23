import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {
  message: any;
  public id: any;
  registerArr = [];
  onregisterArr: string[] = []

  image1arr: any;
  imagetypeArr: any;
  imagesArr: any;

  public register = {
    _id: '',
    phonenumber: '',
    name: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    confirmpwd: '',
    email: '',
    username: '',
    thumbnail: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: '',
    totalpoints: '',
    thumbnailType: ''
  }

  public onregister: any = {
    _id: '',
    phonenumber: '',
    name: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    confirmpwd: '',
    email: '',
    username: '',
    thumbnail: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: '',
    totalpoints: '',
    thumbnailType: ''
  }

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.getRegister();

    var url = document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  lol = [];
  public currentmemberid: any;

  getRegister() {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res: any) => {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }

      for (var i = 0; i < this.registerArr.length; i++) {
        this.onregister =
        {
          _id: '',
          phonenumber: '',
          name: '',
          password: '',
          birthdate: '',
          tierlevel: '',
          pointscollect: '',
          pointsredeem: '',
          confirmpwd: '',
          email: '',
          username: '',
          thumbnail: '',
          address1: '',
          address2: '',
          address3: '',
          state: '',
          city: '',
          postcode: '',
          status: '',
          createdat: '',
          totalpoints: '',
          thumbnailType: ''
        };
        this.onregister._id = this.registerArr[i]['_id']
        this.onregister.phonenumber = this.registerArr[i]['phonenumber']
        this.onregister.name = this.registerArr[i]['name']
        this.onregister.password = this.registerArr[i]['password']
        this.onregister.birthdate = this.registerArr[i]['birthdate']
        this.onregister.tierlevel = this.registerArr[i]['tierlevel']
        this.onregister.pointscollect = this.registerArr[i]['pointscollect']
        this.onregister.pointsredeem = this.registerArr[i]['pointsredeem']
        this.onregister.confirmpwd = this.registerArr[i]['confirmpwd']
        this.onregister.email = this.registerArr[i]['email']
        this.onregister.username = this.registerArr[i]['username']
        this.onregister.address1 = this.registerArr[i]['address1']
        this.onregister.address2 = this.registerArr[i]['address2']
        this.onregister.address3 = this.registerArr[i]['address3']
        this.onregister.state = this.registerArr[i]['state']
        this.onregister.city = this.registerArr[i]['city']
        this.onregister.postcode = this.registerArr[i]['postcode']
        this.onregister.status = this.registerArr[i]['status']
        this.onregister.createdat = this.registerArr[i]['createdat']
        this.onregister.totalpoints = this.registerArr[i]['totalpoints']
        this.onregister.thumbnail = new Buffer(this.registerArr[i]['thumbnail']['data']).toString('base64');
        this.onregister.thumbnailType = this.registerArr[i]['thumbnail']['contentType']
        this.onregisterArr.push(this.onregister);
      }
    });
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
  }

  open() {
    window.location.href = "/profile?id=" + this.registerArr[0]['_id'];
  }

}
