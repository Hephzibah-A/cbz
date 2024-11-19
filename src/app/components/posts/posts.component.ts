import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  api: string ='';
  collegeData: any;
  name: any;
  isactive: any;

  constructor(private http: HttpClient) {
    // Retrieve college_id from session storage
    const collegeId = sessionStorage.getItem('college_id');
    console.log(collegeId);
    

    // Check if collegeId is not null before constructing the API URL
    if (collegeId) {
      this.api = `https://ghcbapi.connectbeez.com/mycollege/getcollege/poster/${collegeId}`;
      
      // Make the HTTP request to fetch college data
      this.http.get<any>(this.api).subscribe((get) => {
        this.collegeData = get;
        this.name = this.collegeData.admin_name;
        this.isactive = this.collegeData.isactive;

        console.log(this.collegeData);
      });
    } else {
      console.error('No college ID found in session storage');
    }
  }
}
