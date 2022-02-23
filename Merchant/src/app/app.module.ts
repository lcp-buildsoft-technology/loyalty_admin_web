import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule} from 'ng-circle-progress';
import { NouisliderModule } from 'ng2-nouislider';import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { ApphomelayoutComponent } from './apphomelayout/apphomelayout.component';
import { AppinnerlayoutComponent } from './appinnerlayout/appinnerlayout.component';
import { LandingComponent } from './authlayout/landing/landing.component';
import { SigninComponent } from './authlayout/signin/signin.component';
import { SignupComponent } from './authlayout/signup/signup.component';
import { ForgetpasswordComponent } from './authlayout/forgetpassword/forgetpassword.component';

import { ResetpasswordComponent } from './authlayout/resetpassword/resetpassword.component';
import { VerifyComponent } from './authlayout/verify/verify.component';
import { voucheraddComponent } from './authlayout/voucheradd/voucheradd.component';
import { ShopvoucheraddComponent } from './appinnerlayout/shop/voucheradd/voucheradd.component';
import { StaticfooterComponent } from './apphomelayout/partials/staticfooter/staticfooter.component';
import { HeadermenuComponent } from './apphomelayout/partials/headermenu/headermenu.component';
import { SidebarComponent } from './apphomelayout/partials/sidebar/sidebar.component';
import { HomeComponent } from './apphomelayout/home/home.component';
import { StatsComponent } from './apphomelayout/stats/stats.component';
import { AreachartComponent } from './apphomelayout/home/areachart/areachart.component';
import { Smallareachart1Component } from './apphomelayout/home/smallareachart1/smallareachart1.component';
import { Smallareachart2Component } from './apphomelayout/home/smallareachart2/smallareachart2.component';

import { BarchartComponent } from './apphomelayout/stats/barchart/barchart.component';
import { PinnedComponent } from './apphomelayout/pinned/pinned.component';
import { ProfileComponent } from './apphomelayout/profile/profile.component';
import { StyleComponent } from './apphomelayout/style/style.component';
import { FooterinfoComponent } from './appinnerlayout/partials/footerinfo/footerinfo.component';
import { HeaderbackComponent } from './appinnerlayout/partials/headerback/headerback.component';
import { voucherComponent } from './appinnerlayout/shop/voucher/voucher.component';
import { ProductComponent } from './appinnerlayout/shop/product/product.component';
import { VoucherdetailComponent } from './appinnerlayout/shop/voucherdetail/voucherdetail.component';
import { PaymentComponent } from './appinnerlayout/shop/payment/payment.component';
import { bookingComponent } from './appinnerlayout/shop/booking/booking.component';
import { OrderdetailComponent } from './appinnerlayout/shop/orderdetail/orderdetail.component';
import { AddressesComponent } from './appinnerlayout/shop/addresses/addresses.component';
import { AddaddressesComponent } from './appinnerlayout/shop/addaddresses/addaddresses.component';
import { TodohomeComponent } from './appinnerlayout/todo/todohome/todohome.component';
import { TaskcalendarComponent } from './appinnerlayout/todo/taskcalendar/taskcalendar.component';
import { TodaystaskComponent } from './appinnerlayout/todo/todaystask/todaystask.component';
import { EventsComponent } from './appinnerlayout/todo/events/events.component';
import { EventdetailsComponent } from './appinnerlayout/todo/eventdetails/eventdetails.component';
import { ChatlistComponent } from './appinnerlayout/chatlist/chatlist.component';
import { MessagesComponent } from './appinnerlayout/messages/messages.component';
import { NotificationsComponent } from './appinnerlayout/notifications/notifications.component';
import { PagesComponent } from './appinnerlayout/pages/pages.component';
import { SettingsComponent } from './appinnerlayout/settings/settings.component';
import { FaqsComponent } from './appinnerlayout/faqs/faqs.component';
import { TimelineComponent } from './appinnerlayout/timeline/timeline.component';
import { UserlistComponent } from './appinnerlayout/userlist/userlist.component';
import { redemptionComponent } from './appinnerlayout/redemption/redemption.component';
import { PricingComponent } from './appinnerlayout/pricing/pricing.component';
import { TermsandcoditionComponent } from './appinnerlayout/termsandcodition/termsandcodition.component';
import { PagenotfoundComponent } from './appinnerlayout/pagenotfound/pagenotfound.component';
import { InvoiceComponent } from './appinnerlayout/shop/invoice/invoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BookseemoreComponent } from './appinnerlayout/shop/bookseemore/bookseemore.component';
import { MemberdataComponent } from './appinnerlayout/shop/memberdata/memberdata.component';
import { MemberlistComponent } from './appinnerlayout/shop/memberlist/memberlist.component';
import { ReportComponent } from './appinnerlayout/shop/report/report.component';
import { ThankyouComponent } from './appinnerlayout/shop/thankyou/thankyou.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BankComponent } from './appinnerlayout/shop/bank/bank.component';
import { CardComponent } from './appinnerlayout/shop/card/card.component';
import { NotifyComponent } from './appinnerlayout/shop/notify/notify.component';
import { CartComponent } from './appinnerlayout/shop/cart/cart.component';
import { EditprodComponent } from './appinnerlayout/shop/editprod/editprod.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FilterprodPipe } from './appinnerlayout/shop/Pipes/filterprod.pipe';
import { FilterPipe } from './appinnerlayout/shop/Pipes/filter.pipe';

import { FaqPipe } from './appinnerlayout/shop/Pipes/faq.pipe';
import { FiltervenuePipe } from './appinnerlayout/shop/Pipes/filtervenue.pipe';
import { BookeventComponent } from './appinnerlayout/shop/bookevent/bookevent.component';
import { EventlistComponent } from './appinnerlayout/shop/eventlist/eventlist.component';
import { BookingvenuelistComponent } from './appinnerlayout/shop/bookingvenuelist/bookingvenuelist.component';
import { FiltermemberPipe } from './appinnerlayout/shop/Pipes/filtermember.pipe';
import { VdetailComponent } from './appinnerlayout/shop/vdetail/vdetail.component';
import { EditeventComponent } from './appinnerlayout/shop/editevent/editevent.component';
import { OutletsettingsComponent } from './appinnerlayout/shop/outletsettings/outletsettings.component';
import { FiltereventPipe } from './appinnerlayout/shop/Pipes/filterevent.pipe';
import { BookingsettingsComponent } from './appinnerlayout/shop/bookingsettings/bookingsettings.component';
import { OutletlistComponent } from './appinnerlayout/shop/outletlist/outletlist.component';
import { EditoutletComponent } from './appinnerlayout/shop/editoutlet/editoutlet.component';
import { VredempComponent } from './appinnerlayout/shop/vredemp/vredemp.component';
import { ScannerComponent } from './appinnerlayout/shop/scanner/scanner.component';
import { ScanComponent } from './appinnerlayout/shop/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatDialogModule} from '@angular/material/dialog';
import { FilteroutletPipe } from './appinnerlayout/shop/Pipes/filteroutlet.pipe';
import { ReviewComponent } from './appinnerlayout/shop/review/review.component';
import { OutletdetailComponent } from './appinnerlayout/shop/outletdetail/outletdetail.component';
import { EnterotpComponent } from './appinnerlayout/shop/enterotp/enterotp.component';
import { MyaccountComponent } from './appinnerlayout/shop/myaccount/myaccount.component';
import { EditmyaccountComponent } from './appinnerlayout/shop/editmyaccount/editmyaccount.component';
import { ProfilescanComponent } from './appinnerlayout/shop/profilescan/profilescan.component';
import { ShownotificationComponent } from './appinnerlayout/shop/shownotification/shownotification.component';
import { RewardscanComponent } from './appinnerlayout/shop/rewardscan/rewardscan.component';
import { AboutusComponent } from './appinnerlayout/shop/aboutus/aboutus.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AgmCoreModule } from '@agm/core';
import { NotificationdetailComponent } from './appinnerlayout/shop/notificationdetail/notificationdetail.component';
import { RewardvoucherscanComponent } from './appinnerlayout/shop/rewardvoucherscan/rewardvoucherscan.component';
import { PrizevoucherscanComponent } from './appinnerlayout/shop/prizevoucherscan/prizevoucherscan.component';
import { EventmanagementComponent } from './appinnerlayout/shop/eventmanagement/eventmanagement.component';
import { EventbookingdetailComponent } from './appinnerlayout/shop/eventbookingdetail/eventbookingdetail.component';
import { ForceoutletsettingsComponent } from './authlayout/forceoutletsettings/forceoutletsettings.component';
import { AddfirstoutletComponent } from './appinnerlayout/shop/addfirstoutlet/addfirstoutlet.component';
import { ModalModule } from "ng2-modal-module";

//scanner




FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

@NgModule({
  declarations: [
    
    AppComponent,
  
    AuthlayoutComponent,
    ApphomelayoutComponent,
    AppinnerlayoutComponent,
    LandingComponent,
    SigninComponent,
    ForceoutletsettingsComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    VerifyComponent,
    voucheraddComponent,
    StaticfooterComponent,
    HeadermenuComponent,
    SidebarComponent,
    HomeComponent,
    StatsComponent,
    AreachartComponent,
    Smallareachart1Component,
    Smallareachart2Component,
    BarchartComponent,
    PinnedComponent,
    ProfileComponent,
    StyleComponent,
    FooterinfoComponent,
    HeaderbackComponent,
    voucherComponent,
    ProductComponent,
    VoucherdetailComponent,
    PaymentComponent,
    bookingComponent,
    OrderdetailComponent,
    ShopvoucheraddComponent,
    AddressesComponent,
    AddaddressesComponent,
    TodohomeComponent,
    TaskcalendarComponent,
    TodaystaskComponent,
    EventsComponent,
    EventdetailsComponent,
    ChatlistComponent,
    MessagesComponent,
    NotificationsComponent,
    PagesComponent,
    SettingsComponent,
    FaqsComponent,
    TimelineComponent,
    UserlistComponent,
    redemptionComponent,
    PricingComponent,
    TermsandcoditionComponent,
    PagenotfoundComponent,
    InvoiceComponent,
    BookseemoreComponent,
    MemberdataComponent,
    MemberlistComponent,
    ReportComponent,
    ThankyouComponent,
    BankComponent,
    CardComponent,
    NotifyComponent,
    CartComponent,
    EditprodComponent,
    SafeHtmlPipe,
    FilterPipe,
    FaqPipe,
    BookeventComponent,
    EventlistComponent,
    BookingvenuelistComponent,
    FiltervenuePipe,
    FiltereventPipe,
    FilteroutletPipe,
    FilterprodPipe,
    VdetailComponent,
   FiltermemberPipe,
   EditeventComponent,
   OutletsettingsComponent,
   BookingsettingsComponent,
   OutletlistComponent,
   EditoutletComponent,
   VredempComponent,
   ScannerComponent,
   ScanComponent,
   ReviewComponent,
   OutletdetailComponent,
   EnterotpComponent,
   MyaccountComponent,
   EditmyaccountComponent,
   ProfilescanComponent,
   ShownotificationComponent,
   RewardscanComponent,
   AboutusComponent,
   NotificationdetailComponent,
   RewardvoucherscanComponent,
   PrizevoucherscanComponent,
   EventmanagementComponent,
   EventbookingdetailComponent,
   ForceoutletsettingsComponent,
   AddfirstoutletComponent,

  
   
    
  ],
  imports: [
    ModalModule,
    CdkAccordionModule,
    EditorModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    ChartsModule,
    NgCircleProgressModule.forRoot(),
    NouisliderModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    ZXingScannerModule,
    MatDialogModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNL3fRo_9b7yCIEkc0IRQHbvisa0EL6u8',
      libraries: ['places']
      })
    
   


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
