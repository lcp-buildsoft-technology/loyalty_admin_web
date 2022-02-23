import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterpwd',
  templateUrl: './enterpwd.component.html',
  styleUrls: ['./enterpwd.component.scss']
})
export class EnterpwdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("form").attr('autocomplete', 'off');
  }

}
