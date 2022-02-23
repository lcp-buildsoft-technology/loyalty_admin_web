import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
declare var angular:any;
@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})
export class EventdetailsComponent implements OnInit {
  message: any;
 eventArr=[];
 public srch =[];
 image1arr:any;
 imagetypeArr:any;
 constructor(private modalService: NgbModal, private http: HttpClient,private form: FormBuilder, private router: Router, private route: ActivatedRoute) { 
  this.srch = [...this.eventArr];
 }
 public event={

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

   public selected={

    
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
     public  id:any;

     backnav()
     {
      this.router.navigate(['/eventlist'])
     }

  ngOnInit(): void {
  

      var url= document.URL;
      console.log(url)
      const myArray = url.split("=");
      this.id = myArray[1];
      console.log(this.id);
    

      this.getEvent(this.id);
  }
  getEvent(id:any) {
    this.event._id =this.id
    this.http.post('http://165.22.50.213:3001/getoneevent',this.event).subscribe((res:any) => {
    
     
       console.log( res);
        var data = res['data'] ;
        console.log(this.eventArr)
        for(var i=0; i<data.length; i++){
    
  
            this.eventArr = data[0];
            console.log(data[0])
            console.log('sadasdd')
            this.event={
              thumbnail:new Buffer(data[0]['thumbnail']['data']).toString('base64'),
              thumbnailType:data[0]['thumbnail']['contentType'],
              eventname:data[0]['eventname'],
              eventhost:data[0]['eventhost'],
              sdate:data[0]['sdate'],
              edate:data[0]['edate'],
              stime:data[0]['stime'],
              etime:data[0]['etime'],
              amount:data[0]['amount'],
              location:data[0]['location'],
              description:data[0]['description'],
              contact:data[0]['contact'],
              email:data[0]['email'],
              whatsapp:data[0]['whatsapp'],
              _id:data[0]['_id']
            
               };
               this.image1arr=this.event.thumbnail
               this.imagetypeArr=this.event.thumbnailType
              }
          

         
      
      
    });
  }
}
