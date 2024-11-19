import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  id: any;
  collegeData: any;
  logo: any;
  api: any;
  collegeID: any;
  image :any=[];
  
  constructor(private http: HttpClient) {
    sessionStorage.setItem('event', 'true');
    this.id = sessionStorage.getItem('id');
    this.collegeID = sessionStorage.getItem('college_id');


    this.api = `https://www.ghcbapi.connectbeez.com/mycollege/getcollege/profile/${this.collegeID}`;
    http.get<any>(this.api).subscribe((get) => {
      
      this.collegeData = get;
      for (const ind in this.collegeData) { 
        this.image.push(this.collegeData[ind]);
      }
      this.logo = this.collegeData.result.college_logo;
      
      console.log(this.image);
      
    });
    
  }
 logout() {
    sessionStorage.removeItem('token'); 
 }
  
}
