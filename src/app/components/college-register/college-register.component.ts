import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollegeRegisterService } from '../../services/college-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-college-register',
  templateUrl: './college-register.component.html',
  styleUrls: ['./college-register.component.css']
})
export class CollegeRegisterComponent {
  userData: FormGroup;
  logoImage: File | null = null;
  bannerImage: File | null = null;
  logoImageSrc: string | ArrayBuffer | null = null;
  bannerImageSrc: string | ArrayBuffer | null = null;
  selectCollegeCategory: any;
  collegeCategory = ["Engineering", "Arts & Science"];
  isSubmitted: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: CollegeRegisterService,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: Router,
    private http: HttpClient
  ) {
    // Initialize the form
    this.userData = this.formBuilder.group({
      logo: ['', Validators.required],
      banner: ['', Validators.required],
      collegeName: ['', Validators.required],
      collegeWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      collegeAddress: ['', Validators.required],
      collegeLocation: ['', Validators.required],
      collegePhone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      collegeAbout: ['', [Validators.required, Validators.maxLength(1000)]],
      collegeCategory: ['', Validators.required],
      linkedin: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required]
    });



    // Check if the form has been submitted previously
    if (sessionStorage.getItem('submitCollegeRegister') === 'true') {
      this.isSubmitted = true;
    }

    let email = sessionStorage.getItem('isEmailVerify');
    let proof = sessionStorage.getItem('submitCollegeRegister');

    if (email === "true" && proof === "true") {
      sessionStorage.setItem('dashboard', 'true');
      this.route.navigate(['/dashboard']);
    }
  }

  // Handle logo file input

  logo(event: any): void {
    this.logoImage = event.target.files ? event.target.files[0] : null;
    if (this.logoImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoImageSrc = reader.result;
      };
      reader.readAsDataURL(this.logoImage);
    }
  }

  // Handle banner file input
  banner(event: any): void {
    this.bannerImage = event.target.files ? event.target.files[0] : null;
    if (this.bannerImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.bannerImageSrc = reader.result;
      };
      reader.readAsDataURL(this.bannerImage);
    }
  }

  // Select college category
  selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion
    this.selectCollegeCategory = target.value; // Get the selected value
  }
  

  // Submit form data
  submit(event: any) {
    event.preventDefault();
    this.loading = true;

    // Access form values directly
    const registerDetails = {
      collegeName: this.userData.controls['collegeName'].value,
      collegeWebsite: this.userData.controls['collegeWebsite'].value,
      collegeAddress: this.userData.controls['collegeAddress'].value,
      collegeLocation: this.userData.controls['collegeLocation'].value,
      collegePhone: this.userData.controls['collegePhone'].value,
      collegeAbout: this.userData.controls['collegeAbout'].value,
      collegeCategory: this.selectCollegeCategory,
      linkedin: this.userData.controls['linkedin'].value,
      facebook: this.userData.controls['facebook'].value,
      instagram: this.userData.controls['instagram'].value,
    };

    // Check if logo and banner images are present before submitting
    if (this.logoImage && this.bannerImage) {
      this.registerService.uploadDetails(registerDetails, this.logoImage, this.bannerImage).subscribe(
        (response) => {
          this.isSubmitted = true;
          this.loading = false;
          sessionStorage.setItem('submitCollegeRegister', 'true');
          this.route.navigate(['/dashboard']);
        },
        (error) => {
          this.loading = false;
          console.error('Error', error);
        }
      );
    } else {
      this.loading = false;
      console.error('Logo and Banner images are required');
    }
  }

  // Refresh page and fetch user data
  refreshPage() {
    const uid = sessionStorage.getItem('uid');
    const api = `https://www.ghcbapi.connectbeez.com/mycollege/login/${uid}`;

    if (!uid) {
      console.error('User ID (uid) is not found in session storage.');
      return;
    }

    this.http.get<any>(api).subscribe((get) => {
      const { email_verified, proof_verified, college_verified, id } = get.result[0];
      sessionStorage.setItem('id', id);
      sessionStorage.setItem('isEmailVerify', email_verified);
      sessionStorage.setItem('submitCollegeRegister', proof_verified);
      sessionStorage.setItem('isIdVerify', college_verified);

      if (college_verified === "true") {
        this.route.navigate(['/dashboard']);
      } else {
        this.route.navigate(['/idVerify']);
      }
    }, (error) => {
      console.error('Error fetching data from API:', error);
    });
  }
}
