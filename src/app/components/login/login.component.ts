import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailVerify: string = '';
  proofVerify: string = '';
  collegeVerify: string = '';
  id: any;
  submit = false;
  errorMessage = "";
  loading = false;
  isEmailVerified = false;
  uid: string = '';
  college_id: any;

  constructor(
    private form: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private auth: AuthService
    , private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login | Connectbeez');
    if (sessionStorage.getItem('dashboard') == 'true') {
      this.route.navigate(['/dashboard']);
    }
    // Check if the token exists in session storage
    const token = sessionStorage.getItem('token');

    if (token) {
      // If the token exists, check email verification status
      this.auth.getUserData().subscribe(
        (data: { emailVerified: boolean, localId: string }) => {
          this.isEmailVerified = data.emailVerified;
          this.uid = data.localId; // Store the Firebase UID
          sessionStorage.setItem('uid', this.uid);
        },
        (error) => {
          console.error("Error retrieving user data:", error);
          // Handle error if needed
        }
      );
    } else {
      console.log("No token found, user not logged in.");
    }
  }

  handleLoginError(message: string) {
    if (message === "INVALID_EMAIL") {
      this.errorMessage = "Invalid Email.";
    } else if (message === "EMAIL_NOT_FOUND") {
      this.errorMessage = "Email not found.";
    } else if (message === "INVALID_PASSWORD") {
      this.errorMessage = "Invalid password.";
    } else if (message === "USER_DISABLED") {
      this.errorMessage = "This user has been disabled.";
    } else {
      this.errorMessage = "An unknown error occurred during login.";
    }
  }

  // Form validation
  login = this.form.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required]]
  });



  async onSubmit() {
    this.submit = true;
    this.loading = true;

    try {
      if (this.login.valid) {
        console.log('Logging in with:', this.login.value);
        this.auth.login(this.login.value.email!, this.login.value.password!).subscribe({
          next: (data: { idToken: string }) => {
            console.log('Login successful:', data);
            this.auth.storeToken(data.idToken);

            // After storing the token, ensure the UID is retrieved properly
            this.auth.getUserData().subscribe({
              next: (userData: { emailVerified: boolean, localId: string }) => {
                this.isEmailVerified = userData.emailVerified;
                this.uid = userData.localId; // Make sure UID is set
                sessionStorage.setItem('uid', this.uid);

                console.log('UID after login:', this.uid); // Debugging

                // Now call submitToAPI after setting the UID
                if (this.uid) {
                  this.submitToAPI();  // Call the custom API method
                } else {
                  console.error("No UID found after login.");
                }
              },
              error: (error) => {
                console.error("Error fetching user data after login:", error);
              }
            });
          },
          error: (data: { error: { message: string } }) => {
            console.error('Login error:', data);
            this.handleLoginError(data.error.message);  // Call your error handling method
          }
        }).add(() => {
          this.loading = false;
          console.log("Login process completed!");
        });
      } else {
        console.log("Login form is invalid.");
        this.loading = false;
      }
    } catch (error) {
      console.error("Error during login process:", error);
      this.errorMessage = "An error occurred. Please try again.";
      this.loading = false;
    }
  }

  // Add logging inside submitToAPI() to ensure it's being called
  submitToAPI() {
    const api = `https://www.ghcbapi.connectbeez.com/mycollege/login/${this.uid}`;
    console.log('Calling API with UID:', this.uid);  // Debugging to ensure API is being called

    this.http.get<any>(api).subscribe({
      next: (response) => {
        console.log('API Response:', response);  // Check the API response structure
        const result = response.result[0];

        this.emailVerify = result.email_verified;
        this.proofVerify = result.proof_verified;
        this.collegeVerify = result.college_verified;
        this.id = result.id;
        this.college_id = result.college_id;

        sessionStorage.setItem('college_id', this.college_id);
        sessionStorage.setItem('id', this.id);

        console.log('Email Verified:', this.emailVerify);
        console.log('Proof Verified:', this.proofVerify);
        console.log('College Verified:', this.collegeVerify);
        this.route.navigate(['dashboard']); //

        // Additional routing logic...

        if (this.emailVerify == "false") {
          this.route.navigate(['/emailVerify']);
        } else if (this.emailVerify == "true" && this.proofVerify == "true" && this.collegeVerify == "true") {
          sessionStorage.setItem('dashboard', 'true');
          this.route.navigate(['/dashboard']);
        } else if (this.emailVerify == "true" && this.proofVerify == "true" && this.collegeVerify == "false") {
          this.route.navigate(['/college-register']);
        } else if (this.emailVerify == "true" && this.proofVerify == "false") {
          this.route.navigate(['/waiting-for-approval']);
        }

      },
      error: (err) => {
        console.error("Error in API call:", err);
      }
    });
  }


}
