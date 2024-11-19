import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollegeUserRegisterService {

  private api = "https://www.ghcbapi.connectbeez.com/collegeregistration/userregistration";

  constructor(private http: HttpClient, private auth: AuthService) { }

  uploadDetails(registerDetails: any, image: File): Observable<any> {
    // Get user data from AuthService
    return this.auth.getUserData().pipe(
      map(userData => userData.localId), // Extract UID from user data
      switchMap((uid: string) => {
        // Create FormData and append user details
        const formData: FormData = new FormData();
        formData.append('college_name', registerDetails.collegeName);
        formData.append('uid', uid); // Use the UID retrieved from getUserData()
        formData.append('admin_name', registerDetails.adminName);
        formData.append('admin_mail', registerDetails.adminMail);
        formData.append('admin_mobile', registerDetails.adminPhone);
        formData.append('id_proof', image, image.name);
        formData.append('designation', registerDetails.designation);
        formData.append('country', registerDetails.country);
        formData.append('state', registerDetails.state);
        formData.append('city', registerDetails.city);

        // Post data to API
        return this.http.post(this.api, formData);
      })
    );
  }
}
