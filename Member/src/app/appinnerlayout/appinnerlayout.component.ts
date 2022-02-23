import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-appinnerlayout',
  templateUrl: './appinnerlayout.component.html',
  styleUrls: ['./appinnerlayout.component.scss']
})
export class AppinnerlayoutComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.setHeight()
  }

  ngAfterInit(): void{
   
  }

  setHeight() {
    
    const winheight = window.outerHeight;
    const headerHeight:any = document.getElementsByClassName("header")[0].clientHeight;
    const footerHeight:any = document.getElementsByClassName("footer-info")[0].clientHeight;
    let viewheight = winheight-headerHeight-footerHeight ; 
    var main = document.getElementsByClassName("main-container")[0];
    this.renderer.setAttribute(main, 'style', "min-height:"+viewheight+"px;");    
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

