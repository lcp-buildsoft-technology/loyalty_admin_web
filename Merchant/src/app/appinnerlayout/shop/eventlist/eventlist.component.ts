import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var angular:any;

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})

export class EventlistComponent implements OnInit {
  searchInput : string ='';
  message: any;
  imageid:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr = []
  imagesarrid:any;

  public srch =[];
  todayDate="";
  eventArr = [];
  upeventArr: string[] = [];
  hiseventArr: string[] = [];
  todayeventArr: string[] = [];

  backnav()
  {
    window.location.href="/home"
  }

  constructor(private modalService: NgbModal, private http: HttpClient, private _compiler: Compiler,private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.eventArr];
  }

  public event:any={
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
    thumbnailType:'',
    outletid:''
  };

  public todayevent:any={
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
    thumbnailType:''
  };

  public upevent:any={
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
    thumbnailType:''  
  };

  public hisevent:any={
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
    thumbnailType:''  
  };

  public deleteevent={
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
    whatsapp:''
  };

  public activity={
    eventtoday:0,
    venuetoday:0
  };

  public month ={
    id:''
  }
  
  public  id:any;

    ngOnInit() {
      var url= document.URL;
      console.log(url)
      const myArray = url.split("=");
      this.id = myArray[1];
      this.month.id=this.id
      console.log(this.id);
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
      this.getEvent(moutlet);
      this.open(this.event);

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

    getEvent(moutlet:any) {
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
      this.event.outletid = moutlet._id
      this.http.post('http://165.22.50.213:3001/getoutletevent',this.event).subscribe((res:any) => {
      
      this.eventArr = res['data'] ;
      console.log(this.eventArr);
         
          for(var i = 0 ; i < this.eventArr.length ; i++){
  
               if(this.eventArr[i]['edate'] < this.todayDate){
                this.hisevent={
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
                  thumbnailType:''
                };

                this.hisevent._id =this.eventArr[i]['_id']
                this.hisevent.eventname =this.eventArr[i]['eventname']
                this.hisevent.eventhost =this.eventArr[i]['eventhost']
                this.hisevent.sdate =this.eventArr[i]['sdate']
                this.hisevent.edate =this.eventArr[i]['edate']
                this.hisevent.stime =this.eventArr[i]['stime']
                this.hisevent.etime =this.eventArr[i]['etime']
                this.hisevent.amount =this.eventArr[i]['amount']
                this.hisevent.location =this.eventArr[i]['location']
                this.hisevent.description =this.eventArr[i]['description']
                this.hisevent.contact =this.eventArr[i]['contact']
                this.hisevent.email =this.eventArr[i]['email']
                this.hisevent.whatsapp =this.eventArr[i]['whatsapp']
                this.hisevent.thumbnail = new Buffer(this.eventArr[i]['thumbnail']['data']).toString('base64');
                this.hisevent.thumbnailType= this.eventArr[i]['thumbnail']['contentType']
                this.hiseventArr.push(this.hisevent);
                 
              }
              else if ((this.eventArr[i]['edate'] >= this.todayDate) && (this.eventArr[i]['sdate'] <= this.todayDate) ){
                this.todayevent={
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
                  thumbnailType:''
                };

                this.todayevent._id =this.eventArr[i]['_id']
                this.todayevent.eventname =this.eventArr[i]['eventname']
                this.todayevent.eventhost =this.eventArr[i]['eventhost']
                this.todayevent.sdate =this.eventArr[i]['sdate']
                this.todayevent.edate =this.eventArr[i]['edate']
                this.todayevent.stime =this.eventArr[i]['stime']
                this.todayevent.etime =this.eventArr[i]['etime']
                this.todayevent.amount =this.eventArr[i]['amount']
                this.todayevent.location =this.eventArr[i]['location']
                this.todayevent.description =this.eventArr[i]['description']
                this.todayevent.contact =this.eventArr[i]['contact']
                this.todayevent.email =this.eventArr[i]['email']
                this.todayevent.whatsapp =this.eventArr[i]['whatsapp']
                this.todayevent.thumbnail = new Buffer(this.eventArr[i]['thumbnail']['data']).toString('base64');
                this.todayevent.thumbnailType= this.eventArr[i]['thumbnail']['contentType']
                this.todayeventArr.push(this.todayevent);
              }
              else {
                this.upevent={
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
                  thumbnailType:''
                };
                this.upevent._id =this.eventArr[i]['_id']
                this.upevent.eventname =this.eventArr[i]['eventname']
                this.upevent.eventhost =this.eventArr[i]['eventhost']
                this.upevent.sdate =this.eventArr[i]['sdate']
                this.upevent.edate =this.eventArr[i]['edate']
                this.upevent.stime =this.eventArr[i]['stime']
                this.upevent.etime =this.eventArr[i]['etime']
                this.upevent.amount =this.eventArr[i]['amount']
                this.upevent.location =this.eventArr[i]['location']
                this.upevent.description =this.eventArr[i]['description']
                this.upevent.contact =this.eventArr[i]['contact']
                this.upevent.email =this.eventArr[i]['email']
                this.upevent.whatsapp =this.eventArr[i]['whatsapp']
                this.upevent.thumbnail = new Buffer(this.eventArr[i]['thumbnail']['data']).toString('base64');
                this.upevent.thumbnailType= this.eventArr[i]['thumbnail']['contentType']
                this.upeventArr.push(this.upevent);
              }
        }
          this.activity['eventtoday'] = this.todayeventArr.length;
      });
    }

    Transfer(id:any){
      var name= $("#deletebtn_"+id).attr('name')+"";
      console.log(name);
      console.log(id)
      $("#event_name").val(name);
    }

    DeleteEvent(event:any){
      var id = $('#event_name').val();
      console.log(id)
      this.event._id =''+id+'';
      var data:any = {
        '_id':id
      };
      console.log(data)
      this.http.post("http://165.22.50.213:3001/deleteevent" ,data).subscribe((res:any) =>{
        this.eventArr = res['data'] ;
        console.log(res);
        this.message = res;
        this.router.navigateByUrl('/eventlist')
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/eventlist']);
    }

    open(event:any) {
      this.deleteevent = {
        _id:event._id,
        eventname:event.eventname,
        eventhost:event.eventhost,
        sdate:event.sdate,
        edate:event.edate,
        stime:event.stime,
        etime:event.etime,
        amount:event.amount,
        location:event.location,
        description:event.description,
        contact:event.contact,
        email:event.email,
        whatsapp:event.whatsapp
      }
      
    }

    edit(event:any){
      console.log(event);
      const eeurl = "/editevent?id=" + event._id
      console.log(eeurl)
      this.router.navigateByUrl(eeurl)
    }

    detail(event:any){
      const edurl = "/eventdetails?id=" + event._id
      console.log(edurl)
      this.router.navigateByUrl(edurl)
    }

    add(id:any){
      var name= $("#deletebtn_"+id).attr('name')+"";
      console.log(name);
      console.log(id)
     
      const beurl = "/bookevent?id=" + name
      console.log(beurl)
      this.router.navigateByUrl(beurl)
    }

    goto(){
      this.DeleteEvent(this.event)
      this.router.navigateByUrl('/eventlist')
    }

}
