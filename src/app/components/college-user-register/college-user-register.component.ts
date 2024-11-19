import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CollegeUserRegisterService } from '../../services/college-user-register.service';
import { CountryStateCityService } from '../../services/country-state-city.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

export function emailDomainValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  const validDomains = ['.edu', '.ac.in'];

  if (email && !validDomains.some(domain => email.endsWith(domain))) {
    return { 'invalidDomain': true }; // Custom validation error for email domain
  }

  return null;
}

@Component({
  selector: 'app-college-user-register',
  templateUrl: './college-user-register.component.html',
  styleUrls: ['./college-user-register.component.css']
})
export class CollegeUserRegisterComponent implements OnInit {
  collegeName: any;
  adminName: any;
  adminMail: any;
  adminPhone: any;
  designation: any;
  idProof: any;

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  selectedCountryObj: any;
  selectedStateObj: any;
  selectedCityName: any;
  selectedCountry: any;

  uploadedFile: File | null = null;
  uploadedFileSrc: string | ArrayBuffer | null = null;
  passwordVisible = false; // For toggling password visibility
  loading = false; // For loading spinner
  errorMessage = '';
  uid: any = ''; // Error message display

  constructor(
    private form: FormBuilder,
    private http: HttpClient,
    private registerService: CollegeUserRegisterService,
    private countryStateCityService: CountryStateCityService,
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  // Adding 'adminPassword' to the form group
  userData = this.form.group({
    adminName: ['', Validators.required],
    adminPhone: ['', Validators.required],
    adminMail: ['', [Validators.required, emailDomainValidator]], // Custom email domain validator
    designation: ['', Validators.required],
    collegeName: ['', Validators.required],
    adminPassword: ['', Validators.required], // Correct form control for password
    file: [null, Validators.required] // File input should not be patched programmatically
  });

  ngOnInit() {
    this.countries = this.countryStateCityService.getAllCountries();
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.target.value;
    this.selectedCountryObj = this.countries.find(country => country.isoCode === this.selectedCountry);
    this.states = this.countryStateCityService.getStatesOfCountry(this.selectedCountry);
  }

  onStateChange(event: any) {
    const selectedStateCode = event.target.value;
    this.selectedStateObj = this.states.find(state => state.isoCode === selectedStateCode);
    this.cities = this.countryStateCityService.getCitiesOfState(this.selectedCountry, selectedStateCode);
  }

  onCityChange(event: any) {
    this.selectedCityName = event.target.value;
  }

  onFileSelected(event: any): void {
    this.uploadedFile = event.target.files ? event.target.files[0] : null;
    if (this.uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedFileSrc = reader.result; // Base64 for preview
      };
      reader.readAsDataURL(this.uploadedFile); // Convert file to base64
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  async submit(event: any) {
    event.preventDefault();

    // Mark all controls as touched to trigger validation
    this.userData.markAllAsTouched();

    // If the form is invalid, show validation errors
    if (this.userData.invalid) {
      let errorMessage = 'Please fill the required fields:';
      Object.keys(this.userData.controls).forEach(key => {
        const controlErrors = this.userData.get(key)?.errors;
        if (controlErrors) {
          errorMessage += `\n - ${key}: ${JSON.stringify(controlErrors)}`;
        }
      });
      alert(errorMessage); // Show the specific error message
      return;
    }

    // Proceed with form submission if no validation errors
    this.loading = true;
    this.errorMessage = '';

    const email = this.userData.controls['adminMail'].value || '';
    sessionStorage.setItem('email', email);
    const password = this.userData.controls['adminPassword'].value || '';

    // Firebase registration
    if (email && password) {
      this.authService.register(email, password).subscribe({

        next: async (data) => {
          console.log("DAAATA => ", data);
          sessionStorage.setItem('token', data.idToken);
          this.authService.getUserData().subscribe({
            next: async (userData) => {
              console.log("Next Block Working.......");
              this.uid = userData.localId;
              sessionStorage.setItem('uid', this.uid);
              console.log(this.uid);

              this.toastr.info("Login for further process");


              // Check if the email is verified
              let isVerified = await firstValueFrom(this.authService.isEmailVerified());
              console.log(isVerified);
              if (!isVerified) { // Check if not verified
                this.toastr.info("Please verify your email address to proceed.");
                this.route.navigate(['/emailVerify']);  // Navigate to the email verification page  

                return; // Prevent further execution if not verified
              }


            },
            error: (error) => {
              console.error('Error fetching user data:', error);
              this.toastr.error("There was an error fetching user data. Please try again.");
            }
          });

          console.log('Firebase registration successful:', data);
          this.toastr.success("Registration Successful", "Your account has been created successfully");
          this.authService.storeToken(data.idToken);

          const uid = data.idToken;

          const registerDetails = {
            collegeName: this.userData.controls['collegeName'].value,
            adminName: this.userData.controls['adminName'].value,
            adminMail: this.userData.controls['adminMail'].value,
            adminPhone: this.userData.controls['adminPhone'].value,
            designation: this.userData.controls['designation'].value,
            country: this.selectedCountryObj?.name || '',
            state: this.selectedStateObj?.name || '',
            city: this.selectedCityName || '',
            uid: uid
          };

          // Backend registration
          this.registerService.uploadDetails(registerDetails, this.uploadedFile!).subscribe(
            (response) => {
              console.log('Backend registration successful:', response['uid']);
            },
            (error) => {
              console.error('Error submitting details to backend:', error);
              this.toastr.error("There was an error saving the details. Please try again.");
            }
          );

        },
        error: (error) => {
          console.error('Firebase registration error:', error);
          this.errorMessage = 'Error during Firebase registration. Please try again.';
        }
      }).add(() => {
        this.loading = false;
      });
    } else {
      this.errorMessage = 'Email and password are required.';
      this.loading = false;
    }
  }

}
