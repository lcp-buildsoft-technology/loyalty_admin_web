import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gamificationprizehistory',
  templateUrl: './gamificationprizehistory.component.html',
  styleUrls: ['./gamificationprizehistory.component.scss']
})
export class GamificationprizehistoryComponent implements OnInit {
  selectedValue!: string;

  foods: Food[] = [
    { value: 'This-month', viewValue: 'This Month' },
    { value: 'This Week', viewValue: 'This Week' },
  ];

  message: any;
  gameArr = [];
  recentgameArr = [];
  historygameArr = [];
  registerArr = [];
  prizespts = [];
  prizesvoucher = [];
  dataToString:any;
  
  public prizepoints =
  {
    _id:'',
    points:'',
    createdDate:'',
    memberid:'',
    type:'',
    expireddate:''
  }

  public gamevoucher =
  {
    _id:'',
    title:'',
    sdate:'',
    edate:'',
    minspend:'',
    vtype:'',
    discount:'',
    memberid:'',
    type:'',
    status:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
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
      this.getPrizehistory() 
    })
  }

  getPrizehistory() {
    this.http.get('http://165.22.50.213:3001/getprizehistory/'+this.currentmemberid).subscribe((res: any) => {
      this.prizespts = res['data'];

      for(var i=0; i<this.prizespts.length; i++)
      {
        if(this.prizespts[i]['memberid'] == this.currentmemberid)
        {
          this.prizepoints =
          {
            _id:this.prizespts[i]['_id'],
            points:this.prizespts[i]['points'],
            createdDate:this.prizespts[i]['createdDate'],
            memberid:this.prizespts[i]['memberid'],
            type:this.prizespts[i]['type'],
            expireddate:this.prizespts[i]['expireddate']
          }
        }
        else{}
      }
      this.getPrizehistoryVoucher()
    })
  }

  getPrizehistoryVoucher() {
    this.http.get('http://165.22.50.213:3001/getprizehistoryvoucher/'+ this.currentmemberid).subscribe((res: any) => {
      this.prizesvoucher = res['data'];

      for(var i=0; i<this.prizesvoucher.length; i++)
      {
        if(this.prizesvoucher[i]['memberid'] == this.currentmemberid)
        {
          this.prizepoints =
          {
            _id:this.prizesvoucher[i]['_id'],
            points:this.prizesvoucher[i]['points'],
            createdDate:this.prizesvoucher[i]['createdDate'],
            memberid:this.prizesvoucher[i]['memberid'],
            type:this.prizesvoucher[i]['type'],
            expireddate:this.prizesvoucher[i]['expireddate']
          }
        }
        else{}
      }      
    })
  }

  open(prizesvoucher:any)
  {
    if(prizesvoucher.status == "Available")
    {
      const pvurl = "/prizevoucherqr?id=" + prizesvoucher['_id']
      console.log(pvurl)
      this.router.navigateByUrl(pvurl)
    }
    else{}
  }

  gc = [];
  public counter: any;
  wheel: any;
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
    const gurl = "/gamificationhome?id=" + this.currentmemberid;
    console.log(gurl)
    this.router.navigateByUrl(gurl);
  }

  // backnav() {
  //   const gurl = "/gamificationhome?id=" + this.currentmemberid;
  //   console.log(gurl)
  //   this.router.navigateByUrl(gurl);
  // }

  acc(){    
    const purl = "/profile?id=" + this.currentmemberid;
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
