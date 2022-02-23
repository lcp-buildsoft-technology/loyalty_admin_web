import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthlayoutComponent } from './authlayout.component';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyComponent } from './verify/verify.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { VerificationComponent } from './verification/verification.component';
import { EnterotpComponent } from './enterotp/enterotp.component';

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
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'forgotpassword',
                component: ForgotpasswordComponent,
            },
            {
                path: 'forgetpassword',
                component: ForgetpasswordComponent,
            },
            {
                path: 'resetpw',
                component: ResetpwComponent,
            },
            {
                path: 'verification',
                component: VerificationComponent,
            },
            {
                path: 'getstarted',
                component: GetstartedComponent,
            },
            {
                path: 'enterotp',
                component: EnterotpComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AuthlayoutRoutingModule { }
