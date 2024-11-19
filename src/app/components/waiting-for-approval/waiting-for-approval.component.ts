import { Component } from '@angular/core';

@Component({
  selector: 'app-waiting-for-approval',
  templateUrl: './waiting-for-approval.component.html',
  styleUrls: ['./waiting-for-approval.component.css']
})
export class WaitingForApprovalComponent {
  constructor() {
    sessionStorage.setItem('isEmailVerify', 'true');
   }

  
}
