import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule} from 'ng-circle-progress';
import { NouisliderModule } from 'ng2-nouislider';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgmCoreModule } from '@agm/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { CommonModule } from "@angular/common";

import { from } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { ApphomelayoutComponent } from './apphomelayout/apphomelayout.component';
import { AppinnerlayoutComponent } from './appinnerlayout/appinnerlayout.component';
import { LandingComponent } from './authlayout/landing/landing.component';
// import { SigninComponent } from './authlayout/signin/signin.component';
// import { SignupComponent } from './authlayout/signup/signup.component';
import { ForgetpasswordComponent } from './authlayout/forgetpassword/forgetpassword.component';
// import { ResetpasswordComponent } from './authlayout/resetpassword/resetpassword.component';
import { VerifyComponent } from './authlayout/verify/verify.component';
// import { ThankyouComponent } from './authlayout/thankyou/thankyou.component';
// import { ShopThankyouComponent } from './appinnerlayout/shop/thankyou/thankyou.component';
import { StaticfooterComponent } from './apphomelayout/partials/staticfooter/staticfooter.component';
import { HeadermenuComponent } from './apphomelayout/partials/headermenu/headermenu.component';
import { SidebarComponent } from './apphomelayout/partials/sidebar/sidebar.component';
import { HomeComponent } from './apphomelayout/home/home.component';
import { StatsComponent } from './apphomelayout/stats/stats.component';
import { AreachartComponent } from './apphomelayout/home/areachart/areachart.component';
import { Smallareachart1Component } from './apphomelayout/home/smallareachart1/smallareachart1.component';
import { Smallareachart2Component } from './apphomelayout/home/smallareachart2/smallareachart2.component';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BarchartComponent } from './apphomelayout/stats/barchart/barchart.component';
import { PinnedComponent } from './apphomelayout/pinned/pinned.component';
import { ProfileComponent } from './apphomelayout/profile/profile.component';
import { StyleComponent } from './apphomelayout/style/style.component';
import { FooterinfoComponent } from './appinnerlayout/partials/footerinfo/footerinfo.component';
import { HeaderbackComponent } from './appinnerlayout/partials/headerback/headerback.component';
// import { ShophomeComponent } from './appinnerlayout/shop/shophome/shophome.component';
// import { ProductComponent } from './appinnerlayout/shop/product/product.component';
// import { CartComponent } from './appinnerlayout/shop/cart/cart.component';
// import { PaymentComponent } from './appinnerlayout/shop/payment/payment.component';
// import { MyordersComponent } from './appinnerlayout/shop/myorders/myorders.component';
// import { OrderdetailComponent } from './appinnerlayout/shop/orderdetail/orderdetail.component';
// import { AddressesComponent } from './appinnerlayout/shop/addresses/addresses.component';
// import { AddaddressesComponent } from './appinnerlayout/shop/addaddresses/addaddresses.component';
// import { TodohomeComponent } from './appinnerlayout/todo/todohome/todohome.component';
// import { TaskcalendarComponent } from './appinnerlayout/todo/taskcalendar/taskcalendar.component';
// import { TodaystaskComponent } from './appinnerlayout/todo/todaystask/todaystask.component';
// import { EventsComponent } from './appinnerlayout/todo/events/events.component';
// import { EventdetailsComponent } from './appinnerlayout/todo/eventdetails/eventdetails.component';
// import { ChatlistComponent } from './appinnerlayout/chatlist/chatlist.component';
// import { MessagesComponent } from './appinnerlayout/messages/messages.component';
// import { NotificationsComponent } from './appinnerlayout/notifications/notifications.component';
// import { PagesComponent } from './appinnerlayout/pages/pages.component';
// import { SettingsComponent } from './appinnerlayout/settings/settings.component';
import { FaqsComponent } from './appinnerlayout/faqs/faqs.component';
// import { TimelineComponent } from './appinnerlayout/timeline/timeline.component';
// import { UserlistComponent } from './appinnerlayout/userlist/userlist.component';
// import { ContactusComponent } from './appinnerlayout/contactus/contactus.component';
// import { PricingComponent } from './appinnerlayout/pricing/pricing.component';
// import { TermsandcoditionComponent } from './appinnerlayout/termsandcodition/termsandcodition.component';
// import { PagenotfoundComponent } from './appinnerlayout/pagenotfound/pagenotfound.component';
// import { InvoiceComponent } from './appinnerlayout/shop/invoice/invoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
// import { AdvertisementComponent } from './appinnerlayout/shop/advertisement/advertisement.component';
import { ForgotpasswordComponent } from './authlayout/forgotpassword/forgotpassword.component';
import { ResetpwComponent } from './authlayout/resetpw/resetpw.component';
import { LoginComponent } from './authlayout/login/login.component';
import { RegisterComponent } from './authlayout/register/register.component';
import { GetstartedComponent } from './authlayout/getstarted/getstarted.component';
import { LocatestorehomeComponent } from './appinnerlayout/locatestorehome/locatestorehome.component';
// import { LocatestorelistComponent } from './appinnerlayout/locatestorelist/locatestorelist.component';
import { LocatestoredetailsComponent } from './appinnerlayout/locatestoredetails/locatestoredetails.component';
import { OnlinestorehomeComponent } from './appinnerlayout/onlinestorehome/onlinestorehome.component';
import { OnlinestoredetailsComponent } from './appinnerlayout/onlinestoredetails/onlinestoredetails.component';
import { BookingvenuehomeComponent } from './appinnerlayout/bookingvenuehome/bookingvenuehome.component';
import { BookingvenuelistComponent } from './appinnerlayout/bookingvenuelist/bookingvenuelist.component';
import { BookingvenuedetailsComponent } from './appinnerlayout/bookingvenuedetails/bookingvenuedetails.component';
// import { BookingformdateComponent } from './appinnerlayout/bookingformdate/bookingformdate.component';
// import { BookingforminfoComponent } from './appinnerlayout/bookingforminfo/bookingforminfo.component';
// import { BookingformstatusComponent } from './appinnerlayout/bookingformstatus/bookingformstatus.component';
import { BookingeventhomeComponent } from './appinnerlayout/bookingeventhome/bookingeventhome.component';
import { BookingeventdetailsComponent } from './appinnerlayout/bookingeventdetails/bookingeventdetails.component';
import { BookingeventpaymentComponent } from './appinnerlayout/bookingeventpayment/bookingeventpayment.component';
// import { Bookingeventpayment2Component } from './appinnerlayout/bookingeventpayment2/bookingeventpayment2.component';
// import { Bookingeventpayment3Component } from './appinnerlayout/bookingeventpayment3/bookingeventpayment3.component';
// import { BookingeventstatusComponent } from './appinnerlayout/bookingeventstatus/bookingeventstatus.component';
// import { BookingtransactionComponent } from './appinnerlayout/bookingtransaction/bookingtransaction.component';
// import { VoucherhomeComponent } from './appinnerlayout/voucherhome/voucherhome.component';
import { VoucherdetailsComponent } from './appinnerlayout/voucherdetails/voucherdetails.component';
// import { TieredloyaltyprogramComponent } from './appinnerlayout/tieredloyaltyprogram/tieredloyaltyprogram.component';
import { EarnmorepointsComponent } from './appinnerlayout/earnmorepoints/earnmorepoints.component';
import { BookingeventformComponent } from './appinnerlayout/bookingeventform/bookingeventform.component';
// import { BirthdayrewardshomeComponent } from './appinnerlayout/birthdayrewardshome/birthdayrewardshome.component';
// import { BirthdayreminderComponent } from './appinnerlayout/birthdayreminder/birthdayreminder.component';
import { ReferralrewardshomeComponent } from './appinnerlayout/referralrewardshome/referralrewardshome.component';
// import { ReferralrewardstatusComponent } from './appinnerlayout/referralrewardstatus/referralrewardstatus.component';
// import { RedemptiontransactionComponent } from './appinnerlayout/redemptiontransaction/redemptiontransaction.component';
// import { CollectedtransactionComponent } from './appinnerlayout/collectedtransaction/collectedtransaction.component';
import { PointredemptionhomeComponent } from './appinnerlayout/pointredemptionhome/pointredemptionhome.component';
import { RedemptiondetailsComponent } from './appinnerlayout/redemptiondetails/redemptiondetails.component';
import { GamificationhomeComponent } from './appinnerlayout/gamificationhome/gamificationhome.component';
import { GamificationprizehistoryComponent } from './appinnerlayout/gamificationprizehistory/gamificationprizehistory.component';
import { MyaccountComponent } from './appinnerlayout/myaccount/myaccount.component';
import { VerificationComponent } from './authlayout/verification/verification.component';
import { BookinghistoryComponent } from './appinnerlayout/bookinghistory/bookinghistory.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import { BookingvenueformComponent } from './appinnerlayout/bookingvenueform/bookingvenueform.component';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import { BookinghistorydetailsComponent } from './appinnerlayout/bookinghistorydetails/bookinghistorydetails.component';
import { BookingeventhistorydetailsComponent } from './appinnerlayout/bookingeventhistorydetails/bookingeventhistorydetails.component';
import { VenuecommentComponent } from './appinnerlayout/venuecomment/venuecomment.component';
import { VenuereviewComponent } from './appinnerlayout/venuereview/venuereview.component';
import { StorecommentComponent } from './appinnerlayout/storecomment/storecomment.component';
import { StorereviewComponent } from './appinnerlayout/storereview/storereview.component';
// import { MapsdialogComponent } from './appinnerlayout/mapsdialog/mapsdialog.component';
// import { BirthdayrewardsdetailsComponent } from './appinnerlayout/birthdayrewardsdetails/birthdayrewardsdetails.component';
import { PointstransactionComponent } from './appinnerlayout/pointstransaction/pointstransaction.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { EarnpointsdetailsComponent } from './appinnerlayout/earnpointsdetails/earnpointsdetails.component';
import { VenuecontactdialogComponent } from './appinnerlayout/venuecontactdialog/venuecontactdialog.component';
import { NotificationComponent } from './appinnerlayout/notification/notification.component';
// import { SpinpageComponent } from './appinnerlayout/spinpage/spinpage.component';
import { HttpClientModule } from '@angular/common/http';
// import { EditorModule } from '@tinymce/tinymce-angular';
import { QRCodeModule } from 'angular2-qrcode';
import { FilterPipe } from './appinnerlayout/Pipes/filter.pipe';
import { GiftPipe } from './appinnerlayout/Pipes/gift.pipe';
import { MenuPipe } from './appinnerlayout/Pipes/menu.pipe';
import { VoucherpendingdetailsComponent } from './appinnerlayout/voucherpendingdetails/voucherpendingdetails.component';
import { VoucherredeemeddetailsComponent } from './appinnerlayout/voucherredeemeddetails/voucherredeemeddetails.component';
// import { BirthdayrewardsredeemeddetailsComponent } from './appinnerlayout/birthdayrewardsredeemeddetails/birthdayrewardsredeemeddetails.component';
import { EditprofileComponent } from './appinnerlayout/editprofile/editprofile.component';
import { VenuecanceldetailsComponent } from './appinnerlayout/venuecanceldetails/venuecanceldetails.component';
import { RedemptionpendingComponent } from './appinnerlayout/redemptionpending/redemptionpending.component';
import { RedemptionredeemedComponent } from './appinnerlayout/redemptionredeemed/redemptionredeemed.component';
import { RedemptionPipe } from './appinnerlayout/Pipes/redemption.pipe';
import { AdvertisementdetailsComponent } from './appinnerlayout/advertisementdetails/advertisementdetails.component';
import { NotificationdetailsComponent } from './appinnerlayout/notificationdetails/notificationdetails.component';
import { ProfileqrComponent } from './appinnerlayout/profileqr/profileqr.component';
import { TransactionPipe } from './appinnerlayout/Pipes/transaction.pipe';
import { StorePipe } from './appinnerlayout/Pipes/store.pipe';
// import { SpinwheelComponent } from './spinwheel/spinwheel.component';
// import { FaqComponent } from './appinnerlayout/faq/faq.component';
import { EnterotpComponent } from './authlayout/enterotp/enterotp.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxWheelModule } from 'ngx-wheel'; 
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { MyvoucherComponent } from './appinnerlayout/myvoucher/myvoucher.component';
import { EarnpointsclaimedComponent } from './appinnerlayout/earnpointsclaimed/earnpointsclaimed.component';
import { RewardsvoucherdetailsComponent } from './appinnerlayout/rewardsvoucherdetails/rewardsvoucherdetails.component';
import { RewardvoucherclaimedComponent } from './appinnerlayout/rewardvoucherclaimed/rewardvoucherclaimed.component';
import { VoucherlistComponent } from './appinnerlayout/voucherlist/voucherlist.component';
import { UpvoucherdetailsComponent } from './appinnerlayout/upvoucherdetails/upvoucherdetails.component';
import { UpredeemdetailsComponent } from './appinnerlayout/upredeemdetails/upredeemdetails.component';
import { AboutusComponent } from './appinnerlayout/aboutus/aboutus.component';
import { FaqPipe } from './appinnerlayout/Pipe/faq.pipe';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { LogoutdialogComponent } from './appinnerlayout/logoutdialog/logoutdialog.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
// import { PrizeptsqrComponent } from './appinnerlayout/prizeptsqr/prizeptsqr.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { PrizevoucherqrComponent } from './appinnerlayout/prizevoucherqr/prizevoucherqr.component';
import { EventPipe } from './appinnerlayout/Pipes/event.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthlayoutComponent,
    ApphomelayoutComponent,
    AppinnerlayoutComponent,
    LandingComponent,
    // SigninComponent,
    // SignupComponent,
    ForgetpasswordComponent,
    // ResetpasswordComponent,
    VerifyComponent,
    // ThankyouComponent,
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
    // ShophomeComponent,
    // ProductComponent,
    // CartComponent,
    // PaymentComponent,
    // MyordersComponent,
    // OrderdetailComponent,
    // ShopThankyouComponent,
    // AddressesComponent,
    // AddaddressesComponent,
    // TodohomeComponent,
    // TaskcalendarComponent,
    // TodaystaskComponent,
    // EventsComponent,
    // EventdetailsComponent,
    // ChatlistComponent,
    // MessagesComponent,
    // NotificationsComponent,
    // PagesComponent,
    // SettingsComponent,
    FaqsComponent,
    // TimelineComponent,
    // UserlistComponent,
    // ContactusComponent,
    // PricingComponent,
    // TermsandcoditionComponent,
    // PagenotfoundComponent,
    // InvoiceComponent,
    // AdvertisementComponent,
    ForgotpasswordComponent,
    ResetpwComponent,
    LoginComponent,
    RegisterComponent,
    GetstartedComponent,
    LocatestorehomeComponent,
    // LocatestorelistComponent,
    LocatestoredetailsComponent,
    OnlinestorehomeComponent,
    OnlinestoredetailsComponent,
    BookingvenuehomeComponent,
    BookingvenuelistComponent,
    BookingvenuedetailsComponent,
    // BookingformdateComponent,
    // BookingforminfoComponent,
    // BookingformstatusComponent,
    BookingeventhomeComponent,
    BookingeventdetailsComponent,
    BookingeventpaymentComponent,
    // Bookingeventpayment2Component,
    // Bookingeventpayment3Component,
    // BookingeventstatusComponent,
    // BookingtransactionComponent,
    // VoucherhomeComponent,
    VoucherdetailsComponent,
    // TieredloyaltyprogramComponent,
    EarnmorepointsComponent,
    BookingeventformComponent,
    // BirthdayrewardshomeComponent,
    // BirthdayreminderComponent,
    ReferralrewardshomeComponent,
    // ReferralrewardstatusComponent,
    // RedemptiontransactionComponent,
    // CollectedtransactionComponent,
    PointredemptionhomeComponent,
    RedemptiondetailsComponent,
    GamificationhomeComponent,
    GamificationprizehistoryComponent,
    MyaccountComponent,
    VerificationComponent,
    BookinghistoryComponent,
    BookingvenueformComponent,
    BookinghistorydetailsComponent,
    BookingeventhistorydetailsComponent,
    VenuecommentComponent,
    VenuereviewComponent,
    StorecommentComponent,
    StorereviewComponent,
    // MapsdialogComponent,
    // BirthdayrewardsdetailsComponent,
    PointstransactionComponent,
    EarnpointsdetailsComponent,
    VenuecontactdialogComponent,
    NotificationComponent,
    // SpinpageComponent,
    FilterPipe,
    GiftPipe,
    MenuPipe,
    VoucherpendingdetailsComponent,
    VoucherredeemeddetailsComponent,
    // BirthdayrewardsredeemeddetailsComponent,
    EditprofileComponent,
    VenuecanceldetailsComponent,
    RedemptionpendingComponent,
    RedemptionredeemedComponent,
    RedemptionPipe,
    AdvertisementdetailsComponent,
    NotificationdetailsComponent,
    ProfileqrComponent,
    TransactionPipe,
    StorePipe,
    // SpinwheelComponent,
    // FaqComponent,
    EnterotpComponent,
    MyvoucherComponent,
    EarnpointsclaimedComponent,
    RewardsvoucherdetailsComponent,
    RewardvoucherclaimedComponent,
    VoucherlistComponent,
    UpvoucherdetailsComponent,
    UpredeemdetailsComponent,
    AboutusComponent,
    FaqPipe,
    LogoutdialogComponent,
    // PrizeptsqrComponent,
    PrizevoucherqrComponent,
    EventPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    ChartsModule,
    NgCircleProgressModule.forRoot(),
    NouisliderModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
    // EditorModule,
    QRCodeModule,
    NgxWheelModule,
    RoundProgressModule,
    CdkAccordionModule,
    CommonModule,
    NgxQRCodeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNL3fRo_9b7yCIEkc0IRQHbvisa0EL6u8',
      libraries: ['places']
    }),
    NgxMaskModule.forRoot(),
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
