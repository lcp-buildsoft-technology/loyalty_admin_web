import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-todaystask',
  templateUrl: './todaystask.component.html',
  styleUrls: ['./todaystask.component.scss']
})
export class TodaystaskComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const ulElement: any = document.getElementsByClassName('date-list')[0];
    const liwidth:any = document.querySelectorAll('ul.date-list li')[0].clientWidth;
    const datelist = (document.querySelectorAll('ul.date-list li').length)*liwidth;
    this.renderer.setAttribute(ulElement, 'style', "width:"+datelist+"px;");      

  }



}
