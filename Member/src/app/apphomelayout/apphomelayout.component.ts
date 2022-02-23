import { Component, OnInit, HostListener } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apphomelayout',
  templateUrl: './apphomelayout.component.html',
  styleUrls: ['./apphomelayout.component.scss']
})
export class ApphomelayoutComponent implements OnInit { 

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let main = document.getElementsByTagName('html')[0];

    if (main.scrollTop > 15 ) {      
    }else{
    }
  }

}
