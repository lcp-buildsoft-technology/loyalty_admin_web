import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  message:any;
  public id:any;
  aboutusArr =[];
  onaboutusArr:any[] = [];
  contactinfoArr = [];
  public srch =[];
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public onaboutus:any ={
    _id:'',
    picture:'',
    description:'',
    thumbnailType:''
  }
  public aboutus ={
    _id:'',
    picture:'',
    description:'',
    thumbnailType:''
  }

  public contactinfo = {
    _id:'',
    label:'',
    content:''
  }

  constructor(private http: HttpClient, private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAboutus();
    this.getContactinfo();
  }

  getAboutus(){
    this.http.get('http://165.22.50.213:3001/getaboutus').subscribe((res:any) => 
    {
      this.aboutusArr = res['data'];
      console.log(this.aboutusArr);

      for(var i=0; i<this.aboutusArr.length; i++)
      {
        console.log("Aboutus")
        this.onaboutus = {
          _id:'',
          picture:'',
          description:'',
          thumbnailType:''
        }
        this.onaboutus._id = this.aboutusArr[i]['_id']
        this.onaboutus.description = this.aboutusArr[i]['description']
        this.onaboutus.picture = new Buffer(this.aboutusArr[i]['picture']['data']).toString('base64');
        this.onaboutus.thumbnailType = this.aboutusArr[i]['picture']['contentType']
        this.onaboutusArr.push(this.onaboutus);
        console.log(this.onaboutus)
      }
    });
  }

  getContactinfo(){
    this.http.get('http://165.22.50.213:3001/getcontactinfo').subscribe((res:any) => 
    {
      this.contactinfoArr = res['data'];
      console.log(this.contactinfoArr);
    });
  }

  backnav() {
    this.router.navigateByUrl('/home')
  }

}