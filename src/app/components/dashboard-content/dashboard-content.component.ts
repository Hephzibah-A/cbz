import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {
  api: string;
  posterAPI: any;
  collegeData: any;
  image: any;
  college:any;
  logo: any;

  name: any;

  totalPoster: number = 0;
  activePoster: any[] = [];
  inactivePoster: number = 0;
  isactivePoster: number = 0;
  collegeId: any;

  constructor(private http: HttpClient) {
    // Retrieve college_id from session storage
    this.collegeId = sessionStorage.getItem('college_id'); // Ensure this key matches your session storage key

    // Construct API URLs using the retrieved college_id
    this.api = `https://www.ghcbapi.connectbeez.com/mycollege/getcollege/profile/${this.collegeId}`;
    this.posterAPI = `https://www.ghcbapi.connectbeez.com/mycollege/getcollege/poster/${this.collegeId}`;

    sessionStorage.setItem('isWaitingApproval', 'true');
    const collegeId = sessionStorage.getItem('college_id');  // Retrieve college_id from session storage

    if (collegeId) {
      this.api = `https://www.ghcbapi.connectbeez.com/mycollege/getcollege/profile/${collegeId}`;  // Construct API URL using college_id
      this.fetchCollegeProfile();  // Fetch college profile data
    } else {
      console.error('No college ID found in session storage');
    }

    // Fetching college data
    this.http.get<any>(this.api).subscribe((get) => {
      this.collegeData = get.result;
      this.name = this.collegeData.admin_name;
      // this.collegeData.college_logo = 'assets/' + this.collegeData.college_logo;

      console.log(this.collegeData);
      this.logo = this.collegeData.college_logo;
    });



    this.http.get<any>(this.posterAPI).subscribe(
      (response) => {
        console.log(response); // Log the response for debugging

        // Check if the response is a string (message) or an object/array
        if (typeof response === 'string') {
          console.warn('Response is a string:', response);
          this.totalPoster = 0; // Set totalPoster to 0
          this.activePoster = []; // Clear activePoster
          this.inactivePoster = 0; // Set inactivePoster to 0
          this.isactivePoster = 0; // Set isactivePoster to 0
        } else if (Array.isArray(response)) { // If it's an array
          this.totalPoster = response.length; // Total number of posters

          // Filtering and storing only active posters
          this.activePoster = response.filter((poster: any) => poster.isactive === 1).map((poster: any) => {
            // Extracting the date portion from the timestamp
            poster.created_date = poster.created_at.split(' ')[0];
            poster.ended_date = poster.ended_at.split(' ')[0];
            return poster;
          });
          this.isactivePoster = this.activePoster.length;
          this.inactivePoster = this.totalPoster - this.activePoster.length;

          console.log(`Total Posters: ${this.totalPoster}`);
          console.log(`Active Posters: ${this.activePoster.length}`);
          console.log(`Inactive Posters: ${this.inactivePoster}`);
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching posters:', error);
      }
    );



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
