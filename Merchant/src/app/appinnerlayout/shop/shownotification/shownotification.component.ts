import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-notification',
  templateUrl: './shownotification.component.html',
  styleUrls: ['./shownotification.component.scss']
})
export class ShownotificationComponent implements OnInit {

  message:any;
  public id:any;
  newsArr = [];
  onnewsArr = [];
  public srch =[];
  todayDate = "";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.newsArr];
   }

   public news = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:'',
  }; 

  public onnews = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:''
  }; 

  ngOnInit(): void {
    this.getNews();
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove();

    var today = new Date();
    var time = today.getHours() +":" + today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth() + 1

    var day = "";
    var month = "";

    var yyyy = today.getFullYear();
    if (dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }
    if (mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }
    this.todayDate = yyyy + '-' + month + '-' + day;
    this.todayDate = time;
  }

  backnav() {
    this.router.navigate(['/home'])
  }

  getNews()
  {
    this.http.get('http://165.22.50.213:3001/getmcpublishednew').subscribe((res:any) => 
    {
      this.newsArr = res['data'];
      console.log(this.newsArr);

      for(var i=0; i < this.newsArr.length; i++){
        
          this.onnewsArr.push(this.newsArr[i]);
        
       
      }
    });
  }

  open(newsArr:any)
  {
    console.log(newsArr);
    const nd = "/notificationdetail?id=" + newsArr['_id'];
    console.log(nd)
    this.router.navigateByUrl(nd)
  }

}
