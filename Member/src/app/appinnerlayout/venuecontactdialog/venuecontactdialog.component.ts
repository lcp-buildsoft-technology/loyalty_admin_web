import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-venuecontactdialog',
  templateUrl: './venuecontactdialog.component.html',
  styleUrls: ['./venuecontactdialog.component.scss']
})
export class VenuecontactdialogComponent implements OnInit {

  message: any;
  moutletArr = []; 
  public id:any;
  public outlet = {
    _id:'',
    merchantid:'',
    shopname:'',
    address:'',
    phone:'',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:'',
    outletid:'',
    thumbnail:'',  
    latlong:'' 
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOutlet();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getOutlet()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.outlet = {
                _id:data[i]['_id'],
                merchantid:data[i]['merchantid'],
                shopname:data[i]['shopname'],
                address:data[i]['address'],
                phone:data[i]['phone'],
                whatsapp:data[i]['whatsapp'],
                email:data[i]['email'],
                operatehrsstart:data[i]['operatehrsstart'],
                operatehrsend:data[i]['operatehrsend'],
                operateday1:data[i]['operateday1'],
                operateday2:data[i]['operateday2'],
                description:data[i]['description'],
                outletid:data[i]['outletid'],
                thumbnail:data[i]['thumbnail'],
                latlong:data[i]['latlong']

              }              
             }
             else{}
      }
    });
  }

  whatsapp()
  {
    const wsurl = "https://api.whatsapp.com/send?phone=" + this.outlet.whatsapp;
    window.open(wsurl)
  }

  email()
  {
    const emurl = "mailto:" + this.outlet.email;
    window.open(emurl)
  }

  call()
  {
    const phurl = "tel:" + this.outlet.phone;
    window.open(phurl)
  }

}
