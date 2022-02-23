
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
declare var angular:any;
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editmyaccount',
  templateUrl: './editmyaccount.component.html',
  styleUrls: ['./editmyaccount.component.scss']
})

export class EditmyaccountComponent implements OnInit {

  message:any;
  merchantArr=[];
  onmerchantArr: string[]=[];
  public id: any;
  imagesArr =[];
  image1arr:any;
  imagetypeArr:any;
  public image:any;
  public images:any;
  public imagetype:any;
  new ?:Object;
  public srch =[];
  url=('../../../assets/img/blankimg.png');
  todayDate = ""; 

  public merchant = {
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
    swiftcode:'',
  }

  public onmerchant:any = {
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
    swiftcode:'',
    thumbnailType:'',
  }

  public merchantObj ={
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
  };

  constructor(private http: HttpClient, private form: FormBuilder,private router: Router, private route: ActivatedRoute) { 
    this.srch = [...this.merchantArr];
  }

  ngOnInit(): void {
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    moutlet.merchantid

    this.getMerchant(moutlet);
    // this.getoneMerchantuser(moutlet);

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

  lol =[];
  public currentmerchantid:any;

  backnav() {
    this.router.navigate[('/myaccount')]
  }


  editMerchant(){
    this.addimage();
    console.log("hi")
  }

  getMerchant(moutlet:any)
  {
    this.http.get('http://165.22.50.213:3001/getmerchant').subscribe((res:any)=>
    {
      this.lol = res['data'];
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
      this.currentmerchantid = moutlet.merchantid

      for (let i=0; i<this.lol.length;i++){
        if(this.currentmerchantid==this.lol[i]['_id']){
          this.merchantArr[0]=this.lol[i];
        }
      }

      for(var i=0; i<this.merchantArr.length;i++){
        this.onmerchant={
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
          swiftcode:'',
          thumbnailType:''
        }
        this.onmerchant._id = this.merchantArr[i]['_id'];
        this.onmerchant.createdate = this.merchantArr[i]['createdate'];
        this.onmerchant.merchanttype = this.merchantArr[i]['merchanttype'];
        this.onmerchant.companyname = this.merchantArr[i]['companyname'];
        this.onmerchant.regno = this.merchantArr[i]['regno'];
        this.onmerchant.email = this.merchantArr[i]['email'];
        this.onmerchant.contact = this.merchantArr[i]['contact'];
        this.onmerchant.address = this.merchantArr[i]['address'];
        this.onmerchant.status = this.merchantArr[i]['status'];
        this.onmerchant.fb = this.merchantArr[i]['fb'];
        this.onmerchant.ig = this.merchantArr[i]['ig'];
        this.onmerchant.twitter = this.merchantArr[i]['twitter'];
        this.onmerchant.linkedin = this.merchantArr[i]['linkedin'];
        this.onmerchant.tiktok = this.merchantArr[i]['tiktok'];
        this.onmerchant.bankacc = this.merchantArr[i]['bankacc'];
        this.onmerchant.bankname = this.merchantArr[i]['bankname'];
        this.onmerchant.swiftcode = this.merchantArr[i]['swiftcode'];
        this.onmerchant.thumbnail = new Buffer(this.merchantArr[i]['thumbnail']['data']).toString('base64');
        this.onmerchant.thumbnailType = this.merchantArr[i]['thumbnail']['contentType']
        this.onmerchantArr.push(this.onmerchant);

        console.log(this.onmerchantArr)
      }
      $('#newimg').hide();
    });
  }

  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
        var maxFileSize = 1024 * 1024; //1MB

        const file = event.target.files[0];
        if(file.size > maxFileSize){
          alert('Image too large. Maximum file size is 1MB');
          this.merchant.thumbnail = '';
        }
        else{
          this.images=file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
          this.url=event.target.result;
          }
        }
      }
    }
  }

  addimage()
  {
    console.log("hi");
    const formData = new FormData();
    formData.append('file', this.images)
    formData.append('id', this.id)
    formData.append('companyname', this.onmerchant.companyname)
    formData.append('merchanttype', this.onmerchant.merchanttype)
    formData.append('regno', this.onmerchant.regno)
    formData.append('email', this.onmerchant.email)
    formData.append('contact', this.onmerchant.contact)
    formData.append('address', this.onmerchant.address)
    formData.append('fb', this.onmerchant.fb)
    formData.append('ig', this.onmerchant.ig)
    formData.append('twitter', this.onmerchant.twitter)
    formData.append('linkedin', this.onmerchant.linkedin)
    formData.append('tiktok', this.onmerchant.tiktok)
    formData.append('bankacc', this.onmerchant.bankacc)
    formData.append('bankname', this.onmerchant.bankname)
    formData.append('swiftcode', this.onmerchant.swiftcode)

    formData.forEach(file => console.log("File: ", file));
    console.log(formData);
    this.http.post('http://165.22.50.213:3001/editmerchantprofileandimage', formData).subscribe((res:any) =>{
      console.log(res);    
      this.message = res;
      const myacc = "/myaccount?id="+ this.merchantArr[0]['_id']
      console.log(myacc)
      this.router.navigateByUrl(myacc)
    });
  }

  open(profile:any)
  {
    console.log(profile);
    const myacc = "/myaccount?id="+ this.merchantArr[0]['_id']
    console.log(myacc)
    this.router.navigateByUrl(myacc)
  }
}

