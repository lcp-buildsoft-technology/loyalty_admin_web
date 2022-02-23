import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-bookingsettings',
  templateUrl: './bookingsettings.component.html',
  styleUrls: ['./bookingsettings.component.scss']
})

export class BookingsettingsComponent implements OnInit {
  message: any;
  arr:any;
  dataslot:any;
  slotArr=[];
 
  oneslotArr = [];
  BookingsettingsArr = [];
  bookingArr = [];
  public srch =[] 
  venueArr=[]
  outletArr=[]

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.BookingsettingsArr];
  }

  public bookingsettings={
    day:[],
    stime: '',
    etime:'',
    slot:'',
  };

  public editbookingsettings={
    day:[],
    stime: '',
    etime:'',
    slot:'',
  };

  public dateslot={
    outletid:"",
    slot:0,
    createddate:''
  }

  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove();
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.getVenue(moutlet);
  }

  getVenue(moutlet:any) {
    this.http.get('http://165.22.50.213:3001/getmoutlet').subscribe((res:any) => {
       this.outletArr =  res['data'] ;

       for(var i=0 ; i < this.outletArr.length; i++){
        if(moutlet._id = this.outletArr[i]['_id']){
          this.checkslot(this.outletArr[i]['slot'])
        }
       }
    });
  }

  checkslot(slot:any) {
    console.log(slot)
    this.http.get('http://165.22.50.213:3001/getvenue').subscribe((res:any) => {
      this.slotArr = res['data']
      console.log(this.slotArr)
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
      
      for(var i =0 ; i < this.slotArr.length ; i++) {
        if(this.slotArr[i]['outletid'] == moutlet._id){
          this.dateslot.outletid = moutlet._id;
          this.dateslot.createddate = this.slotArr[i]['date']
          var value =  this.slotArr[i]['_value']
          this.http.post('http://165.22.50.213:3001/getslot',this.dateslot).subscribe((res:any) =>{
            this.dataslot = res['data']['slot']
            console.log(this.dataslot);
            this.message = res;
            console.log(this.message)

            if(this.message['success'] == true){
               this.oneslotArr = res['data']
               this.dateslot.slot =  this.dataslot - value
               console.log(this.dateslot)
               this.http.post('http://165.22.50.213:3001/updateslot',this.dateslot).subscribe(res =>{
              });
            }

            else if(this.message['success'] == false){
              console.log(slot)
              this.dateslot.slot =  slot - value
              this.http.post('http://165.22.50.213:3001/addslot',this.dateslot).subscribe(res =>{
              });
            }
          });
        }
      }
    });
  }

  uploadBooking(bookingsettings:any) {
    this.http.post('http://165.22.50.213:3001/editBookingsettings', bookingsettings).subscribe(res =>{
      console.log(res);
      this.message = res;
    });
  }
  
  sendData(){
    var val:any =[];
       $(':checkbox:checked').each(function(i){
          val[i] = $(this).val();
       });
      this.bookingsettings.day =val;
      console.log(this.arr)
      console.log(this.bookingsettings.day) 
  }

  registerOutlet(bookingsettings:any){
    console.log(bookingsettings);
    this.http.post('http://165.22.50.213:3001/addbookingsettings', bookingsettings).subscribe(res =>{
        console.log(res);
        this.message = res;
    });
  }

}
