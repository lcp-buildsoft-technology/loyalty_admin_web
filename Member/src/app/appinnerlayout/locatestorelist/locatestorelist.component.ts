import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-locatestorelist',
  templateUrl: './locatestorelist.component.html',
  styleUrls: ['./locatestorelist.component.scss']
})
export class LocatestorelistComponent implements OnInit {

  outletArr = [];
  searchStore: string = '';
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
    description:''   
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOutlet();
  }

  getOutlet(){
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) => {
      this.outletArr = res['data'];
      console.log(this.outletArr);
    });
  }

  open(outlet:any)
  {
    console.log(outlet);
    window.location.href="/locatestoredetails?id=" + outlet._id;
  }

}
