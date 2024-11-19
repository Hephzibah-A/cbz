import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollegeEventsService {

  private api = "https://www.ghcbapi.connectbeez.com/poster/addposter";
  constructor(private http: HttpClient) {


  }


  uploadEvent(eventDetail: any, image: File) {
    const formdata: FormData = new FormData;
    const collegeId = sessionStorage.getItem('college_id');
  formdata.append("college_id", collegeId ? collegeId : "");
    formdata.append("event_name", eventDetail.eventName);
    formdata.append("department", eventDetail.department);
    formdata.append("category", eventDetail.category);
    formdata.append("poster", image, image.name);
    formdata.append("registration_link", eventDetail.registerLink);
    formdata.append("description", eventDetail.description);
    formdata.append("ended_at", eventDetail.date);
    formdata.append("coordinator_name", eventDetail.corrdinatorName);
    formdata.append("coordinator_number", eventDetail.corrdinatorNumber);
    // console.log(date);

    return this.http.post<any>(this.api, formdata);
  }

}
