import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "sidebarColor";

  constructor(public router: Router) { }
  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
  }
  changeDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() { }
  
  isLogin() {
    return !(this.router.url.includes("/login")) && !(this.router.url.includes("/enterotp") && !(this.router.url.includes("/enterpwd")));
  }

}