import { Component,OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "black-dashboard-angular";
  data:any;
  constructor(private http: HttpClient){
  //get request from web api
  // this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
  
  //   this.data = data;
  // setTimeout(()=>{   
  //         $('#datatableexample').DataTable( {
  //           pagingType: 'full_numbers',
  //           pageLength: 5,
  //           processing: true,
  //           lengthMenu : [5, 10, 25]
  //       } );
  //       }, 1);
  //             }, error => console.error(error));
              
  }
  ngOnInit(): void {
    $(window).on('beforeunload', function(){
      $(window).scrollTop(0);
    });
    // throw new Error("Method not implemented.");
  }
  
  
  
}
