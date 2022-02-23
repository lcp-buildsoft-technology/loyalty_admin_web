import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  message:any;
  public id:any;
  mcfaqArr = [];  
  public srch =[];
  searchFaq: string = '';

  public mcfaq = {
    _id: '',
    question:'',
    answer:'',
  }; 

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.mcfaqArr];
   }

  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove()
    this.getMcfaq();
  }

  getMcfaq(){
    this.http.get('http://165.22.50.213:3001/getmcfaq').subscribe((res:any) => 
    {
      this.mcfaqArr = res['data'];
      console.log(this.mcfaqArr);
    });
  }

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;


  backnav() {
    this.router.navigateByUrl('/home')
  }

}
