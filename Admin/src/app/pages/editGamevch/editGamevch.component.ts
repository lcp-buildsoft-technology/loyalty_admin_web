import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editGamevch',
  templateUrl: './editGamevch.component.html',
  styleUrls: ['./editGamevch.component.scss']
})
export class EditGamevchComponent implements OnInit {
  message: any;
  gamevArr = [];
  game: Object;
  public srch = [];
  public id;
  valid = [];
  error: number = 0;

  discountPattern = "^[0-9]{1,4}$";
  spendPattern = "^[0-9]{1,5}$";

  public editgamevoucher = {
    id: '',
    type: '',
    content: '',
    vtype: '',
    discount: '',
    minspend: '',
    tnc: '',
    sdate: '',
    edate: ''
  };

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private form: FormBuilder) {
    this.srch = [...this.gamevArr];
  }

  ngOnInit() {
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    console.log(this.id)
    this.getGameVoucher();

    $("form").attr('autocomplete', 'off');

  }

  updateVoucher() {

    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {

      this.editgamevoucher.id = this.id
      this.http.post('http://165.22.50.213:3000/editGameVoucher', this.editgamevoucher).subscribe(res => {
        console.log(res);
        this.message = res;
        // window.location.reload()
        // window.location.href = "/gameSetting";
        this.router.navigate(['/gameSetting'])
      });


    }
  }

  // open(gamesetting) {
  //   this.editgamesetting = {
  //     id: gamesetting._id,
  //     type: gamesetting.type,
  //     content: gamesetting.content
  //   }
  // }


  getGameVoucher() {
    this.http.get('http://165.22.50.213:3000/getGameVoucher').subscribe(res => {
      this.gamevArr = res['data'];
      console.log(this.gamevArr);
      for (var i = 0; i < this.gamevArr.length; i++) {
        if (this.gamevArr[i]._id == this.id) {
          this.editgamevoucher = {
            id: this.id,
            type: this.gamevArr[i].type,
            content: this.gamevArr[i].content,
            vtype: this.gamevArr[i].vtype,
            discount: this.gamevArr[i].discount,
            minspend: this.gamevArr[i].minspend,
            tnc: this.gamevArr[i].tnc,
            sdate: this.gamevArr[i].sdate,
            edate: this.gamevArr[i].edate,

          }
        }
      }
    });
  }


  validation() {

    if (this.editgamevoucher.content === '') {
      this.valid['content'] = "*Reward Content is required!";
      this.error++;
    }
    else {
      this.valid['content'] = ""
    }

    //type
    if (this.editgamevoucher.vtype === '') {
      this.valid['vtype'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['vtype'] = ""
    }

    //discount
    if (this.editgamevoucher.discount === '') {
      this.valid['discount'] = "*Amount of Discount is required!";
      this.error++;
    }
    else if (this.editgamevoucher.vtype === 'Percentage') {
      if (parseInt(this.editgamevoucher.discount) > 100){
        this.valid['discount'] = "*Invalid Discount Amount!";
        this.error++;
      }
    }
    else if (!this.editgamevoucher.discount.match(this.discountPattern)) {
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }

    if (this.editgamevoucher.minspend === '') {
      this.valid['minspend'] = "*Minimum Spend Amount is required!";
      this.error++;
    }
    else if (!this.editgamevoucher.minspend.match(this.spendPattern)) {
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }

    if (this.editgamevoucher.tnc === '') {
      this.valid['tnc'] = "*Terms and Conditions is required!";
      this.error++;
    }
    else {
      this.valid['tnc'] = ""
    }


    return this.valid;
  }

  goBack() {
    window.history.back();
  }

}
