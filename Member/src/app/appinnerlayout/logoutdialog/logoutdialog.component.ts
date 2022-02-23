import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-logoutdialog',
  templateUrl: './logoutdialog.component.html',
  styleUrls: ['./logoutdialog.component.scss']
})
export class LogoutdialogComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    const lurl = "/login"
    console.log(lurl)
    this.router.navigateByUrl(lurl)
  }

  home() {
    const hurl = "/home"
    console.log(hurl)
    this.router.navigateByUrl(hurl)
  }

}
