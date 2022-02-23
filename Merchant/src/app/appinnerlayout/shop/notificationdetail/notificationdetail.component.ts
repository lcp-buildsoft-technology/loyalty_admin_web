import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.component.html',
  styleUrls: ['./notificationdetail.component.scss']
})

export class NotificationdetailComponent implements OnInit {

  message: any;  
  newsArr = [];
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public news = {
    _id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    caption:'',
    thumbnail:''
  }; 

  constructor(private http: HttpClient, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNews(); 
    
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id); 
  }

  getNews()
  {
    this.http.get('http://165.22.50.213:3001/getnews').subscribe((res:any) => 
    {
      var data = res['data'];
      console.log(data);

      for(var i=0; i<data.length; i++){
        console.log(data[i]['_id']);
        console.log(this.id);
             if(data[i]['_id'] == this.id ){
              this.news = {
                _id:data[i]['_id'],
                title:data[i]['title'],
                date: data[i]['date'],
                time:data[i]['time'],
                description: data[i]['description'],
                caption:data[i]['caption'],
                thumbnail:data[i]['thumbnail'],
              }
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
      
              this.imagetypeArr = data[i]['thumbnail']['contentType'];             
              console.log(this.news)          
             }
             else{
             }
      }
    });
  }


  backnav() {
    this.router.navigate(['/shownotification'])
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
  }

  showImage()
  {
    this.http.get('http://165.22.50.213:3001/getoneimage/'+this.id).subscribe((res:any) => {
      this.imagesArr = res['data'];
      console.log(this.imagesArr);

      this.image1arr = new Buffer(this.imagesArr[0]['img']['data']).toString('base64');
      
      this.imagetypeArr = this.imagesArr[0]['img']['contentType'];
  });

}
}
