import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  message: any;
  registerArr = [];
  onregisterArr: string[] = []
  
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  public image:any;
  public images:any;
  public imagetype:any;
  url=('../../../assets/img/blankimg.png');
  todayDate = ""; 

    public register = {
    _id:'',
    phonenumber:'', 
    name:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    username:'',
    thumbnail:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    status:'',
    createdat:''
  }

  public onregister: any = {
    _id: '',
    phonenumber: '',
    name: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    confirmpwd: '',
    email: '',
    username: '',
    thumbnail: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: '',
    totalpoints: '',
    thumbnailType: ''
  }

  lol = [];
  public currentmemberid: any;

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.getRegister();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];

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

  editRegister(register:any){
    this.addimage();
  }

  getRegister() {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res: any) => {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }

      for (var i = 0; i < this.registerArr.length; i++) {
        this.onregister =
        {
          _id: '',
          phonenumber: '',
          name: '',
          password: '',
          birthdate: '',
          tierlevel: '',
          pointscollect: '',
          pointsredeem: '',
          confirmpwd: '',
          email: '',
          username: '',
          thumbnail: '',
          address1: '',
          address2: '',
          address3: '',
          state: '',
          city: '',
          postcode: '',
          status: '',
          createdat: '',
          totalpoints: '',
          thumbnailType: ''
        };
        this.onregister._id = this.registerArr[i]['_id']
        this.onregister.phonenumber = this.registerArr[i]['phonenumber']
        this.onregister.name = this.registerArr[i]['name']
        this.onregister.password = this.registerArr[i]['password']
        this.onregister.birthdate = this.registerArr[i]['birthdate']
        this.onregister.tierlevel = this.registerArr[i]['tierlevel']
        this.onregister.pointscollect = this.registerArr[i]['pointscollect']
        this.onregister.pointsredeem = this.registerArr[i]['pointsredeem']
        this.onregister.confirmpwd = this.registerArr[i]['confirmpwd']
        this.onregister.email = this.registerArr[i]['email']
        this.onregister.username = this.registerArr[i]['username']
        this.onregister.address1 = this.registerArr[i]['address1']
        this.onregister.address2 = this.registerArr[i]['address2']
        this.onregister.address3 = this.registerArr[i]['address3']
        this.onregister.state = this.registerArr[i]['state']
        this.onregister.city = this.registerArr[i]['city']
        this.onregister.postcode = this.registerArr[i]['postcode']
        this.onregister.status = this.registerArr[i]['status']
        this.onregister.createdat = this.registerArr[i]['createdat']
        this.onregister.totalpoints = this.registerArr[i]['totalpoints']
        this.onregister.thumbnail = new Buffer(this.registerArr[i]['thumbnail']['data']).toString('base64');
        this.onregister.thumbnailType = this.registerArr[i]['thumbnail']['contentType']
        this.onregisterArr.push(this.onregister);
      }
      $('#newimg').hide();
    });
  }

  onselectFile(event:any){
    if(event.target.files){
      var maxFileSize = 1024 * 1024; //1MB


      const file = event.target.files[0];
      
      if(file.size > maxFileSize){
        alert('Image too large. Maximum file size is 10MB');
        this.register.thumbnail = '';
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
  
addimage(){
  const formData = new FormData();

  formData.append('file', this.images)
  formData.append('id', this.id)
  formData.append('phonenumber', this.onregister.phonenumber)
  formData.append('email', this.onregister.email)
  formData.append('password', this.onregister.password)
  formData.append('confirmpwd', this.onregister.confirmpwd)
  formData.append('name', this.onregister.name)
  formData.append('username', this.onregister.username)
  formData.append('address1', this.onregister.address1)
  formData.append('address2', this.onregister.address2)
  formData.append('address3', this.onregister.address3)
  formData.append('state', this.onregister.state)
  formData.append('city', this.onregister.city)
  formData.append('postcode', this.onregister.postcode)
  formData.append('birthdate', this.onregister.birthdate)


  
  formData.forEach(file => console.log("File: ", file));
  this.http.post('http://165.22.50.213:3001/editmemberprofileandimage', formData).subscribe((res:any) =>{
    console.log(res);
    this.message = res;
    const maurl = "/myaccount?id=" + this.registerArr[0]['_id'];
    console.log(maurl)
    this.router.navigateByUrl(maurl)
});
}

  open(profile:any)
  {
    const maurl = "/myaccount?id=" + profile._id;
    console.log(maurl)
    this.router.navigateByUrl(maurl)
  }

  backnav() {
    const maurl = "/myaccount?id=" + this.registerArr[0]['_id'];
    console.log(maurl)
    this.router.navigateByUrl(maurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}

  
