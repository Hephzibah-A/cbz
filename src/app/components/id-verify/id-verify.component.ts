import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-id-verify',
  templateUrl: './id-verify.component.html',
  styleUrls: ['./id-verify.component.css']
})
export class IdVerifyComponent {
  emailVerify: any;
  proofVerify: any;
  collegeVerify: any;
  id: any;

  ngOnInit() {
    this.titleService.setTitle('ID Verification | Connectbeez');
  }
 constructor(private http: HttpClient, private route: Router,private titleService: Title) {
    
    let email = sessionStorage.getItem('isEmailVerify');
    let proof = sessionStorage.getItem('isProofVerify');
    let id = sessionStorage.getItem('isIdVerify');
    
    if (email == "true" && proof == "true" && id == "true") {
        sessionStorage.setItem('dashboard', 'true');
        this.route.navigate(['dashboard']);
      }

 }
  idProof() { 
     let api = "https://www.ghcbapi.connectbeez.com/mycollege/login/qwertyuiop";
    this.http.get<any>(api).subscribe((get) => { 
      console.log(get)
      this.emailVerify = get.result[0].email_verified;
      this.proofVerify = get.result[0].proof_verified;
      this.collegeVerify = get.result[0].college_verified;

      this.id = get.result[0].id;
      sessionStorage.setItem('id', this.id);


      console.log(typeof(this.emailVerify) + " " + this.proofVerify + " " + this.collegeVerify)

      
      if (this.collegeVerify == "true") {
        sessionStorage.setItem('isIdVerify', this.collegeVerify);
        this.route.navigate(['dashboard']);
      }
      else { 
        sessionStorage.setItem('isIdVerify',this.collegeVerify);
        this.route.navigate(['idVerify']);
      }
      
      
    })
  }
}
