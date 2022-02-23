import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ReportingComponent } from "../../pages/reporting/reporting.component";
import { AddNewsComponent } from "../../pages/addNews/addNews.component";//testaddnews
import { NewsManagementComponent } from "../../pages/newsManagement/newsManagement.component";//testaddnews

import { MemberAccountManagementComponent } from "../../pages/MemberAccountManagement/MemberAccountManagement.component";//testaddnews
import { RedemptionComponent } from "../../pages/redemption/redemption.component";//testaddnews
import { RedemptionMemberComponent } from "../../pages/redemptionMember/redemptionMember.component";//testaddnews

import { AdminProfileComponent } from "src/app/pages/adminProfile/adminProfile.component";
import { EditProfileComponent } from "src/app/pages/editProfile/editProfile.component";
import { AdvertisementComponent } from "src/app/pages/advertisement/advertisement.component";
import { AddAdvComponent } from "src/app/pages/addAdv/addAdv.component";
import { MemberDataComponent } from "../../pages/memberData/memberData.component";
import { ViewMemberComponent } from "src/app/pages/viewMember/viewMember.component";
import { MemberRecordComponent } from "src/app/pages/memberRecord/memberRecord.component";

import { RewardsComponent } from "../../pages/rewards/rewards.component";
import { AddRwdComponent } from "../../pages/addRwd/addRwd.component";
import { EditRwdComponent } from "src/app/pages/editRwd/editRwd.component";
import { AddVchComponent } from "src/app/pages/addVch/addVch.component";
import { EditVchComponent } from "src/app/pages/editVch/editVch.component";
import { GamificationComponent } from "../../pages/gamification/gamification.component";
import { GameSettingComponent } from "src/app/pages/gameSetting/gameSetting.component";
import { AddGameComponent } from "src/app/pages/addGame/addGame.component";
import { AddSettingComponent } from "src/app/pages/addSetting/addSetting.component";
import { EditSettingComponent } from "src/app/pages/editSetting/editSetting.component";

import { GsContactInfoComponent } from "src/app/pages/gsContactInfo/gsContactInfo.component";
import { GsAboutUsComponent } from "src/app/pages/gsAboutUs/gsAboutUs.component";
import { GsFAQComponent } from "src/app/pages/gsFAQ/gsFAQ.component";
import { BookingListComponent } from "src/app/pages/bookingList/bookingList.component";
import { AdminUserComponent } from "src/app/pages/adminUser/adminUser.component";
import { MerchantComponent } from "src/app/pages/merchant/merchant.component";

import { OnlineStoreComponent } from "src/app/pages/onlineStore/onlineStore.component";

import { AddAdminComponent } from "src/app/pages/addAdmin/addAdmin.component";
import { AddMerchantComponent } from "src/app/pages/addMerchant/addMerchant.component";
import { EditNewsComponent } from "src/app/pages/editNews/editNews.component";
import { EditMemberComponent } from "src/app/pages/editMember/editMember.component";
import { MembertransactcollectComponent } from "src/app/pages/membertransactcollect/membertransactcollect.component";
import { OthersettingComponent } from "src/app/pages/othersetting/othersetting.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { ResetpwdComponent } from "src/app/pages/resetpwd/resetpwd.component";
import { EnterotpComponent } from "src/app/pages/enterotp/enterotp.component";
import { EnterpwdComponent } from "src/app/pages/enterpwd/enterpwd.component";
import { AddFAQComponent } from "src/app/pages/addFAQ/addFAQ.component";
import { EditFAQComponent } from "src/app/pages/editFAQ/editFAQ.component";
import { AddmcFAQComponent } from "src/app/pages/addmcFAQ/addmcFAQ.component";
import { EditmcFAQComponent } from "src/app/pages/editmcFAQ/editmcFAQ.component";
import { UserroleComponent } from "src/app/pages/userrole/userrole.component";
import { EditadsComponent } from "src/app/pages/editads/editads.component";
import { EditRwdVchComponent } from "src/app/pages/editRwdVch/editRwdVch.component";
import { EditGamevchComponent } from "src/app/pages/editGamevch/editGamevch.component";
import { WheelsComponent } from "src/app/pages/wheels/wheels.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "reporting", component: ReportingComponent },
  { path: "addNews", component: AddNewsComponent },
  { path: "newsManagement", component: NewsManagementComponent },
  { path: "MemberAccountManagement", component: MemberAccountManagementComponent },
  { path: "redemption", component: RedemptionComponent },
  { path: "redemptionMember", component: RedemptionMemberComponent },
  { path: "editads", component: EditadsComponent },

  { path: "adminProfile", component: AdminProfileComponent },
  { path: "editProfile", component: EditProfileComponent },
  { path: "advertisement", component: AdvertisementComponent },
  { path: "addAdv", component: AddAdvComponent },
  { path: "memberData", component: MemberDataComponent },
  { path: "viewMember", component: ViewMemberComponent },
  { path: "memberRecord", component: MemberRecordComponent },
  { path: "rewards", component: RewardsComponent },
  { path: "addRwd", component: AddRwdComponent }, 
  { path: "editRwd", component: EditRwdComponent },
  { path: "addVch", component: AddVchComponent },
  { path: "editVch", component: EditVchComponent },
  { path: "gamification", component: GamificationComponent },
  { path: "gameSetting", component: GameSettingComponent },
  { path: "addGame", component: AddGameComponent },
  { path: "addSetting", component: AddSettingComponent },
  { path: "editSetting", component: EditSettingComponent },
  { path: "editRwdVch", component: EditRwdVchComponent },
  { path: "editGamevch", component: EditGamevchComponent},


  { path: "gsContactInfo", component: GsContactInfoComponent },
  { path: "gsAboutUs", component: GsAboutUsComponent },
  { path: "gsFAQ", component: GsFAQComponent },
  { path: "addFAQ", component: AddFAQComponent },
  { path: "editFAQ", component: EditFAQComponent },
  { path: "addmcFAQ", component: AddmcFAQComponent },
  { path: "editmcFAQ", component: EditmcFAQComponent },
  { path: "bookingList", component: BookingListComponent },
  { path: "adminUser", component: AdminUserComponent },
  { path: "merchant", component: MerchantComponent},

  { path: "onlineStore", component: OnlineStoreComponent },

  { path: "addAdmin", component: AddAdminComponent },
  { path: "addMerchant", component: AddMerchantComponent },
  { path: "editNews", component: EditNewsComponent },
  { path: "editMember", component: EditMemberComponent },
  { path: "membertransactcollect", component: MembertransactcollectComponent },
  { path: "othersetting", component: OthersettingComponent },
  { path: "login", component: LoginComponent },
  { path: "resetpwd", component: ResetpwdComponent },
  { path: "enterpwd", component: EnterpwdComponent },
  { path: "enterotp", component: EnterotpComponent },
  { path: "wheels", component: WheelsComponent },

  { path: "userrole", component: UserroleComponent },
];
