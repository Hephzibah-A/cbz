import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private form: FormBuilder, private route: Router, private auth: AuthService, private titleService: Title) { }
  submit = false;
  errorMessage = "";
  loading = false;

  ngOnInit() {
    this.titleService.setTitle('Forget Password | Connectbeez');
  }
  forgotpassword = this.form.group({
    email: this.form.control('', Validators.required)
  });

  onSubmit() {
    this.loading = true;
    if (this.forgotpassword.valid) {
      this.auth.forgotPassword(this.forgotpassword.value.email!).subscribe({
        next: data => {
          console.log(data);
          this.route.navigate(['/login']);
        }
      });
    }
  }
}
