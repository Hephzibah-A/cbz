import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { LoginComponent } from './components/login/login.component';
import { ProofVerifyComponent } from './components/proof-verify/proof-verify.component';
import { IdVerifyComponent } from './components/id-verify/id-verify.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { emailGuard } from './guards/email.guard';
import { proofGuard } from './guards/proof.guard';
import { idGuard } from './guards/id.guard';
import { dashboardGuard } from './guards/dashboard.guard';
import { CollegeRegisterComponent } from './components/college-register/college-register.component';
import { CollegeUserRegisterComponent } from './components/college-user-register/college-user-register.component';
import { CollegeEventsComponent } from './components/college-events/college-events.component';
import { eventsGuard } from './guards/events.guard';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { PostsComponent } from './components/posts/posts.component';
import { CollegeProfileComponent } from './components/college-profile/college-profile.component';
import { collegeRegisterGuard } from './guards/college-register.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WaitingForApprovalComponent } from './components/waiting-for-approval/waiting-for-approval.component';
import { waitingApprovalGuard } from './guards/waiting-approval.guard';

const routes: Routes = [
  {
    path: 'emailVerify',
    component: EmailVerifyComponent,
    // canActivate: [emailGuard]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'proofVerify',
    component: ProofVerifyComponent,
    canActivate: [proofGuard]
  },
  {
    path: 'idVerify',
    component: IdVerifyComponent,
    canActivate: [idGuard]
  },
  {
    path: 'waiting-for-approval',
    component: WaitingForApprovalComponent,
    // canActivate: [waitingApprovalGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [dashboardGuard],
    children: [
      {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
      },
      {
        path: 'content',
        component: DashboardContentComponent,
        canActivate: [dashboardGuard]
      },
      {
        path: 'events',
        component: CollegeEventsComponent,
        canActivate: [dashboardGuard]
      },
      {
        path: 'side-bar',
        component: SideBarComponent,
        canActivate: [dashboardGuard]
      },
      {
        path: 'post',
        component: PostsComponent,
        canActivate: [dashboardGuard]
      },
      {
        path: 'profile',
        component: CollegeProfileComponent,
        canActivate: [dashboardGuard]
      }
    ]
  },
  {
    path: 'college-register',
    component: CollegeRegisterComponent,
    // canActivate: [collegeRegisterGuard]
  },
  {
    path: 'collegeUserRegister',
    component: CollegeUserRegisterComponent,
    // canActivate:[collegeUserRegisterGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
