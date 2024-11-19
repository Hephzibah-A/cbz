import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-college-profile',
  templateUrl: './college-profile.component.html',
  styleUrls: ['./college-profile.component.css']
})
export class CollegeProfileComponent {
  api: string ='';  
  college: any;

  constructor(private http: HttpClient) {
    sessionStorage.setItem('isWaitingApproval', 'true');
    const collegeId = sessionStorage.getItem('college_id');  // Retrieve college_id from session storage

    if (collegeId) {
      this.api = `https://www.ghcbapi.connectbeez.com/mycollege/getcollege/profile/${collegeId}`;  // Construct API URL using college_id
      this.fetchCollegeProfile();  // Fetch college profile data
    } else {
      console.error('No college ID found in session storage');
    }
  }

  fetchCollegeProfile() {
    this.http.get<any>(this.api).subscribe((response) => {
      this.college = response.result;  // Assign the result to the college property
      console.log(this.college);  // Log college data for debugging
    }, error => {
      console.error('Error fetching college profile:', error);  // Log any errors
    });
  }
}
