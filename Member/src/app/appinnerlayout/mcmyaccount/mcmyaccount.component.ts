import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-mcmyaccount',
  templateUrl: './mcmyaccount.component.html',
  styleUrls: ['./mcmyaccount.component.scss']
})
export class McmyaccountComponent implements OnInit {

  merchantArr=[];
  message:any;
  public id: any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr:any;
  url=('../../../assets/img/blankimg.png');
  todayDate ="";

  public merchant ={
    _id:'',
    thumbnail:'',
    createdate:'',
    merchanttype:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    status:'',
    fb:'',
    ig:'',
    twitter:'',
    linkedin:'',
    tiktok:'',
    bankacc:'',
    bankname:'',
    swiftcode:''
  }

  public merchantObj ={
    thumbnail:'',
    createdate:'',
    merchanttype:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    status:'',
    fb:'',
    ig:'',
    twitter:'',
    linkedin:'',
    tiktok:'',
    bankacc:'',
    bankname:'',
    swiftcode:''
  };

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getMerchant();

    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);

    var today = new Date();
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
  }

  getMerchant()
  {
    this.http.get('http://165.22.50.213:3001/getmerchant').subscribe((res:any)=>
    {
      var data = res['data'];
      console.log(data);

      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id)
        {
          this.merchant ={
            _id:data[i]['_id'],
            thumbnail:data[i]['thumbnail'],
            createdate:data[i]['createdate'],
            merchanttype:data[i]['merchanttype'],
            companyname:data[i]['companyname'],
            regno:data[i]['regno'],
            email:data[i]['email'],
            contact:data[i]['contact'],
            address:data[i]['address'],
            status:data[i]['status'],
            fb:data[i]['fb'],
            ig:data[i]['ig'],
            twitter:data[i]['twitter'],
            linkedin:data[i]['linkedin'],
            tiktok:data[i]['tiktok'],
            bankacc:data[i]['bankacc'],
            bankname:data[i]['bankname'],
            swiftcode:data[i]['swiftcode']
          }
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];
          console.log(this.merchant);
        }
        else{}
      }
    });
  }

  go()
  {
    window.location.href = "/editmcprofile?id=" + this.merchant._id;
  }
}
