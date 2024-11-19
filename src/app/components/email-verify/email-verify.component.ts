import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, interval, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit, OnDestroy {
  isEmailVerified = false; // Property to track email verification status
  errorMessage = ''; // Property to handle error messages
  intervalId: Subscription | undefined;

  constructor(private route: Router, private auth: AuthService, private toastr : ToastrService) { }

  ngOnInit() {
    this.sendVerificationEmail(); // Send the verification email when the component initializes
    this.startEmailVerificationCheck(); // Automatically start verification check when the component loads
  }

  // Send the verification email
  async sendVerificationEmail() {
    const idToken = sessionStorage.getItem('token');
    if (idToken) {
      try {
        await firstValueFrom(this.auth.verifyemail(idToken));
        this.toastr.info(`Verification email sent `);
      } catch (error) {
        console.error('Error sending verification email:', error);
        this.errorMessage = 'Failed to send verification email. Please try again.';
      }
    }
  }

  // Continuously check if the email is verified every 3 seconds
  startEmailVerificationCheck() {
    this.intervalId = interval(3000).subscribe(async () => {
      try {
        const verified: boolean = await firstValueFrom(this.auth.isEmailVerified());

        if (verified) {
          this.isEmailVerified = true; // Only mark as verified if confirmed by Firebase
          this.updateApiAndNavigate(); // Update the server and navigate to the next page
        }
      } catch (error) {
        console.error('Error checking email verification:', error);
        this.errorMessage = 'Error while checking email verification.';
      }
    });
  }

  // Update the backend API and navigate after successful email verification
  async updateApiAndNavigate() {
    try {
      // Fetch user data, including localId, from AuthService
      const userData = await this.auth.getUserData().toPromise(); // Await the promise
      const uid = userData?.localId; // Get the localId from the resolved user data

      if (uid) {
        const api = `https://www.ghcbapi.connectbeez.com/collegeregistration/emailstatus/${uid}`;

        // Call the API to update the email status
        await firstValueFrom(this.auth.updateEmailStatus(uid));
        this.toastr.success("Email has been verified successfully");
        console.log('Email verification status updated.');
        

        // Navigate to the waiting-for-approval page after updating
        // sessionStorage.setItem('isEmailVerify', 'true');
        this.route.navigate(['/waiting-for-approval']);

      } else {
        console.error('localId (UID) is not available in user data.');
        this.errorMessage = 'User ID is missing.';
      }
    } catch (error) {
      console.error('Error retrieving user data or updating email verification status:', error);
      this.errorMessage = 'Error while updating verification status.';
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the interval when the component is destroyed
    if (this.intervalId) {
      this.intervalId.unsubscribe();
    }
  }
}
