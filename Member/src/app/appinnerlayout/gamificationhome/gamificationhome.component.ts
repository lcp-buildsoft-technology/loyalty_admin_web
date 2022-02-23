import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

declare const spin: any;
declare const shuffle: any;

@Component({
  selector: 'app-gamificationhome',
  templateUrl: './gamificationhome.component.html',
  styleUrls: ['./gamificationhome.component.scss']
})
export class GamificationhomeComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {}

  idToLandOn = Math.round(Math.random() * (8 - 1) + 1);

  items = [
    { id: 1, 'fillStyle': '#dec074', text: "prize1", type: "", mongoid: "", textFontSize: '14' },
    { id: 2, 'fillStyle': '#42f572', text: "prize2", type: "", mongoid: "", textFontSize: '14' },
    { id: 3, 'fillStyle': '#dec074', text: "prize3", type: "", mongoid: "", textFontSize: '14' },
    { id: 4, 'fillStyle': '#42f572', text: "prize4", type: "", mongoid: "", textFontSize: '14' },
    { id: 5, 'fillStyle': '#dec074', text: "prize5", type: "", mongoid: "", textFontSize: '14' },
    { id: 6, 'fillStyle': '#42f572', text: "prize6", type: "", mongoid: "", textFontSize: '14' },
    { id: 7, 'fillStyle': '#dec074', text: "prize7", type: "", mongoid: "", textFontSize: '14' },
    { id: 8, 'fillStyle': '#42f572', text: "prize8", type: "", mongoid: "", textFontSize: '14' },
  ];


  registerArr = [];
  ngOnInit() {
    $('#weee').hide();
    this.getGameSetting();
    this.getRegister();
  }

  lol = [];
  public currentmemberid: any;
  getRegister() {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res: any) => {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);

      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
      this.currentmemberid = memberid[0]._id
      this.getGameCount();
    })
  }

  before() {
    // console.log('Your wheel is about to spin')
  }

  gameArr = [];
  getGameSetting() {
    this.http.get('http://165.22.50.213:3001/getGameSetting').subscribe(res => {
      this.gameArr = res['data'];
      this.getGameVoucher()
    });
  }

  gamevArr = []
  getGameVoucher() {
    this.http.get('http://165.22.50.213:3001/getGameVoucher').subscribe(res => {
      this.gamevArr = res['data'];
      this.items[0].text = this.gameArr[0]['content'] + " " + this.gameArr[0]['type'];
      this.items[0].mongoid = this.gameArr[0]['_id'];
      this.items[0].type = "p";

      this.items[1].text = this.gameArr[1]['content'] + " " + this.gameArr[1]['type'];
      this.items[1].mongoid = this.gameArr[1]['_id'];
      this.items[1].type = "p";

      this.items[2].text = this.gameArr[2]['content'] + " " + this.gameArr[2]['type'];
      this.items[2].mongoid = this.gameArr[2]['_id'];
      this.items[2].type = "p";

      this.items[3].text = this.gamevArr[0]['content'] + "\n" + this.gamevArr[0]['type'];
      this.items[3].mongoid = this.gamevArr[0]['_id'];
      this.items[3].type = "v";

      this.items[4].text = this.gameArr[3]['content'] + " " + this.gameArr[3]['type'];
      this.items[4].mongoid = this.gameArr[3]['_id'];
      this.items[4].type = "p";

      this.items[5].text = this.gameArr[4]['content'] + " " + this.gameArr[4]['type'];
      this.items[5].mongoid = this.gameArr[4]['_id'];
      this.items[5].type = "p";

      this.items[6].text = this.gameArr[5]['content'] + " " + this.gameArr[5]['type'];
      this.items[6].mongoid = this.gameArr[5]['_id'];
      this.items[6].type = "p";

      this.items[7].text = this.gamevArr[1]['content'] + "\n" + this.gamevArr[1]['type'];
      this.items[7].mongoid = this.gamevArr[1]['_id'];
      this.items[7].type = "v";

      this.wheel.reset()
    });
  }

  async spin(prize: any) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  after() {
    switch (this.idToLandOn) {
      case 1:
        alert("Congratulation You Have Won " + this.items[0].text + " !");
        this.getprize(this.items[0]);
        break;
      case 2:
        alert("Congratulation You Have Won " + this.items[1].text + " !");
        this.getprize(this.items[1]);
        break;
      case 3:
        alert("Congratulation You Have Won " + this.items[2].text + " !");
        this.getprize(this.items[2]);
        break;
      case 4:
        alert("Congratulation You Have Won " + this.items[3].text + " !");
        this.getprize(this.items[3]);
        break;
      case 5:
        alert("Congratulation You Have Won " + this.items[4].text + " !");
        this.getprize(this.items[4]);
        break;
      case 6:
        alert("Congratulation You Have Won " + this.items[5].text + " !");
        this.getprize(this.items[5]);
        break;
      case 7:
        alert("Congratulation You Have Won " + this.items[6].text + " !");
        this.getprize(this.items[6]);
        break;
      case 8:
        alert("Congratulation You Have Won " + this.items[7].text + " !");
        this.getprize(this.items[7]);
        break;
      default:
        break;
    }
    this.idToLandOn = Math.round(Math.random() * (8 - 1) + 1);
    this.wheel.reset();
  }

  gc = [];
  public counter: any;
  getGameCount() {
    this.http.get('http://165.22.50.213:3001/getgamecounttt/' + this.currentmemberid).subscribe(res => {
      this.gc = res['data']
      this.counter = this.gc[0]['gcounter'];
      if (this.gc[0]['gcounter'] == '0') {
        this.wheel.reset()
        this.wheel.disableSpinOnClick = true;
        this.wheel.reset()
      }
      $('#weee').show();
    })
  }

  message: any;
  getprize(item: any) {
    if (item.type == "p") {
      console.log("ok")
      this.http.post('http://165.22.50.213:3001/adddprizehistory/' + this.currentmemberid, item).subscribe((res:any)=> {
        this.message = res;
      });
    }
    else {
      console.log(9090)
      this.http.post('http://165.22.50.213:3001/adddprizehistoryvoucher/' + this.currentmemberid, item).subscribe((res:any) => {
        this.message = res;
      });
    }
    this.http.get('http://165.22.50.213:3001/minusgamecounttt/' + this.currentmemberid).subscribe((res:any) => {
    })
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['/gamificationhome']);
    const gurl = "/gamificationhome?id=" + this.currentmemberid;
    console.log(gurl)
    this.router.navigateByUrl(gurl);
  }

  go()
  {
    const gpurl = "/gamificationprizehistory?id=" + this.currentmemberid;
    console.log(gpurl)
    this.router.navigateByUrl(gpurl);
  }
}