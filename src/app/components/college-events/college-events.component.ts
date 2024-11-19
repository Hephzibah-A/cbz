import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CollegeEventsService } from '../../services/college-events.service';

@Component({
  selector: 'app-college-events',
  templateUrl: './college-events.component.html',
  styleUrls: ['./college-events.component.css']
})
export class CollegeEventsComponent {
  selectedFile: File | undefined;
  date: any;
  category: any;
  selectedEvent: any;
  imageSrc: string | ArrayBuffer | null | undefined;

  constructor(private form: FormBuilder, private eventService: CollegeEventsService, private http: HttpClient) {
    http.get<any>("https://www.ghcbapi.connectbeez.com/poster/category").subscribe((get) => {
      this.category = get;
    })
  }

  events = this.form.group({
    eventName: [''],
    department: [''],
    category: [''],
    registerLink: [''],
    description: [''],
    corrdinatorName: [''],
    corrdinatorNumber: [''],
    date: ['']
  })
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }


  model = {}
  submit(event: any) {
    console.log("Click");

    event.preventDefault();
    const eventDetail = {
      eventName: this.events.controls['eventName'].value,
      department: this.events.controls['department'].value,
      category: this.selectEvent,
      registerLink: this.events.controls['registerLink'].value,
      description: this.events.controls['description'].value,
      corrdinatorName: this.events.controls['corrdinatorName'].value,
      corrdinatorNumber: this.events.controls['corrdinatorNumber'].value,
      date: this.events.controls['date'].value

    }
    const textNotify = {
      title: "Thank you for your support, user!",
      body: "App is under development and will launch soon."
    }

    console.log();
    if (this.selectedFile) {
      this.eventService.uploadEvent(eventDetail, this.selectedFile).subscribe((post) => {
        console.log("Posted success");
        this.http.post<any>("https://cbnotification.connectbeez.com/send", textNotify).subscribe((get) => {
          console.log("Check notification" + get);
        })
      })
    }

  }

  selectEvent(event: any) {
    this.selectEvent = event;

  }




}
