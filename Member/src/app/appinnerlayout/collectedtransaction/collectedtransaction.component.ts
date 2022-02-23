import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collectedtransaction',
  templateUrl: './collectedtransaction.component.html',
  styleUrls: ['./collectedtransaction.component.scss']
})
export class CollectedtransactionComponent implements OnInit {
  showDiv = {
    All: false,
    Today: false,
    Yesterday: false,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
