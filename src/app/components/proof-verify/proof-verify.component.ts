import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proof-verify',
  templateUrl: './proof-verify.component.html',
  styleUrls: ['./proof-verify.component.css']
})
export class ProofVerifyComponent {
  emailVerify: any;
  proofVerify: any;
  collegeVerify: any;
  id: any;
  constructor(private http: HttpClient, private route: Router) {
  
    
    
    let email = sessionStorage.getItem('isEmailVerify');
    let proof = sessionStorage.getItem('isProofVerify');
    let id = sessionStorage.getItem('isIdVerify');
    
    if (email == "true" && proof == "true" && id == "true") {
        sessionStorage.setItem('dashboard', 'true');
        this.route.navigate(['dashboard']);
      }

}
  
  proof() {
     let api = "https://www.ghcbapi.connectbeez.com/mycollege/login/qwertyuiop";
    this.http.get<any>(api).subscribe((get) => { 
      console.log(get)
      this.emailVerify = get.result[0].email_verified;
      this.proofVerify = get.result[0].proof_verified;
      this.collegeVerify = get.result[0].college_verified;

      this.id = get.result[0].id;
      sessionStorage.setItem('id', this.id);


    

      
      if (this.proofVerify == "true") {
        sessionStorage.setItem('isProofVerify', this.proofVerify);
        this.route.navigate(['collegeRegister']);
      }
      else if(this.proofVerify == "false"){ 
        sessionStorage.setItem('isProofVerify', this.proofVerify);
        this.route.navigate(['proofVerify']);
      }

      
    })
  }
}
