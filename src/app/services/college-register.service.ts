import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollegeRegisterService {
  private apiBase = 'https://www.ghcbapi.connectbeez.com/collegeregistration/collegeprofileregistration/';

  constructor(private http: HttpClient) {}

  uploadDetails(registerDetails: any, logo: File, banner: File) {
    const collegeId = sessionStorage.getItem('college_id'); // Retrieve college_id from session storage
    const apiUrl = `${this.apiBase}${collegeId}`; // Construct the API URL

    console.log(registerDetails.collegeAbout);
    const formData: FormData = new FormData();
    formData.append('college_logo', logo, logo.name);
    formData.append('college_banner', banner, banner.name);
    formData.append('college_code', registerDetails.collegeCode);
    formData.append('college_website', registerDetails.collegeWebsite);
    formData.append('college_address', registerDetails.collegeAddress);
    formData.append('location', registerDetails.collegeLocation);
    formData.append('phone_number', registerDetails.collegePhone);
    formData.append('college_about', registerDetails.collegeAbout);
    formData.append('college_category', registerDetails.collegeCategory);

    return this.http.post(apiUrl, formData); // Use the dynamic API URL
  }
}
