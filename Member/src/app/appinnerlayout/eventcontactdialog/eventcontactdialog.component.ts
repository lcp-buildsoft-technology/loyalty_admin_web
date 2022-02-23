import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventcontactdialog',
  templateUrl: './eventcontactdialog.component.html',
  styleUrls: ['./eventcontactdialog.component.scss']
})
export class EventcontactdialogComponent implements OnInit {

  message:any;
  eventArr =[];
  public id:any;
  
  public event =
  {
    _id:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    amount:'',
    location:'',
    description:'',
    contact:'',
    email:'',
    whatsapp:'',
    thumbnail:'',
    termsandcondition:'',
    merchantid:'',
    outletid:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEvent();

    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getEvent()
  {
    this.http.get('http://165.22.50.213:3001/getevent').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++){
        if(data[i]['_id'] == this.id ){
          this.event = {
            _id:data[i]['_id'],
            eventname:data[i]['eventname'],
            eventhost:data[i]['eventhost'],
            sdate:data[i]['sdate'],
            edate:data[i]['edate'],
            stime:data[i]['stime'],
            etime:data[i]['etime'],
            amount:data[i]['amount'],
            location:data[i]['location'],
            description:data[i]['description'],
            contact:data[i]['contact'],
            email:data[i]['email'],
            whatsapp:data[i]['whatsapp'],
            thumbnail:data[i]['thumbnail'],
            termsandcondition:data[i]['termsandcondition'],
            merchantid:data[i]['merchantid'],
            outletid:data[i]['outletid']
          }    
        }
        else{}
      }
    });
  }

  whatsapp()
  {
    const wsurl = "https://api.whatsapp.com/send?phone=" + this.event.whatsapp;
    window.open(wsurl)
  }

  email()
  {
    const emurl = "mailto:" + this.event.email;
    window.open(emurl)
  }

  call()
  {
    const phurl = "tel:" + this.event.contact;
    window.open(phurl)
  }

}
