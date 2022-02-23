import { ViewChild, Component, OnInit } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss']
})
export class WheelsComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  constructor( private http: HttpClient) { 
   
  }

  idToLandOn=Math.round(Math.random() * (8 - 1) + 1);
  items=[
    {id:1, 'fillStyle': '#dec074', text: "prize1", type: "" ,mongoid: ""},
    {id:2, 'fillStyle': '#4251f5',text: "prize2", type: "" ,mongoid: ""},
    {id:3, 'fillStyle': '#dec074', text: "prize3", type: "" ,mongoid: ""},
    {id:4, 'fillStyle': '#42f572',text: "prize4", type: "" ,mongoid: ""},
    {id:5, 'fillStyle': '#dec074',text: "prize5", type: "" ,mongoid: ""},
    {id:6, 'fillStyle': '#42f572',text: "prize6", type: "" ,mongoid: ""},
    {id:7, 'fillStyle': '#dec074',text: "prize7", type: "" ,mongoid: ""},
    {id:8, 'fillStyle': '#42f572',text: "prize8", type: "" ,mongoid: ""},
  ];


  ngOnInit(){
    this.getGameSetting();

    // $('#me').hide(); 
  }
  before() {
    console.log('Your wheel is about to spin')
  }
  gameArr =[];
  getGameSetting() {
    this.http.get('http://165.22.50.213:3000/getGameSetting').subscribe(res => {
      this.gameArr = res['data'];
      this.getGameVoucher()
    });
  }

  gamevArr=[]
  getGameVoucher() {
    this.http.get('http://165.22.50.213:3000/getGameVoucher').subscribe(res => {
      this.gamevArr = res['data'];
      console.log(this.gamevArr)
      console.log(this.gameArr)
      this.items[0].text =this.gameArr[0].content + " " + this.gameArr[0].type;
      this.items[0].mongoid =this.gameArr[0]._id;
      this.items[0].type = "p";

      this.items[1].text =this.gameArr[1].content + " " + this.gameArr[1].type;
      this.items[1].mongoid =this.gameArr[1]._id;
      this.items[1].type = "p";

      this.items[2].text =this.gameArr[2].content + " " + this.gameArr[2].type;
      this.items[2].mongoid =this.gameArr[2]._id;
      this.items[2].type = "p";

      this.items[3].text =this.gamevArr[0].content + "\n" + this.gamevArr[0].type;
      this.items[3].mongoid =this.gamevArr[0]._id;
      this.items[3].type = "v";

      this.items[4].text =this.gameArr[3].content + " " + this.gameArr[3].type;
      this.items[4].mongoid =this.gameArr[3]._id;
      this.items[4].type = "p";

      this.items[5].text =this.gameArr[4].content + " " + this.gameArr[4].type;
      this.items[5].mongoid =this.gameArr[4]._id;
      this.items[5].type = "p";

      this.items[6].text =this.gameArr[5].content + " " + this.gameArr[5].type;
      this.items[6].mongoid =this.gameArr[5]._id;
      this.items[6].type = "p";

      this.items[7].text =this.gamevArr[1].content + "\n" + this.gamevArr[1].type;
      this.items[7].mongoid =this.gamevArr[1]._id;
      this.items[7].type = "v";
      // this.wheel.disableSpinOnClick = true;
      this.wheel.reset()
      
    });
  }
  async spin(prize) {

    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()

  }

  after() {
    switch (this.idToLandOn) {
      case 1:
        alert(this.items[0].text + this.items[0].mongoid);
        this.getprize(this.items[0]);
        break;
        case 2:
        alert(this.items[1].text + this.items[1].mongoid);
        this.getprize(this.items[1]);
        break;
        case 3:
        alert(this.items[2].text + this.items[2].mongoid)
        this.getprize(this.items[2]);
        break;
        case 4:
        alert(this.items[3].text + this.items[3].mongoid)
        this.getprize(this.items[3]);
        break;
        case 5:
        alert(this.items[4].text + this.items[4].mongoid)
        this.getprize(this.items[4]);
        break;
        case 6:
        alert(this.items[5].text + this.items[5].mongoid)
        this.getprize(this.items[5]);
        break;
        case 7:
        alert(this.items[6].text + this.items[6].mongoid)
        this.getprize(this.items[6]);
        break;
        case 8:
        alert(this.items[7].text + this.items[7].mongoid)
        this.getprize(this.items[7]);
        break;
    
      default:
        break;
    }
    this.idToLandOn=Math.round(Math.random() * (8 - 1) + 1);
    this.wheel.reset()
  }
  message: any;
  getprize(item){
    // if(item.type = "p"){
    //   this.http.post('http://165.22.50.213:3000/adddprizehistory', item).subscribe(res => {
    //     this.message = res;
    //     console.log(this.message)
    //   });
    // }
    // else{
    //   this.http.post('http://165.22.50.213:3000/adddprizehistoryvoucher', item).subscribe(res => {
    //     this.message = res;
    //     console.log(this.message)
    //   });
    // }
  }
}
