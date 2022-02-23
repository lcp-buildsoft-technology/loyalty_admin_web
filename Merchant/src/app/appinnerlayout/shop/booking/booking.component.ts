import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { WindowScrollController } from '@fullcalendar/common';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class bookingComponent implements OnInit {
  searchInput : string ='';
  venueArr=[];
  allvenueArr=[];
  secvenueArr=[];
  hisvenueArr=[];
  todayvenueArr=[];
  upvenueArr=[];
  saveUsernameArr: string[] = [];
  cancelArr=[
    {
      value:"Cancelled"
    }
  ]

  backnav() {
    this.router.navigate[('/home')]
  }

  public saveUsername!: boolean;

  public srch =[];
  todayDate="";
  constructor(private modalService: NgbModal, private http: HttpClient, private _compiler: Compiler, private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.venueArr];
  }

  public venue={
    firstname:'',
    _value: '',
    date:'',
    lastname:'',
    phonenumber:'',
    time:'',
    status:'',
    arrv :''
  };
     
  public image={
    thumbnail:'',
    thumbnailType:'',
    shopname:''
  };
     
  public todayvenue={
    firstname:'',
    _value: '',
    date:'',
    lastname:'',
    phonenumber:'',
    time:'',
    status:'',
    arrv:''
  };

  public hisvenue={
    firstname:'',
    _value: '',
    date:'',
    lastname:'',
    phonenumber:'',
    time:'',
    status:'',
    arrv:''     
  };

  public upvenue={
    _id:'',
    firstname:'',
    _value: '',
    date:'',
    lastname:'',
    phonenumber:'',
    time:'',
    status:'',
    arrv:''   
  };

  public  id:any; 
  public cal:any

  ngOnInit(): void {
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    console.log(moutlet['shopname'])
    this.getVenue(moutlet);
    this.image.shopname =moutlet['shopname']
    this.image.thumbnail =new Buffer(moutlet['thumbnail']['data']).toString('base64')
    this.image.thumbnailType=moutlet['thumbnail']['contentType']
  }

  ShowHideDiv(){
    if($("#show1").is(':checked')){
      this.todayvenue['arrv'] = "1"
    }
    else {
      this.todayvenue['arrv'] = "0"
    }
  }

  Check(id : any){
   
    var name= $("#show_"+id).attr('name')+"";
  
    console.log(id);
   
    this.http.get('http://165.22.50.213:3001/getvenue').subscribe((res:any) => {
    console.log
    console.log(res['data'])  
    this.allvenueArr = res['data']
    this.secvenueArr = res['data']
    console.log( this.allvenueArr)
    console.log( this.secvenueArr)

    for(var i=0 ; i<this.allvenueArr.length; i++){
   
      if( this.allvenueArr[i]['_id'] == id ){
      
        if(this.allvenueArr[i]['arrv'] == ""){
         console.log("jii")
          var data:any = {
            '_id':id,
            'arrv':"true"
            
          };
          this.http.post('http://165.22.50.213:3001/editcheck', data).subscribe(res =>{
            console.log(res);
          });   
        }

        else{
          var data:any = {
            '_id':id,
            'arrv':""
          };
          console.log("tountick")
          this.http.post('http://165.22.50.213:3001/editcheck', data).subscribe(res =>{
            console.log(res);
          });   
        }     
     }
    }
   });
  }

  getVenue(moutlet:any) {
    this.http.get('http://165.22.50.213:3001/getvenue').subscribe((res:any) => {
        this.venueArr = res['data'] ;
        console.log(this.venueArr)

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
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(date);


        for(var i = 0 ; i < this.venueArr.length ; i++){
             if(this.venueArr[i]['outletid']  == moutlet._id){
             if (this.venueArr[i]['date'] == this.todayDate){    
              this.todayvenueArr.push(this.venueArr[i]);
            }

            else  if(this.venueArr[i]['date'] < this.todayDate){
              console.log(this.venueArr[i])
               console.log(this.venueArr[i]['arrv'])
              this.hisvenueArr.push(this.venueArr[i]);

              console.log(this.hisvenueArr)
            }

            else {
                    this.upvenueArr.push(this.venueArr[i]) ;
                    console.log(this.venueArr[i])

            }
        }
      }
        $(".show").prop('checked')
      
    });
  }
 
  Transfer(id:any){
    var name= $("#deletebtn_"+id).attr('name')+"";
    console.log(name);
    console.log(id);
    var data:any = {
      '_id':id,
      status:"Cancelled"
    };

    
    this.http.post('http://165.22.50.213:3001/editvenue', data).subscribe(res =>{
      console.log(res);
    });
 
    this.router.navigate[('/booking')]

  }
  clickcancel(){
    var id = $('#venue_name').val();
    this.upvenue._id =''+id+'';
    console.log(this.upvenue._id)
    var data:any = {
      '_id':id
    };
    console.log(data)  
    
  }
  
}
