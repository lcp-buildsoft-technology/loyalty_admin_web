import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-appinnerlayout',
  templateUrl: './appinnerlayout.component.html',
  styleUrls: ['./appinnerlayout.component.scss']
})
export class AppinnerlayoutComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterInit(): void{
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let header = document.getElementsByTagName('app-headerback')[0];
    let main = document.getElementsByTagName('html')[0];

    if (main.scrollTop > 15 ) {      
      header.classList.add('active');      
    }else{
      header.classList.remove('active');
    }
  }

}

