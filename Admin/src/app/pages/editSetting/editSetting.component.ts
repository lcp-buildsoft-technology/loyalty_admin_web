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
  selector: 'app-editSetting',
  templateUrl: './editSetting.component.html',
  styleUrls: ['./editSetting.component.scss']
})
export class EditSettingComponent implements OnInit {

  message: any;
  gameArr = [];
  game: Object;
  public srch = [];
  public id;
  valid = [];
  error: number = 0;

  contentPattern="^[0-9]*$";
  
  public editgamesetting = {
    id: '',
    type: '',
    content: '',
  };

  constructor(private modalService: NgbModal, private router:Router, private http: HttpClient, private form: FormBuilder) {
    this.srch = [...this.gameArr];
  }

  ngOnInit() {
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    console.log(this.id)
    this.getGameSetting();

    $("form").attr('autocomplete', 'off');

  }

  updateSetting() {

    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {
    
      this.editgamesetting.id = this.id
      this.http.post('http://165.22.50.213:3000/editGameSetting', this.editgamesetting).subscribe(res => {
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


  getGameSetting() {
    this.http.get('http://165.22.50.213:3000/getGameSetting').subscribe(res => {
      this.gameArr = res['data'];
      console.log(this.gameArr);
      for (var i = 0; i < this.gameArr.length; i++) {
        if (this.gameArr[i]._id == this.id) {
          this.editgamesetting = {
            id: this.id,
            type: this.gameArr[i].type,
            content: this.gameArr[i].content,

          }
        }
      }
    });
  }


  validation() {
    if (this.editgamesetting.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    if (this.editgamesetting.content === '') {
      this.valid['content'] = "*Content is required!";
      this.error++;
    }
    else if (!this.editgamesetting.content.match(this.contentPattern) ) {
      this.error++;
    }
    else {
      this.valid['content'] = ""
    }


    return this.valid;
  }

  goBack() {
    window.history.back();
  }

}
