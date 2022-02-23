import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthlayoutComponent } from './authlayout.component';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ForceoutletsettingsComponent } from './forceoutletsettings/forceoutletsettings.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyComponent } from './verify/verify.component';
import { voucheraddComponent } from './voucheradd/voucheradd.component';

const routes: Routes = [
    {
        path: '',
        component: AuthlayoutComponent,
        children: [
            {
                path: '',
                component: LandingComponent,
            },
            {
                path: 'signin',
                component: SigninComponent,
            },
            {
                path: 'forceoutletsettings',
                component: ForceoutletsettingsComponent,
            },
          
            {
                path: 'signup',
                component: SignupComponent,
            },

            {
                path: 'forgetpassword',
                component: ForgetpasswordComponent,
            },
            {
                path: 'resetpassword',
                component: ResetpasswordComponent,
            },
            {
                path: 'verify',
                component: VerifyComponent,
            },
            {
                path: 'voucheradd',
                component: voucheraddComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AuthlayoutRoutingModule { }
