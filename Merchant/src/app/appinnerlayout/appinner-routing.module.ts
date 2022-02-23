import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppinnerlayoutComponent } from './appinnerlayout.component';
import { voucherComponent } from './shop/voucher/voucher.component';
import { ProductComponent } from './shop/product/product.component';
import { VoucherdetailComponent } from './shop/voucherdetail/voucherdetail.component';
import { PaymentComponent } from './shop/payment/payment.component';
import { bookingComponent } from './shop/booking/booking.component';
import { OrderdetailComponent } from './shop/orderdetail/orderdetail.component';
import { ShopvoucheraddComponent } from './shop/voucheradd/voucheradd.component';
import { AddaddressesComponent } from './shop/addaddresses/addaddresses.component';
import { AddressesComponent } from './shop/addresses/addresses.component';
import { TodohomeComponent } from './todo/todohome/todohome.component';
import { TaskcalendarComponent } from './todo/taskcalendar/taskcalendar.component';
import { TodaystaskComponent } from './todo/todaystask/todaystask.component';
import { EventsComponent } from './todo/events/events.component';
import { EventdetailsComponent } from './todo/eventdetails/eventdetails.component';
import { PagesComponent } from './pages/pages.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FaqsComponent } from './faqs/faqs.component';
import { UserlistComponent } from './userlist/userlist.component';
import { TimelineComponent } from './timeline/timeline.component';
import { redemptionComponent } from './redemption/redemption.component';
import { PricingComponent } from './pricing/pricing.component';
import { TermsandcoditionComponent } from './termsandcodition/termsandcodition.component';
import { InvoiceComponent } from './shop/invoice/invoice.component';
import { BookseemoreComponent } from './shop/bookseemore/bookseemore.component';
import { MemberdataComponent } from './shop/memberdata/memberdata.component';
import { MemberlistComponent } from './shop/memberlist/memberlist.component';
import { ReportComponent } from './shop/report/report.component';
import { ThankyouComponent } from './shop/thankyou/thankyou.component';
import { NotifyComponent } from './shop/notify/notify.component';
import { BankComponent } from './shop/bank/bank.component';
import {CartComponent } from './shop/cart/cart.component';
import {EditprodComponent } from './shop/editprod/editprod.component';

import {BookeventComponent } from './shop/bookevent/bookevent.component';
import {EventlistComponent } from './shop/eventlist/eventlist.component';
import {BookingvenuelistComponent } from './shop/bookingvenuelist/bookingvenuelist.component';
import {EditeventComponent } from './shop/editevent/editevent.component';
import {OutletsettingsComponent } from './shop/outletsettings/outletsettings.component';
import {BookingsettingsComponent } from './shop/bookingsettings/bookingsettings.component';
import {OutletlistComponent } from './shop/outletlist/outletlist.component';
import {EditoutletComponent } from './shop/editoutlet/editoutlet.component';
import { VdetailComponent } from './shop/vdetail/vdetail.component';
import { VredempComponent } from './shop/vredemp/vredemp.component';
import { ScannerComponent } from './shop/scanner/scanner.component';
import { ScanComponent } from './shop/scan/scan.component';
import { ReviewComponent } from './shop/review/review.component';
import { OutletdetailComponent } from './shop/outletdetail/outletdetail.component';
import { EnterotpComponent } from './shop/enterotp/enterotp.component';
import { MyaccountComponent } from './shop/myaccount/myaccount.component';
import { EditmyaccountComponent } from './shop/editmyaccount/editmyaccount.component';
import { ProfilescanComponent } from './shop/profilescan/profilescan.component';
import { ShownotificationComponent } from './shop/shownotification/shownotification.component';
import { RewardscanComponent } from './shop/rewardscan/rewardscan.component';
import { AboutusComponent } from './shop/aboutus/aboutus.component';
import { NotificationdetailComponent } from './shop/notificationdetail/notificationdetail.component';
import { RewardvoucherscanComponent } from './shop/rewardvoucherscan/rewardvoucherscan.component';
import { PrizevoucherscanComponent } from './shop/prizevoucherscan/prizevoucherscan.component';
import { EventmanagementComponent } from './shop/eventmanagement/eventmanagement.component';
import { EventbookingdetailComponent } from './shop/eventbookingdetail/eventbookingdetail.component';
import {AddfirstoutletComponent } from './shop/addfirstoutlet/addfirstoutlet.component';
import { ProfileComponent } from '../apphomelayout/profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: AppinnerlayoutComponent,

    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      // Shopping pages 
      {
        path: 'voucher',
        component: voucherComponent,
      },
      {
        path: 'addfirstoutlet',
        component: AddfirstoutletComponent,
      },
      {
        path: 'eventbookingdetail',
        component: EventbookingdetailComponent,
      },
      {
        path: 'eventmanagement',
        component: EventmanagementComponent,
      },
      {
        path: 'rewardvoucherscan',
        component: RewardvoucherscanComponent,
      },  
      {
        path: 'prizevoucherscan',
        component: PrizevoucherscanComponent,
      },

      {
        path: 'notificationdetail',
        component: NotificationdetailComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
      },
   
      {
        path: 'rewardscan',
        component: RewardscanComponent,
      },
      {
        path: 'shownotification',
        component: ShownotificationComponent,
      },
      {
        path: 'profilescan',
        component: ProfilescanComponent,
      },
      {
        path: 'editmyaccount',
        component: EditmyaccountComponent,
      },
      {
        path: 'myaccount',
        component: MyaccountComponent,
      },
      {
        path: 'enterotp',
        component: EnterotpComponent,
      },
      {
        path: 'outletdetail',
        component: OutletdetailComponent,
      },
      {
        path: 'scanner',
        component: ScannerComponent,
      },
      {
        path: 'scan',
        component: ScanComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: 'vredemp',
        component: VredempComponent,
      },
      {
        path: 'outletlist',
        component: OutletlistComponent,
      },
      {
        path: 'editoutlet',
        component: EditoutletComponent,
      },
      {
        path: 'bookingsettings',
        component: BookingsettingsComponent,
      },
      {
        path: 'outletsettings',
        component: OutletsettingsComponent,
      },
      {
        path: 'editevent',
        component: EditeventComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'editprod',
        component: EditprodComponent,
      },
      {
        path: 'vdetail',
        component: VdetailComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'memberdata',
        component: MemberdataComponent,
      },

      {
        path: 'voucherdetail',
        component: VoucherdetailComponent,
      },
      {
        path: 'bank',
        component: BankComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'booking',
        component: bookingComponent,
      },
      {
        path: 'bookingvenuelist',
        component: BookingvenuelistComponent,
      },
      {
        path: 'bookevent',
        component: BookeventComponent,
      },

      {
        path: 'eventlist',
        component: EventlistComponent,
      },
     
      {
        path: 'notify',
        component: NotifyComponent,
      },
      {
        path: 'orderdetail',
        component: OrderdetailComponent,
      },      
      {
        path: 'shopvoucheradd',
        component: ShopvoucheraddComponent,
      },
      {
        path: 'addresses',
        component: AddressesComponent,
      },
      {
        path: 'addaddresses',
        component: AddaddressesComponent,
      },      
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'bookseemore',
        component: BookseemoreComponent,
      },
      // Todo App pages       
      {
        path: 'todohome',
        component: TodohomeComponent,
      },
      {
        path: 'taskcalendar',
        component: TaskcalendarComponent,
      },
      {
        path: 'thankyou',
        component: ThankyouComponent,
      },
      {
        path: 'todaystask',
        component: TodaystaskComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'eventdetails',
        component: EventdetailsComponent,
      },
      // Other pages      
      {
        path: 'chat',
        component: ChatlistComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'pages',
        component: PagesComponent,
      },
      {
        path: 'pagenotfound',
        component: PagenotfoundComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: 'userlist',
        component: UserlistComponent,
      },
      {
        path: 'timeline',
        component: TimelineComponent,
      },
      {
        path: 'redemption',
        component: redemptionComponent,
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: 'memberlist',
        component: MemberlistComponent,
      },
      {
        path: 'termsandconditions',
        component: TermsandcoditionComponent,
      }
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
