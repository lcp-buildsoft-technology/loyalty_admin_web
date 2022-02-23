import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prizevoucherqr',
  templateUrl: './prizevoucherqr.component.html',
  styleUrls: ['./prizevoucherqr.component.scss']
})
export class PrizevoucherqrComponent implements OnInit {

  message: any;
  public id:any;
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
    expireddate:'',
    codetype:''
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
    status:'',
    codetype:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRegister();
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);
  }

  lol = [];
  public currentmemberid: any;

  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
      this.getPrizehistoryVoucher()
    });
  }

  getPrizehistoryVoucher() {
    this.http.get('http://165.22.50.213:3001/getprizehistoryvoucher/'+ this.currentmemberid).subscribe((res: any) => {
      var data = res['data'];
      console.log(data)

      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id)
        {
          this.gamevoucher =
          {
            _id:data[i]['_id'],
            title:data[i]['title'],
            sdate:data[i]['sdate'],
            edate:data[i]['edate'],
            minspend:data[i]['minspend'],
            vtype:data[i]['vtype'],
            discount:data[i]['discount'],
            memberid:data[i]['memberid'],
            type:data[i]['type'],
            status:data[i]['status'],
            codetype:"gamevoucher"
          }
          this.dataToString = JSON.stringify(this.gamevoucher)
          console.log(this.gamevoucher)
        }
        else{}
      }      
    })
  }
  close() {
    const gpurl = "/gamificationprizehistory?id=" + this.currentmemberid;
    console.log(gpurl)
    this.router.navigateByUrl(gpurl);
  }

  backnav() {
    const gpurl = "/gamificationprizehistory?id=" + this.currentmemberid;
    console.log(gpurl)
    this.router.navigateByUrl(gpurl);
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
