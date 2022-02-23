import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppinnerlayoutComponent } from './appinnerlayout.component';
// import { ShophomeComponent } from './shop/shophome/shophome.component';
// import { ProductComponent } from './shop/product/product.component';
// import { CartComponent } from './shop/cart/cart.component';
// import { PaymentComponent } from './shop/payment/payment.component';
// import { MyordersComponent } from './shop/myorders/myorders.component';
// import { OrderdetailComponent } from './shop/orderdetail/orderdetail.component';
// import { ShopThankyouComponent } from './shop/thankyou/thankyou.component';
// import { AddaddressesComponent } from './shop/addaddresses/addaddresses.component';
// import { AddressesComponent } from './shop/addresses/addresses.component';
// import { TodohomeComponent } from './todo/todohome/todohome.component';
// import { TaskcalendarComponent } from './todo/taskcalendar/taskcalendar.component';
// import { TodaystaskComponent } from './todo/todaystask/todaystask.component';
// import { EventsComponent } from './todo/events/events.component';
// import { EventdetailsComponent } from './todo/eventdetails/eventdetails.component';
// import { PagesComponent } from './pages/pages.component';
// import { SettingsComponent } from './settings/settings.component';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { MessagesComponent } from './messages/messages.component';
// import { ChatlistComponent } from './chatlist/chatlist.component';
// import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FaqsComponent } from './faqs/faqs.component';
// import { UserlistComponent } from './userlist/userlist.component';
// import { TimelineComponent } from './timeline/timeline.component';
// import { ContactusComponent } from './contactus/contactus.component';
// import { PricingComponent } from './pricing/pricing.component';
// import { TermsandcoditionComponent } from './termsandcodition/termsandcodition.component';
// import { InvoiceComponent } from './shop/invoice/invoice.component';
// import { AdvertisementComponent } from './shop/advertisement/advertisement.component';
import { LocatestorehomeComponent } from './locatestorehome/locatestorehome.component';
// import { LocatestorelistComponent } from './locatestorelist/locatestorelist.component';
import { LocatestoredetailsComponent } from './locatestoredetails/locatestoredetails.component';
import { OnlinestorehomeComponent } from './onlinestorehome/onlinestorehome.component';
import { OnlinestoredetailsComponent } from './onlinestoredetails/onlinestoredetails.component';
import { BookingvenuehomeComponent } from './bookingvenuehome/bookingvenuehome.component';
import { BookingvenuelistComponent } from './bookingvenuelist/bookingvenuelist.component';
import { BookingvenuedetailsComponent } from './bookingvenuedetails/bookingvenuedetails.component';
// import { BookingformdateComponent } from './bookingformdate/bookingformdate.component';
// import { BookingforminfoComponent } from './bookingforminfo/bookingforminfo.component';
// import { BookingformstatusComponent } from './bookingformstatus/bookingformstatus.component';
import { BookingeventhomeComponent } from './bookingeventhome/bookingeventhome.component';
import { BookingeventdetailsComponent } from './bookingeventdetails/bookingeventdetails.component';
import { BookingeventpaymentComponent } from './bookingeventpayment/bookingeventpayment.component';
// import { Bookingeventpayment2Component } from './bookingeventpayment2/bookingeventpayment2.component';
// import { Bookingeventpayment3Component } from './bookingeventpayment3/bookingeventpayment3.component';
// import { BookingeventstatusComponent } from './bookingeventstatus/bookingeventstatus.component';
// import { BookingtransactionComponent } from './bookingtransaction/bookingtransaction.component';
// import { VoucherhomeComponent } from './voucherhome/voucherhome.component';
import { VoucherdetailsComponent } from './voucherdetails/voucherdetails.component';
// import { TieredloyaltyprogramComponent } from './tieredloyaltyprogram/tieredloyaltyprogram.component';
import { EarnmorepointsComponent } from './earnmorepoints/earnmorepoints.component';
import { BookingeventformComponent } from './bookingeventform/bookingeventform.component';
// import { BirthdayrewardshomeComponent } from './birthdayrewardshome/birthdayrewardshome.component';
// import { BirthdayreminderComponent } from './birthdayreminder/birthdayreminder.component';
import { ReferralrewardshomeComponent } from './referralrewardshome/referralrewardshome.component';
// import { ReferralrewardstatusComponent } from './referralrewardstatus/referralrewardstatus.component';
// import { RedemptiontransactionComponent } from './redemptiontransaction/redemptiontransaction.component';
// import { CollectedtransactionComponent } from './collectedtransaction/collectedtransaction.component';
import { PointredemptionhomeComponent } from './pointredemptionhome/pointredemptionhome.component';
import { RedemptiondetailsComponent } from './redemptiondetails/redemptiondetails.component';
import { GamificationhomeComponent } from './gamificationhome/gamificationhome.component';
import { GamificationprizehistoryComponent } from './gamificationprizehistory/gamificationprizehistory.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { BookingvenueformComponent } from './bookingvenueform/bookingvenueform.component';
import { BookinghistorydetailsComponent } from './bookinghistorydetails/bookinghistorydetails.component';
import { BookingeventhistorydetailsComponent } from './bookingeventhistorydetails/bookingeventhistorydetails.component';
import { VenuecommentComponent } from './venuecomment/venuecomment.component';
import { VenuereviewComponent } from './venuereview/venuereview.component';
import { StorecommentComponent } from './storecomment/storecomment.component';
import { StorereviewComponent } from './storereview/storereview.component';
// import { MapsdialogComponent } from './mapsdialog/mapsdialog.component';
// import { BirthdayrewardsdetailsComponent } from './birthdayrewardsdetails/birthdayrewardsdetails.component';
import { PointstransactionComponent } from './pointstransaction/pointstransaction.component';
import { EarnpointsdetailsComponent } from './earnpointsdetails/earnpointsdetails.component';
import { VenuecontactdialogComponent } from './venuecontactdialog/venuecontactdialog.component';
import { NotificationComponent } from './notification/notification.component';
// import { SpinpageComponent } from './spinpage/spinpage.component';
import { VoucherpendingdetailsComponent } from './voucherpendingdetails/voucherpendingdetails.component';
import { VoucherredeemeddetailsComponent } from './voucherredeemeddetails/voucherredeemeddetails.component';
// import { BirthdayrewardsredeemeddetailsComponent } from './birthdayrewardsredeemeddetails/birthdayrewardsredeemeddetails.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { VenuecanceldetailsComponent } from './venuecanceldetails/venuecanceldetails.component';
import { RedemptionpendingComponent } from './redemptionpending/redemptionpending.component';
import { RedemptionredeemedComponent } from './redemptionredeemed/redemptionredeemed.component';
import { AdvertisementdetailsComponent } from './advertisementdetails/advertisementdetails.component';
import { NotificationdetailsComponent } from './notificationdetails/notificationdetails.component';
import { ProfileqrComponent } from './profileqr/profileqr.component';
// import { SpinwheelComponent } from '../spinwheel/spinwheel.component';
// import { FaqComponent } from './faq/faq.component';
import { MyvoucherComponent } from './myvoucher/myvoucher.component';
import { EarnpointsclaimedComponent } from './earnpointsclaimed/earnpointsclaimed.component';
import { RewardvoucherclaimedComponent } from './rewardvoucherclaimed/rewardvoucherclaimed.component';
import { RewardsvoucherdetailsComponent } from './rewardsvoucherdetails/rewardsvoucherdetails.component';
import { VoucherlistComponent } from './voucherlist/voucherlist.component';
import { UpvoucherdetailsComponent } from './upvoucherdetails/upvoucherdetails.component';
import { UpredeemdetailsComponent } from './upredeemdetails/upredeemdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { EventcontactdialogComponent } from './eventcontactdialog/eventcontactdialog.component';
import { LogoutdialogComponent } from './logoutdialog/logoutdialog.component';
// import { PrizeptsqrComponent } from './prizeptsqr/prizeptsqr.component';
import { PrizevoucherqrComponent } from './prizevoucherqr/prizevoucherqr.component';

const routes: Routes = [
  {
    path: '',
    component: AppinnerlayoutComponent,

    children: [

      //Notification
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'notificationdetails',
        component: NotificationdetailsComponent,
      },
      {
        path: 'advertisementdetails',
        component: AdvertisementdetailsComponent,
      },
      {
        path: 'profileqr',
        component: ProfileqrComponent,
      },

      //Store
      {
        path: 'locatestorehome',
        component: LocatestorehomeComponent,
      },
      // {
      //   path: 'locatestorelist',
      //   component: LocatestorelistComponent,
      // },
      {
        path: 'locatestoredetails',
        component: LocatestoredetailsComponent,
      },
      {
        path: 'onlinestorehome',
        component: OnlinestorehomeComponent,
      },
      {
        path: 'onlinestoredetails',
        component: OnlinestoredetailsComponent,
      },
      {
        path: 'storecomment',
        component: StorecommentComponent,
      },
      {
        path: 'storereview',
        component: StorereviewComponent,
      },
      // {
      //   path: 'mapsdialog',
      //   component: MapsdialogComponent,
      // },


      //Online Booking
      {
        path: 'bookinghistory',
        component: BookinghistoryComponent,        
      },
      {
        path: 'venuecanceldetails',
        component: VenuecanceldetailsComponent,        
      },
      {
        path: 'bookinghistorydetails',
        component: BookinghistorydetailsComponent,        
      },
      {
        path: 'bookingeventhistorydetails',
        component: BookingeventhistorydetailsComponent,        
      },
      //Venue
      {
        path: 'bookingvenuehome',
        component: BookingvenuehomeComponent,
      },
      {
        path: 'bookingvenuelist',
        component: BookingvenuelistComponent,
      },
      {
        path: 'bookingvenuedetails',
        component: BookingvenuedetailsComponent,
      },
      {
        path: 'bookingvenueform',
        component: BookingvenueformComponent,
      },
      // {
      //   path: 'bookingformdate',
      //   component: BookingformdateComponent,
      // },
      // {
      //   path: 'bookingforminfo',
      //   component: BookingforminfoComponent,
      // },
      // {
      //   path: 'bookingformstatus',
      //   component: BookingformstatusComponent,
      // },
      {
        path: 'venuecomment',
        component: VenuecommentComponent,
      },
      {
        path: 'venuereview',
        component: VenuereviewComponent,
      },
      {
        path: 'venuecontactdialog',
        component: VenuecontactdialogComponent,
      },
      //Event
      {
        path: 'bookingeventhome',
        component: BookingeventhomeComponent,
      },
      {
        path: 'bookingeventdetails',
        component: BookingeventdetailsComponent,
      },
      {
        path: 'bookingeventform',
        component: BookingeventformComponent,
      },
      {
        path: 'bookingeventpayment',
        component: BookingeventpaymentComponent,
      },
      // {
      //   path: 'bookingeventpayment2',
      //   component: Bookingeventpayment2Component,
      // },
      // {
      //   path: 'bookingeventpayment3',
      //   component: Bookingeventpayment3Component,
      // },
      // {
      //   path: 'bookingeventstatus',
      //   component: BookingeventstatusComponent,
      // },
      // //Transaction
      // {
      //   path: 'bookingtransaction',
      //   component: BookingtransactionComponent,
      // },

      //Rewards
      //Voucher
      {
        path: 'myvoucher',
        component: MyvoucherComponent,
      },
      // {
      //   path: 'voucherhome',
      //   component: VoucherhomeComponent,
      // },
      {
        path: 'voucherlist',
        component: VoucherlistComponent,
      },
      {
        path: 'voucherdetails',
        component: VoucherdetailsComponent,
      },
      {
        path: 'upvoucherdetails',
        component: UpvoucherdetailsComponent,
      },
      {
        path: 'upredeemdetails',
        component: UpredeemdetailsComponent,
      },
      {
        path: 'voucherpendingdetails',
        component: VoucherpendingdetailsComponent,
      },
      {
        path: 'voucherredeemeddetails',
        component: VoucherredeemeddetailsComponent,
      },
      {
        path: 'rewardvoucherclaimed',
        component:RewardvoucherclaimedComponent,
      },
      {
        path: 'rewardsvoucherdetails',
        component:RewardsvoucherdetailsComponent,
      },
      //tlp
      // {
      //   path: 'tieredloyaltyprogram',
      //   component: TieredloyaltyprogramComponent,
      // },
      //earnpoints
      {
        path: 'earnmorepoints',
        component: EarnmorepointsComponent,
      },
      {
        path: 'earnpointsdetails',
        component: EarnpointsdetailsComponent,
      },
      {
        path: 'earnpointsclaimed',
        component: EarnpointsclaimedComponent,
      },
      //birthday rewards
      // {
      //   path: 'birthdayrewardshome',
      //   component: BirthdayrewardshomeComponent,
      // },
      // {
      //   path: 'birthdayrewardsdetails',
      //   component: BirthdayrewardsdetailsComponent,
      // },
      // {
      //   path: 'birthdayrewardsredeemeddetails',
      //   component: BirthdayrewardsredeemeddetailsComponent,
      // },
      // {
      //   path: 'birthdayreminder',
      //   component: BirthdayreminderComponent,
      // },
      //referral rewards
      {
        path: 'referralrewardshome',
        component: ReferralrewardshomeComponent,
      },
      // {
      //   path: 'referralrewardstatus',
      //   component: ReferralrewardstatusComponent,
      // },

      //Points Transaction
      {
        path: 'pointstransaction',
        component: PointstransactionComponent,
      },
      //Redemption
      // {
      //   path: 'redemptiontransaction',
      //   component: RedemptiontransactionComponent,
      // },
      // {
      //   path: 'collectedtransaction',
      //   component: CollectedtransactionComponent,
      // },
      
      //point redemption program
      {
        path: 'pointredemptionhome',
        component: PointredemptionhomeComponent,
      },
      {
        path: 'redemptiondetails',
        component: RedemptiondetailsComponent,
      },
      {
        path: 'redemptionpending',
        component: RedemptionpendingComponent,
      },
      {
        path: 'redemptionredeemed',
        component: RedemptionredeemedComponent,
      },
      
      //Gamification Program
      // {
      //   path: 'spinpage',
      //   component: SpinpageComponent,
      // },
      {
        path: 'gamificationhome',
        component: GamificationhomeComponent,
      },
      {
        path: 'gamificationprizehistory',
        component: GamificationprizehistoryComponent,
      },
      // {
      //   path: 'spinwheel',
      //   component: SpinwheelComponent,
      // },
      // {
      //   path: 'prizeptsqr',
      //   component: PrizeptsqrComponent,
      // },
      {
        path: 'prizevoucherqr',
        component: PrizevoucherqrComponent,
      },
      
      //My Account
      {
        path: 'myaccount',
        component: MyaccountComponent,
      },
      {
        path: 'editprofile',
        component: EditprofileComponent,
      },

      //FAQ
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      //About Us
      {
        path: 'aboutus',
        component: AboutusComponent,
      },
      // {
      //   path: 'contactus',
      //   component: ContactusComponent,
      // },
      //Maps
      // {
      //   path: 'maps',
      //   component: NotificationsComponent,
      // },
      // {
      //   path: 'mapslocation',
      //   component: FaqComponent,
      // },
      {
        path: 'eventcontactdialog',
        component: EventcontactdialogComponent,
      },
      //Logout
      {
        path: 'logoutdialog',
        component: LogoutdialogComponent,
      },
      // Shopping pages 
      // {
      //   path: 'shophome',
      //   component: ShophomeComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: EarnpointsComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: PointredemptionprogramComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: VoucherlistComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: BirthdayrewardsComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: BirthdaypopupComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: ReferralrewardComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: TlpComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: FormbookeventComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: Bookingvenueform1Component,
      // },
      // {
      //   path: 'shophome',
      //   component: Bookingvenueform2Component,
      // },
      // {
      //   path: 'shophome',
      //   component: SearchvenueComponent,
      // },
      // {
      //   path: 'shophome',
      //   component: ListvenueComponent,
      // },
      // {
      //   path: 'product',
      //   component: ProductComponent,
      // },
      // {
      //   path: 'product',
      //   component: VoucherdetailsComponent,
      // },
      // {
      //   path: 'product',
      //   component: BookingeventlistComponent,
      // },
      // {
      //   path: 'product',
      //   component: BookvenuedetailsComponent,
      // },
      // {
      //   path: 'product',
      //   component: OnlinestoredetailsComponent,
      // },
      // {
      //   path: 'product',
      //   component: OnlinestorelistmenuComponent,
      // },
      // {
      //   path: 'cart',
      //   component: CartComponent,
      // },
      // {
      //   path: 'cart',
      //   component: BookingvenuestatusComponent,
      // },
      // {
      //   path: 'cart',
      //   component: BookingeventstatusComponent,
      // },
      // {
      //   path: 'payment',
      //   component: PaymentComponent,
      // },
      // {
      //   path: 'payment',
      //   component: AdvertisementComponent,
      // },
      // {
      //   path: 'payment',
      //   component: PointredemptiondetailsComponent,
      // },
      // {
      //   path: 'payment',
      //   component: PointredemptiontransactionComponent,
      // },
      // {
      //   path: 'payment',
      //   component: PointcollectedtransactionComponent,
      // },
      // {
      //   path: 'payment',
      //   component: SpinprizehistoryComponent,
      // },
      // {
      //   path: 'payment',
      //   component: BookinglisttransactionComponent,
      // },
      // {
      //   path: 'payment',
      //   component: SuccessfulreferralsentComponent,
      // },
      // {
      //   path: 'myorders',
      //   component: MyordersComponent,
      // },
      // {
      //   path: 'myorders',
      //   component: GamificationprogramComponent,
      // },
      // {
      //   path: 'orderdetail',
      //   component: OrderdetailComponent,
      // },      
      // {
      //   path: 'shopthankyou',
      //   component: ShopThankyouComponent,
      // },
      // {
      //   path: 'addresses',
      //   component: AddressesComponent,
      // },
      // {
      //   path: 'addaddresses',
      //   component: AddaddressesComponent,
      // },      
      // {
      //   path: 'invoice',
      //   component: InvoiceComponent,
      // },
      // Todo App pages       
      // {
      //   path: 'todohome',
      //   component: TodohomeComponent,
      // },
      // {
      //   path: 'taskcalendar',
      //   component: TaskcalendarComponent,
      // },
      // {
      //   path: 'todaystask',
      //   component: TodaystaskComponent,
      // },
      // {
      //   path: 'events',
      //   component: EventsComponent,
      // },
      // {
      //   path: 'eventdetails',
      //   component: EventdetailsComponent,
      // },
      // Other pages      
      // {
      //   path: 'chat',
      //   component: ChatlistComponent,
      // },
      // {
      //   path: 'messages',
      //   component: MessagesComponent,
      // },
      // {
      //   path: 'notifications',
      //   component: NotificationsComponent,
      // },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      // },
      // {
      //   path: 'pages',
      //   component: PagesComponent,
      // },
      // {
      //   path: 'pagenotfound',
      //   component: PagenotfoundComponent,
      // },
      // {
      //   path: 'faqs',
      //   component: FaqsComponent,
      // },
      // {
      //   path: 'userlist',
      //   component: UserlistComponent,
      // },
      // {
      //   path: 'timeline',
      //   component: TimelineComponent,
      // },
      // {
      //   path: 'contactus',
      //   component: ContactusComponent,
      // },
      // {
      //   path: 'pricing',
      //   component: PricingComponent,
      // },
      // {
      //   path: 'termsandconditions',
      //   component: TermsandcoditionComponent,
      // }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),    
  ],
  exports: [RouterModule]
})
export class AppinnerlayoutRoutingModule { }
