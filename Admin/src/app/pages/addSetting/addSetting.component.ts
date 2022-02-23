import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserModule } from '@angular/platform-browser';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addSetting',
  templateUrl: './addSetting.component.html',
  styleUrls: ['./addSetting.component.scss']
})
export class AddSettingComponent implements OnInit {

  message: any;
  valid = [];
  error: number = 0;

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router){
  }

  public gamesetting = {
    type: '',
    content: ''
  };


  ngOnInit() {
    $("form").attr('autocomplete', 'off');

  }

  sendGameSetting() {
    this.error = 0;
    console.log(this.gamesetting);
    this.validation();
    if (this.error === 0) {
    this.newGameSetting(this.gamesetting);
    }
  }

  newGameSetting(gamesetting) {
    console.log(this.gamesetting);
    console.log("this=",gamesetting)

    this.http.post('http://165.22.50.213:3000/addGameSetting', this.gamesetting).subscribe(res => {
      console.log(res);
      this.message = res;
      //this.getLastGame();
    });
    // window.location.href = "/gameSetting";
    this.router.navigate(['/gameSetting'])
  }


//   public lastgameid;
  
//   getLastGame(){
//     this.http.get('http://165.22.50.213:3000/getlastgame').subscribe(res => {
//       this.lastgameid = res['data'][0]._id;
//       console.log(this.lastgameid);
//     });

// }

  validation() {
    if (this.gamesetting.type=== '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    if (this.gamesetting.content === '') {
      this.valid['content'] = "*Content is required!";
      this.error++;
    }
    else {
      this.valid['content'] = ""
    }

    
  }

  goBack() {
    window.history.back();
  }

}
