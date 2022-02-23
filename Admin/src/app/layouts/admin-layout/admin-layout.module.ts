import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
// import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ReportingComponent } from "../../pages/reporting/reporting.component";
import { AddNewsComponent } from "../../pages/addNews/addNews.component";//testaddnews
// import { NewsManagementComponent } from "../../pages/newsManagement/newsManagement.component";//testaddnews
// import { MemberAccountManagementComponent } from "../../pages/MemberAccountManagement/MemberAccountManagement.component";//testaddnews
// import { RedemptionComponent } from "../../pages/redemption/redemption.component";//testaddnews
// import { RedemptionMemberComponent } from "../../pages/redemptionMember/redemptionMember.component";//testaddnews

import { AdminProfileComponent } from "src/app/pages/adminProfile/adminProfile.component";
import { EditProfileComponent } from "src/app/pages/editProfile/editProfile.component";
// import { AdvertisementComponent } from "src/app/pages/advertisement/advertisement.component";
import { AddAdvComponent } from "src/app/pages/addAdv/addAdv.component";
// import { MemberDataComponent } from "../../pages/memberData/memberData.component";
import { ViewMemberComponent } from "src/app/pages/viewMember/viewMember.component";
//import { MemberRecordComponent } from "src/app/pages/memberRecord/memberRecord.component";
import { AddRwdComponent } from "../../pages/addRwd/addRwd.component";
import { EditRwdComponent } from "src/app/pages/editRwd/editRwd.component";
import { AddVchComponent } from "src/app/pages/addVch/addVch.component";
import { EditVchComponent } from "src/app/pages/editVch/editVch.component";
// import { GamificationComponent } from "../../pages/gamification/gamification.component";
// import { GameSettingComponent } from "../../pages/gameSetting/gameSetting.component";
import { AddGameComponent } from "src/app/pages/addGame/addGame.component";
import { AddSettingComponent } from "src/app/pages/addSetting/addSetting.component";
import { EditSettingComponent } from "src/app/pages/editSetting/editSetting.component";
import { EditGamevchComponent } from "src/app/pages/editGamevch/editGamevch.component";
import { EditadsComponent } from "src/app/pages/editads/editads.component";
// import { GsContactInfoComponent } from "src/app/pages/gsContactInfo/gsContactInfo.component";
// import { GsAboutUsComponent } from "src/app/pages/gsAboutUs/gsAboutUs.component";
//import { GsFAQComponent } from "src/app/pages/gsFAQ/gsFAQ.component";
import { AddFAQComponent } from "src/app/pages/addFAQ/addFAQ.component";
import { EditFAQComponent } from "src/app/pages/editFAQ/editFAQ.component";
import { AddmcFAQComponent } from "src/app/pages/addmcFAQ/addmcFAQ.component";
import { EditmcFAQComponent } from "src/app/pages/editmcFAQ/editmcFAQ.component";
// import { BookingListComponent } from "src/app/pages/bookingList/bookingList.component";
// import { AdminUserComponent } from "src/app/pages/adminUser/adminUser.component";
// import { MerchantComponent } from "src/app/pages/merchant/merchant.component";
// import { MembertransactcollectComponent } from "src/app/pages/membertransactcollect/membertransactcollect.component";
import { AddAdminComponent } from "src/app/pages/addAdmin/addAdmin.component";
import { AddMerchantComponent } from "src/app/pages/addMerchant/addMerchant.component";
import { EditNewsComponent } from "src/app/pages/editNews/editNews.component";
import { EditMemberComponent } from "src/app/pages/editMember/editMember.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "src/app/pages/login/login.component";
import { ResetpwdComponent } from "src/app/pages/resetpwd/resetpwd.component";
import { EnterotpComponent } from "src/app/pages/enterotp/enterotp.component";
import { EnterpwdComponent } from "src/app/pages/enterpwd/enterpwd.component";

import { EditRwdVchComponent } from "src/app/pages/editRwdVch/editRwdVch.component";
// import { OthersettingComponent } from "src/app/pages/othersetting/othersetting.component";
import { UserroleComponent } from "src/app/pages/userrole/userrole.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    // DashboardComponent,
    ReportingComponent,
    // MemberAccountManagementComponent,
    // RedemptionComponent,
    // RedemptionMemberComponent,
    AddNewsComponent,
    // NewsManagementComponent,
    EditRwdVchComponent,
    AdminProfileComponent,
    EditProfileComponent,
    // AdvertisementComponent,
    AddAdvComponent,
    // MemberDataComponent,
    ViewMemberComponent,
    //MemberRecordComponent,
    AddRwdComponent,
    EditRwdComponent,
    AddVchComponent,
    EditVchComponent,
    EditadsComponent,
    // GamificationComponent,
    // GameSettingComponent,
    AddGameComponent,
    AddSettingComponent,
    EditSettingComponent,
    EditGamevchComponent,

    // GsContactInfoComponent,
    // GsAboutUsComponent,
    //GsFAQComponent,
    AddFAQComponent,
    EditFAQComponent,
    AddmcFAQComponent,
    EditmcFAQComponent,
    // BookingListComponent,
    // AdminUserComponent,
    // MerchantComponent,

    AddAdminComponent,
    AddMerchantComponent,
    EditNewsComponent,
    EditMemberComponent,

    // MembertransactcollectComponent,

    // OthersettingComponent,

    LoginComponent,
    ResetpwdComponent,
    EnterotpComponent,
    EnterpwdComponent,

    UserroleComponent,
  ]
})
export class AdminLayoutModule {}
