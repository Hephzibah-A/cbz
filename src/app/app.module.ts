import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { ProofVerifyComponent } from './components/proof-verify/proof-verify.component';
import { IdVerifyComponent } from './components/id-verify/id-verify.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CollegeRegisterComponent } from './components/college-register/college-register.component';
import { CollegeUserRegisterComponent } from './components/college-user-register/college-user-register.component';
import { CollegeEventsComponent } from './components/college-events/college-events.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';
import { PostsComponent } from './components/posts/posts.component';
import { CollegeProfileComponent } from './components/college-profile/college-profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { WaitingForApprovalComponent } from './components/waiting-for-approval/waiting-for-approval.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
// Ensure correct path

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailVerifyComponent,
    ProofVerifyComponent,
    IdVerifyComponent,
    DashboardComponent,
    CollegeRegisterComponent,
    CollegeUserRegisterComponent,
    CollegeEventsComponent,
    SideBarComponent,
    DashboardContentComponent,
    PostsComponent,
    CollegeProfileComponent,
    ForgetPasswordComponent,
    WaitingForApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),  // Updated to environment.firebase
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
