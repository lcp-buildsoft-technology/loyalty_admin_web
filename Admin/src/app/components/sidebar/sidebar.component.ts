import { Component, OnInit } from "@angular/core";
import * as $ from 'jquery';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/merchant",
    title: "Merchant & Online Store",
    icon: "icon-coins",
    class: ""
  },
  {
    path: "/newsManagement",
    title: "News",
    icon: "icon-alert-circle-exc",
    class: ""
  },
  {
    path: "/advertisement",
    title: "Advertisement",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/rewards",
    title: "Rewards & Voucher",
    icon: "icon-puzzle-10",
    class: ""
  },

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private http: HttpClient, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    this.getSession();

    this.menuItems = ROUTES.filter(menuItem => menuItem);

    $(document).ready(function () {
      $("#member").hide();
      $("#userm").hide();
      $("#gs").hide();

      $("#memberdata").click(function (e) {
        $("#member").toggle(500);
        $("#userm").hide();
        $("#gs").hide();
        $("#tri1").toggleClass("down");
        e.stopPropagation();
      });
      $("#usermanagement").click(function (e) {
        $("#userm").toggle(500);
        $("#member").hide();
        $("#gs").hide();
        $("#tri2").toggleClass("down");

        e.stopPropagation();
      });
      $("#gst").click(function (e) {
        $("#gs").toggle(500);
        $("#member").hide();
        $("#userm").hide();
        $("#tri3").toggleClass("down");
        e.stopPropagation();
      });
    });
    //close
    $(document).click(function () {
      $('#member').hide();
      $("#userm").hide();
      $("#gs").hide();
    });

  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  public adminid;
  public adminrole;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].dashboard;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewdashboard']").show();
      }
      this.adminrole = res['data'][0].merch;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewmerch']").show();
      }
      this.adminrole = res['data'][0].news;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewnews']").show();
      }
      this.adminrole = res['data'][0].ads;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewads']").show();
      }
      this.adminrole = res['data'][0].rewards;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewrewards']").show();
      }
      this.adminrole = res['data'][0].gamification;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewgamification']").show();
      }
      this.adminrole = res['data'][0].bookinglist;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewbookinglist']").show();
      }
      this.adminrole = res['data'][0].user;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewuser']").show();
      }
      this.adminrole = res['data'][0].reporting;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewreporting']").show();
      }
      this.adminrole = res['data'][0].memberacc;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewmemberacc']").show();
      }
      this.adminrole = res['data'][0].generalsetting;
       
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewgs']").show();
      }
    });

  }

}